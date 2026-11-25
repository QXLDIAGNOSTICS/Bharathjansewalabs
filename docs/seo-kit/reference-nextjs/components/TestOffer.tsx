import type { ApprovedTest } from '../lib/bjsl-seo';
import { approvedPrice } from '../lib/bjsl-seo';

/** Integrate into existing test page; never show an offer or fake instant checkout when unapproved. */
export function TestOffer({ test, checkoutLive }: {
  test: ApprovedTest; checkoutLive: boolean;
}) {
  const price = approvedPrice(test);
  const url = checkoutLive
    ? `/checkout?test_id=${encodeURIComponent(test.id)}`
    : '/our-centres/';
  return <section aria-label="Test price and booking" className="rounded-xl border p-5">
    <h2 className="text-xl font-semibold">{test.name} — Price & Collection</h2>
    {price === null ? <p>Price is being verified. Please confirm the current payable amount.</p>
      : <><p className="text-2xl font-bold">₹{price.toLocaleString('en-IN')}</p>
        <p>Tariff valid until: <time dateTime={test.priceValidUntil!}>{test.priceValidUntil}</time></p></>}
    <p>Sample: {test.specimen}</p>
    <p>Preparation: {test.preparation}</p>
    {test.estimatedTat && <p>Expected turnaround: {test.estimatedTat}. Confirm at booking.</p>}
    <p>{test.collectionFeeDisclosure}</p>
    <a className="inline-block rounded bg-red-700 px-4 py-3 text-white" href={url}>
      {checkoutLive && price !== null ? 'Continue to verified checkout' : 'Check collection and final cost'}
    </a>
    <p className="text-sm">The final payable amount must be displayed and accepted before any booking is confirmed.</p>
  </section>;
}
