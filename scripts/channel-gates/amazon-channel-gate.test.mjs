import assert from 'node:assert/strict';
import test from 'node:test';
import { amazonChannelGate, OUTPUTS } from './amazon-channel-gate.mjs';

const eligible = Object.freeze({
  exactSku: 'SYNTHETIC-SKU-001',
  identifierEvidence: 'GTIN-SYNTHETIC',
  marketplacePermission: 'PROVEN',
  sellerOfRecordPackagingCompatible: true,
  fulfilmentCostKnown: true,
  referralFeeCategoryKnown: true,
  conservativeContributionAud: 12.34,
  evidenceFresh: true,
  sourceIdentityMatches: true,
});

const cases = [
  ['complete synthetic evidence is eligible', {}, OUTPUTS.ELIGIBLE],
  ['missing exact SKU fails closed', { exactSku: '' }, OUTPUTS.HOLD],
  ['missing identifier evidence fails closed', { identifierEvidence: '' }, OUTPUTS.HOLD],
  ['missing marketplace permission requires permission', { marketplacePermission: 'UNKNOWN' }, OUTPUTS.PERMISSION_REQUIRED],
  ['denied marketplace permission is not eligible', { marketplacePermission: 'DENIED' }, OUTPUTS.NOT_ELIGIBLE],
  ['supplier identity on packing material is not eligible', { sellerOfRecordPackagingCompatible: false }, OUTPUTS.NOT_ELIGIBLE],
  ['unknown fulfilment cost fails closed', { fulfilmentCostKnown: false }, OUTPUTS.HOLD],
  ['unknown referral fee category fails closed', { referralFeeCategoryKnown: false }, OUTPUTS.HOLD],
  ['negative conservative contribution is not eligible', { conservativeContributionAud: -0.01 }, OUTPUTS.NOT_ELIGIBLE],
  ['unknown conservative contribution fails closed', { conservativeContributionAud: null }, OUTPUTS.HOLD],
  ['review placeholder fails closed', { placeholder: true }, OUTPUTS.HOLD],
  ['stale evidence fails closed', { evidenceFresh: false }, OUTPUTS.HOLD],
  ['source identity mismatch fails closed', { sourceIdentityMatches: false }, OUTPUTS.HOLD],
  ['explicit supplier/policy conflict is not eligible', { explicitNotEligible: true }, OUTPUTS.NOT_ELIGIBLE],
];

for (const [name, patch, expected] of cases) {
  test(name, () => {
    assert.equal(amazonChannelGate({ ...eligible, ...patch }), expected);
  });
}

test('invalid records fail closed', () => {
  assert.equal(amazonChannelGate(null), OUTPUTS.HOLD);
  assert.equal(amazonChannelGate('not-a-record'), OUTPUTS.HOLD);
});
