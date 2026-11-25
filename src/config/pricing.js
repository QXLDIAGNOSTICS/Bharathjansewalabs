// Central pricing-display policy.
//
// Reference / "MRP" / strike-through prices and "% OFF" badges are hidden until
// Finance approves a single, documented reference-price methodology. The site
// previously showed contradictory reference prices for the same test (e.g. CBC
// ₹400 / ₹410 / ₹450, HbA1c ₹650 / ₹720, Lipid ₹600 / ₹750). Only the BJSL
// selling price is shown while this is false. Do not flip this to true without
// a dated, Finance-approved comparison of equivalent tests and total charges.
export const SHOW_REFERENCE_PRICES = false;

// Home-collection fee policy — single source for cart, booking wizard and
// WhatsApp messages. FINANCE TO CONFIRM: the cart previously charged ₹100 and
// the booking wizard ₹50 for the same order.
export const HOME_COLLECTION_FEE = 100;
export const FREE_HOME_COLLECTION_MIN_ORDER = 499;
