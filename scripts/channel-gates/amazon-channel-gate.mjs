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

  if (record.sellerOfRecordPackagingCompatible === false) {
    return OUTPUTS.NOT_ELIGIBLE;
  }
  if (record.sellerOfRecordPackagingCompatible !== true) {
    return OUTPUTS.HOLD;
  }

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
