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
 */
export function amazonChannelGate(record) {
  if (!record || typeof record !== 'object') return OUTPUTS.HOLD;

  if (record.explicitNotEligible === true) return OUTPUTS.NOT_ELIGIBLE;
  if (record.placeholder === true) return OUTPUTS.HOLD;

  if (!nonEmpty(record.exactSku) || !nonEmpty(record.identifierEvidence)) {
    return OUTPUTS.HOLD;
  }

  if (record.marketplacePermission === 'DENIED') {
    return OUTPUTS.NOT_ELIGIBLE;
  }
  if (record.marketplacePermission !== 'PROVEN') {
    return OUTPUTS.PERMISSION_REQUIRED;
  }

  // Seller-of-record identity must be backed by explicit evidence. Packaging
  // compatibility alone is not enough to prove who the marketplace seller is.
  if (record.sellerOfRecordEvidenceStatus !== 'PROVEN') return OUTPUTS.HOLD;
  if (record.sellerOfRecordPackagingCompatible === false) {
    return OUTPUTS.NOT_ELIGIBLE;
  }
  if (record.sellerOfRecordPackagingCompatible !== true) {
    return OUTPUTS.HOLD;
  }

  // Exact category and identifier/GTIN requirements remain independent gates.
  // Product-title/category guesses or unsupported exemption claims fail closed.
  if (record.amazonCategoryEligibilityStatus !== 'PROVEN') return OUTPUTS.HOLD;
  if (record.identifierRequirementStatus !== 'RESOLVED') return OUTPUTS.HOLD;
  if (record.gtinExemptionClaimed === true && record.gtinExemptionEvidenceStatus !== 'PROVEN') {
    return OUTPUTS.HOLD;
  }

  // FBA/FBM selection cannot override supplier marketplace fulfilment rights.
  if (record.fulfilmentModelStatus !== 'RESOLVED') return OUTPUTS.HOLD;
  if (record.supplierMarketplaceFulfilmentCompatible === false) {
    return OUTPUTS.NOT_ELIGIBLE;
  }
  if (record.supplierMarketplaceFulfilmentCompatible !== true) {
    return OUTPUTS.HOLD;
  }

  // Shopify remains canonical inventory authority. Freshness and exact variant
  // identity are required independently from a broad "stock sync" assertion.
  if (record.stockSyncSafetyProven !== true) return OUTPUTS.HOLD;
  if (record.stockSyncEvidenceFresh !== true) return OUTPUTS.HOLD;
  if (record.stockVariantIdentityMatches !== true) return OUTPUTS.HOLD;

  if (record.fulfilmentCostKnown !== true) return OUTPUTS.HOLD;
  if (record.referralFeeCategoryKnown !== true) return OUTPUTS.HOLD;

  if (typeof record.conservativeContributionAud !== 'number' ||
      !Number.isFinite(record.conservativeContributionAud)) {
    return OUTPUTS.HOLD;
  }
  if (record.conservativeContributionAud <= 0) return OUTPUTS.NOT_ELIGIBLE;

  if (record.evidenceFresh !== true || record.sourceIdentityMatches !== true) {
    return OUTPUTS.HOLD;
  }

  return OUTPUTS.ELIGIBLE;
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export { OUTPUTS };
