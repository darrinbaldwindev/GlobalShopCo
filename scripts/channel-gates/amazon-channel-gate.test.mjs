import assert from 'node:assert/strict';
import test from 'node:test';
import { amazonChannelGate, amazonChannelDecision, OUTPUTS } from './amazon-channel-gate.mjs';

const eligible = Object.freeze({
  exactSku: 'SYNTHETIC-SKU-001',
  identifierEvidence: 'GTIN-SYNTHETIC',
  marketplacePermission: 'PROVEN',
  sellerOfRecordEvidenceStatus: 'PROVEN',
  sellerOfRecordPackagingCompatible: true,
  amazonCategoryEligibilityStatus: 'PROVEN',
  identifierRequirementStatus: 'RESOLVED',
  gtinExemptionClaimed: false,
  gtinExemptionEvidenceStatus: 'NOT-APPLICABLE',
  fulfilmentModelStatus: 'RESOLVED',
  supplierMarketplaceFulfilmentCompatible: true,
  stockSyncSafetyProven: true,
  stockSyncEvidenceFresh: true,
  stockVariantIdentityMatches: true,
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
  ['missing seller-of-record evidence fails closed', { sellerOfRecordEvidenceStatus: 'UNKNOWN' }, OUTPUTS.HOLD],
  ['supplier identity on packing material is not eligible', { sellerOfRecordPackagingCompatible: false }, OUTPUTS.NOT_ELIGIBLE],
  ['unknown Amazon category eligibility fails closed', { amazonCategoryEligibilityStatus: 'UNKNOWN' }, OUTPUTS.HOLD],
  ['category ineligibility cannot be inferred away', { amazonCategoryEligibilityStatus: 'DENIED' }, OUTPUTS.HOLD],
  ['unresolved GTIN or identifier requirement fails closed', { identifierRequirementStatus: 'UNKNOWN' }, OUTPUTS.HOLD],
  ['unsupported GTIN exemption claim fails closed', { gtinExemptionClaimed: true, gtinExemptionEvidenceStatus: 'UNKNOWN' }, OUTPUTS.HOLD],
  ['proven GTIN exemption evidence can satisfy the identifier evidence sub-gate', { gtinExemptionClaimed: true, gtinExemptionEvidenceStatus: 'PROVEN' }, OUTPUTS.ELIGIBLE],
  ['unresolved FBA or FBM fulfilment model fails closed', { fulfilmentModelStatus: 'UNKNOWN' }, OUTPUTS.HOLD],
  ['supplier marketplace fulfilment conflict is not eligible', { supplierMarketplaceFulfilmentCompatible: false }, OUTPUTS.NOT_ELIGIBLE],
  ['unknown supplier marketplace fulfilment compatibility fails closed', { supplierMarketplaceFulfilmentCompatible: null }, OUTPUTS.HOLD],
  ['unproven Shopify-canonical stock sync safety fails closed', { stockSyncSafetyProven: false }, OUTPUTS.HOLD],
  ['stale Shopify stock evidence fails closed', { stockSyncEvidenceFresh: false }, OUTPUTS.HOLD],
  ['mismatched Shopify variant stock evidence fails closed', { stockVariantIdentityMatches: false }, OUTPUTS.HOLD],
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

test('synthetic all-green decision never grants publication or network authority', () => {
  const decision = amazonChannelDecision(eligible);
  assert.equal(decision.disposition, OUTPUTS.ELIGIBLE);
  assert.equal(decision.publicationAuthority, false);
  assert.equal(decision.productionMutation, false);
  assert.equal(decision.networkIo, false);
  assert.equal(decision.canonicalInventoryAuthority, 'SHOPIFY');
});

test('denied decision receipt preserves zero authority', () => {
  const decision = amazonChannelDecision({ ...eligible, marketplacePermission: 'UNKNOWN' });
  assert.equal(decision.disposition, OUTPUTS.PERMISSION_REQUIRED);
  assert.equal(decision.publicationAuthority, false);
  assert.equal(decision.productionMutation, false);
  assert.equal(decision.networkIo, false);
});
