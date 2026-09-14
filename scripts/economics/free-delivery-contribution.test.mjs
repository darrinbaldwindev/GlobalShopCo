import assert from 'node:assert/strict';
import test from 'node:test';
import { freeDeliveryContribution, STATES } from './free-delivery-contribution.mjs';

const viable = Object.freeze({
  supplierUnitCostAud: 20,
  outboundFreightAud: 5,
  channelFeeAud: 4,
  paymentFeeAud: 1,
  returnsWarrantyAllowanceAud: 2,
  sellingPriceAud: 45,
  targetMarginAud: 10,
});

test('positive free-delivery contribution with target buffer passes', () => {
  const result = freeDeliveryContribution(viable);
  assert.equal(result.state, STATES.PASS);
  assert.equal(result.landedAndChannelCostAud, 32);
  assert.equal(result.contributionAud, 13);
  assert.equal(result.bufferAfterTargetAud, 3);
  assert.equal(result.publicationAuthority, false);
  assert.equal(result.productionMutation, false);
});

for (const field of [
  'supplierUnitCostAud',
  'outboundFreightAud',
  'channelFeeAud',
  'paymentFeeAud',
  'returnsWarrantyAllowanceAud',
  'sellingPriceAud',
  'targetMarginAud',
]) {
  test(`unknown critical cost ${field} fails closed`, () => {
    const result = freeDeliveryContribution({ ...viable, [field]: null });
    assert.equal(result.state, STATES.HOLD);
    assert.ok(result.reasons.includes(`unknown:${field}`));
  });
}

test('negative freight is invalid and fails closed', () => {
  assert.equal(freeDeliveryContribution({ ...viable, outboundFreightAud: -1 }).state, STATES.HOLD);
});

test('zero selling price is rejected', () => {
  assert.equal(freeDeliveryContribution({ ...viable, sellingPriceAud: 0 }).state, STATES.REJECT);
});

test('positive contribution below target margin is rejected', () => {
  const result = freeDeliveryContribution({ ...viable, sellingPriceAud: 39 });
  assert.equal(result.contributionAud, 7);
  assert.equal(result.state, STATES.REJECT);
});

test('zero contribution is rejected', () => {
  const result = freeDeliveryContribution({ ...viable, sellingPriceAud: 32, targetMarginAud: 0 });
  assert.equal(result.contributionAud, 0);
  assert.equal(result.state, STATES.REJECT);
});

test('invalid input fails closed', () => {
  assert.equal(freeDeliveryContribution(null).state, STATES.HOLD);
});
