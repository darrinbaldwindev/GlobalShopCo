const STATES = Object.freeze({
  PASS: 'PASS',
  REJECT: 'REJECT',
  HOLD: 'UNKNOWN-HOLD',
});

/**
 * Deterministic non-production economics fixture.
 * Shopify remains canonical commercial authority. This function never writes
 * prices, inventory, products, orders, listings or supplier state.
 */
export function freeDeliveryContribution(input) {
  if (!input || typeof input !== 'object') return receipt(STATES.HOLD, null, ['invalid-input']);

  const required = [
    'supplierUnitCostAud',
    'outboundFreightAud',
    'channelFeeAud',
    'paymentFeeAud',
    'returnsWarrantyAllowanceAud',
    'sellingPriceAud',
    'targetMarginAud',
  ];

  const unknown = required.filter((key) => !finiteNonNegative(input[key]));
  if (unknown.length) return receipt(STATES.HOLD, null, unknown.map((key) => `unknown:${key}`));
  if (input.sellingPriceAud <= 0) return receipt(STATES.REJECT, null, ['non-positive-selling-price']);

  const landedAndChannelCostAud = round2(
    input.supplierUnitCostAud +
    input.outboundFreightAud +
    input.channelFeeAud +
    input.paymentFeeAud +
    input.returnsWarrantyAllowanceAud
  );
  const contributionAud = round2(input.sellingPriceAud - landedAndChannelCostAud);
  const bufferAfterTargetAud = round2(contributionAud - input.targetMarginAud);
  const state = contributionAud > 0 && bufferAfterTargetAud >= 0 ? STATES.PASS : STATES.REJECT;

  return Object.freeze({
    state,
    currency: 'AUD',
    landedAndChannelCostAud,
    contributionAud,
    targetMarginAud: round2(input.targetMarginAud),
    bufferAfterTargetAud,
    freeDeliveryAssumed: true,
    publicationAuthority: false,
    productionMutation: false,
    reasons: Object.freeze(state === STATES.PASS ? [] : ['insufficient-free-delivery-contribution']),
  });
}

function receipt(state, contributionAud, reasons) {
  return Object.freeze({
    state,
    currency: 'AUD',
    contributionAud,
    freeDeliveryAssumed: true,
    publicationAuthority: false,
    productionMutation: false,
    reasons: Object.freeze([...reasons]),
  });
}

function finiteNonNegative(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export { STATES };
