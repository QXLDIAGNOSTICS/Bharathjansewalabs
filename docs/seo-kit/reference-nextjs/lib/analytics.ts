/** Do not send PHI or health test IDs to advertising analytics. */
type DL = Window & { dataLayer?: Record<string, unknown>[] };
export function trackPublicBookingEvent(input: {
  status: 'confirmed_pay_on_collection' | 'paid_online';
  amountInr: number; nonMedicalReference: string;
}, measurementConsent: boolean) {
  if (!measurementConsent || typeof window === 'undefined') return;
  if (!Number.isInteger(input.amountInr) || input.amountInr < 0) return;
  const w = window as DL;
  w.dataLayer ??= [];
  w.dataLayer.push({
    event: input.status === 'paid_online' ? 'purchase' : 'generate_lead',
    currency: 'INR', value: input.amountInr,
    // Only a non-sensitive reference. Never use mobile, patient or medical identifiers.
    transaction_id: input.status === 'paid_online' ? input.nonMedicalReference : undefined,
    service_category: 'diagnostic_booking'
  });
}
