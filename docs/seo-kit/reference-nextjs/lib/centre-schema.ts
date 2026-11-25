import { SITE } from './bjsl-seo';
export type VerifiedCentre = {
  id: string; slug: string; name: string;
  verifiedPhysicalCentre: boolean; operational: boolean;
  street: string; locality: string; pincode: string;
  phoneE164: string; mapsUrl?: string;
  latitude?: number; longitude?: number;
  hours: { days: string[]; opens: string; closes: string }[];
  centrePageUrl: string;
};
/** No fake GBP entities for home collection service areas or virtual dispatch locations. */
export function centreJsonLd(c: VerifiedCentre) {
  if (!c.verifiedPhysicalCentre || !c.operational) return null;
  if (!/^[0-9]{6}$/.test(c.pincode) || !/^\+91[6-9][0-9]{9}$/.test(c.phoneE164))
    throw new Error("Centre's verified postal code or phone is invalid");
  if (!c.centrePageUrl.startsWith(SITE+'/')) throw new Error('Invalid canonical centre URL');
  if (c.mapsUrl) {
    const map = new URL(c.mapsUrl);
    if (map.protocol !== 'https:' || !['www.google.com','maps.google.com','maps.app.goo.gl','goo.gl'].includes(map.hostname))
      throw new Error('Maps URL must be a verified Google Maps link');
  }
  return { '@context': 'https://schema.org', '@type': 'LocalBusiness',
    '@id': `${c.centrePageUrl}#location`, name: c.name,
    url: c.centrePageUrl, telephone: c.phoneE164,
    branchOf: { '@id': `${SITE}/#organization` },
    address: { '@type':'PostalAddress', streetAddress:c.street,
      addressLocality:c.locality, addressRegion:'Karnataka',
      postalCode:c.pincode, addressCountry:'IN' },
    ...(c.latitude !== undefined && c.longitude !== undefined ? { geo: {
      '@type':'GeoCoordinates', latitude:c.latitude, longitude:c.longitude } } : {}),
    ...(c.mapsUrl ? { hasMap: c.mapsUrl } : {}),
    openingHoursSpecification: c.hours.map(h => ({ '@type':'OpeningHoursSpecification',
      dayOfWeek:h.days, opens:h.opens, closes:h.closes }))
  };
}
