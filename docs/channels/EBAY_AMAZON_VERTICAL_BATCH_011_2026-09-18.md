# eBay / Amazon Vertical Batch 011 — 2026-09-18

Status: EXECUTED / FAIL-CLOSED

## Fresh scan

- Canonical/default branch remains at `79d50227fe19826d42c43e7dec15ce245ad58e40` (`docs: adopt portfolio vertical batch execution doctrine`).
- Prior stacked continuation is draft PR #31 / Batch 010, head `6387a92238cf18c60024c00f3f8b64875f945c24`.
- Existing vertical PR chain remains open/draft and unmerged; no production authority is inferred from it.
- No new authenticated supplier pricing, postcode freight, Marketplace Connect mapping/order evidence, or Amazon connection evidence was available in this run.
- Shopify read-only duplicate search for UPC `810216026868`, MPN `SPT-HP1-400`, and title `SodaPup Honey Pot` returned no match.

## Batch objective

Continue the compact pet-accessory lane with a different authorised-distribution family than West Paw. Required screen: compact, clean exact identity, credible AU retail around A$40–70 where possible, lower freight risk, reputable AU distribution, and no safety/restraint claim dependency.

## Candidate family — SodaPup via Rover Pet Products

### Distribution evidence

Rover Pet Products publicly states that it is the exclusive distributor for SodaPup across Australia and New Zealand and explicitly invites wholesale enquiries. Rover also states that SodaPup products are locally stocked through the official source. This is materially stronger supply-path evidence than a generic marketplace-only product.

This does NOT prove that GlobalShopCo is an approved stockist, that dropshipping is permitted, or that eBay/Amazon resale is authorised. Those remain authenticated gates.

### Exact candidate — SodaPup Large Honey Pot, Blue

Public exact eBay evidence exposes:
- Brand: SodaPup
- Product: Large Honey Pot rubber treat dispenser / enrichment toy
- MPN: `SPT-HP1-400`
- UPC: `810216026868`
- Country of origin: United States
- Material: rubber
- eBay AU observed ask: A$46.67 from an overseas seller

Rover's current AU direct range lists Honey Pot from A$35.96 sale / A$44.95 regular, with substantial live stock shown on the public page. Rover limits SodaPup product shipping to Australia and New Zealand and calculates shipping at checkout.

### Marketplace pressure

The SodaPup family is present on eBay AU, but public results are much thinner than commodity unbranded enrichment toys. Examples include:
- Honey Pot Large around A$46.67 from an overseas seller;
- Honeycomb eBowl around A$51.61–61.58 from overseas sellers;
- local-AU eBay pet-store evidence shows SodaPup Honey Pot at A$46.99, Water Frog eTray at A$37.99, Waiting Dogs eTray at A$44.99 and Lifesaver at A$29.99.

This demonstrates a branded price band, but also confirms that a reseller cannot safely assume the manufacturer's A$44.95 regular price as protected floor pricing.

## Conservative economics screen

Using the existing eBay Pro-fee/contribution screening method from this workstream:

- at A$44.95 delivered, maximum combined product cost + outbound freight is approximately A$31.88;
- at A$46.99 delivered, maximum combined product cost + outbound freight is approximately A$33.33.

These are screening ceilings, not profit forecasts. They exclude or conservatively leave unresolved returns, advertising, integration/support overhead and GST reconciliation.

Authenticated wholesale cost and Bli Bli / regional Queensland outbound freight are UNKNOWN, so the economics gate is not GREEN.

## Quality / returns / fulfilment observations

Positive:
- official exclusive AU/NZ distributor path;
- locally stocked official-source claim;
- compact rubber enrichment product rather than bulky furniture;
- clean exact MPN/UPC;
- Rover states chew toys receive a 30-day one-time replacement guarantee;
- family has differentiated branded designs rather than pure generic price competition.

Risks / unknowns:
- GlobalShopCo stockist approval UNKNOWN;
- dropship/blind-ship capability UNKNOWN;
- eBay/Amazon reseller permission UNKNOWN;
- exact wholesale price UNKNOWN;
- exact packed weight/dimensions for `SPT-HP1-400` not independently reconciled in this batch;
- postcode freight to 4560 UNKNOWN;
- Rover public retail is currently discounted, which can compress reseller margin;
- used pet-toy returns have hygiene/resale limitations and require a clear marketplace-compatible return process.

## Decision

`SPT-HP1-400` / UPC `810216026868` — **AMBER / P1 AUTHORISED-WHOLESALE TARGET**.

It does not enter the active capped eBay pilot yet. Admission requires all of:
1. approved GlobalShopCo wholesale/retailer account or equivalent authorised source;
2. explicit eBay resale permission (and Amazon permission separately if considered there);
3. exact wholesale unit cost;
4. exact packed weight/dimensions;
5. exact freight to the nominated Queensland destination / customer-zone method;
6. blind-shipping / packing-identity and tracking evidence;
7. returns/warranty process compatible with marketplace obligations;
8. sustainable contribution below the conservative landed-cost ceiling.

## Shopify duplicate assurance

A live read-only Shopify search found no product matching the exact UPC, MPN or SodaPup Honey Pot title. No draft was created because sourcing/economics are not yet authenticated.

## Portfolio implication

SodaPup/Rover is a stronger *authorised-source structure* than generic pet enrichment sourcing and is worth keeping ahead of commodity toys. It does not yet outperform West Paw commercially because both still lack authenticated wholesale economics and marketplace permission. The correct next move is not to inflate the pilot; it is to obtain or discover a supplier path where wholesale economics and marketplace permissions can actually be verified.

## Pilot impact

- Existing capped eight-SKU eBay pilot: UNCHANGED.
- SodaPup Honey Pot: P1 authenticated-source queue only.
- West Paw Toppl Large: remains P1 authenticated-source queue only.
- No overall GREEN.

## Replenishment

If no authenticated supplier/app evidence arrives before Batch 012, stop adding near-duplicate branded enrichment toys. Pivot vertically into **supplier-path closure**: compare AU pet wholesalers/distributors that expose a trade application plus explicit online-retailer eligibility, then choose one compact product family only where marketplace permission, freight structure and exact wholesale access have a realistic path to closure.

## Safety / authority

No Shopify product mutation, eBay/Amazon publication, Marketplace Connect setting change, supplier contact, application submission, purchase, credential action, spend, merge or deployment was performed.