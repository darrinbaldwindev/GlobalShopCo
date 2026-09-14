const OUTPUTS = Object.freeze({
  ELIGIBLE: 'AMAZON-ELIGIBLE',
  PERMISSION_REQUIRED: 'PERMISSION-REQUIRED',
  NOT_ELIGIBLE: 'NOT-ELIGIBLE',
  HOLD: 'UNKNOWN-HOLD',
});

/**
 * Pure advisory gate for Amazon AU preflight evidence.
 *
 * This function performs no network I/O and persists no catalogue, inventory,
 * listing, order, credential, or marketplace state. Shopify remains canonical.
 * Synthetic success never grants publication or production authority.
 * Contradictory evidence always fails closed; a worker cannot select only the
 * favourable side of a disagreement to manufacture eligibility.
 */
export function amazonChannelGate(record) {
  if (!record || typeof record !== 'object') return OUTPUTS.HOLD;

  if (record.explicitNotEligible === true) return OUTPUTS.NOT_ELIGIBLE;
  if (record.placeholder === true) return OUTPUTS.HOLD;
  if (record.evidenceConflict === true) return OUTPUTS.HOLD;

  if (!nonEmpty(record.exactSku) || !nonEmpty(record.identifierEvidence)) return OUTPUTS.HOLD;

  if (record.marketplacePermissionConflict === true) return OUTPUTS.HOLD;
  if (record.marketplacePermission === 'DENIED') return OUTPUTS.NOT_ELIGIBLE;
  if (record.marketplacePermission !== 'PROVEN') return OUTPUTS.PERMISSION_REQUIRED;

  if (record.sellerOfRecordEvidenceConflict === true) return OUTPUTS.HOLD;
  if (record.sellerOfRecordEvidenceStatus !== 'PROVEN') return OUTPUTS.HOLD;
  if (record.sellerOfRecordPackagingCompatible === false) return OUTPUTS.NOT_ELIGIBLE;
  if (record.sellerOfRecordPackagingCompatible !== true) return OUTPUTS.HOLD;

  if (record.categoryEligibilityEvidenceConflict === true) return OUTPUTS.HOLD;
  if (record.amazonCategoryEligibilityStatus !== 'PROVEN') return OUTPUTS.HOLD;
  if (record.identifierRequirementEvidenceConflict === true) return OUTPUTS.HOLD;
  if (record.identifierRequirementStatus !== 'RESOLVED') return OUTPUTS.HOLD;
  if (record.gtinExemptionClaimed === true && record.gtinExemptionEvidenceStatus !== 'PROVEN') return OUTPUTS.HOLD;

  if (record.fulfilmentModelEvidenceConflict === true) return OUTPUTS.HOLD;
  if (record.fulfilmentModelStatus !== 'RESOLVED') return OUTPUTS.HOLD;
  if (record.supplierMarketplaceFulfilmentCompatible === false) return OUTPUTS.NOT_ELIGIBLE;
  if (record.supplierMarketplaceFulfilmentCompatible !== true) return OUTPUTS.HOLD;

  if (record.stockEvidenceConflict === true) return OUTPUTS.HOLD;
  if (record.stockSyncSafetyProven !== true) return OUTPUTS.HOLD;
  if (record.stockSyncEvidenceFresh !== true) return OUTPUTS.HOLD;
  if (record.stockVariantIdentityMatches !== true) return OUTPUTS.HOLD;

  if (record.fulfilmentCostEvidenceConflict === true) return OUTPUTS.HOLD;
  if (record.fulfilmentCostKnown !== true) return OUTPUTS.HOLD;
  if (record.referralFeeEvidenceConflict === true) return OUTPUTS.HOLD;
  if (record.referralFeeCategoryKnown !== true) return OUTPUTS.HOLD;

  if (typeof record.conservativeContributionAud !== 'number' || !Number.isFinite(record.conservativeContributionAud)) return OUTPUTS.HOLD;
  if (record.conservativeContributionAud <= 0) return OUTPUTS.NOT_ELIGIBLE;

  if (record.evidenceFresh !== true || record.sourceIdentityMatches !== true) return OUTPUTS.HOLD;
  return OUTPUTS.ELIGIBLE;
}

export function amazonChannelDecision(record) {
  return Object.freeze({
    disposition: amazonChannelGate(record),
    publicationAuthority: false,
    productionMutation: false,
    networkIo: false,
    canonicalInventoryAuthority: 'SHOPIFY',
  });
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export { OUTPUTS };
