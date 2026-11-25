/** Safe, testable SEO + medical entity helpers for integration with existing Next.js site.
 * All entities below must come from an approved business database. Never import guessed prices.
 */
export const SITE = 'https://bharathjansewalabs.com';
export const BRAND = 'Bharath Jan Sewa Labs';
export type Reviewer = {
  name: string; qualifications: string[]; specialty: string;
  reviewDate: string; credentialsVerified: boolean;
  council?: string; registrationNumber?: string;
};
export type PerformingLab = {
  id: string; legalName: string; certificateNumber?: string;
  certificateUrl?: string; certificateExpires?: string;
  qualityApproved: boolean; accreditedTestIds: string[];
};
export type ApprovedTest = {
  id: string; slug: string; name: string; alternateNames: string[];
  summary: string; specimen: string; preparation: string;
  approval: { medical: boolean; finance: boolean; operations: boolean };
  pagePublished: boolean; priceInr: number | null;
  priceValidUntil: string | null; mrpInr?: number | null;
  collectionFeeDisclosure: string; estimatedTat?: string | null;
  reviewer?: Reviewer; performingLab?: PerformingLab;
  normalRange?: string; conditionsUsedToDiagnose?: string[];
};

export function indiaDate(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(now);
}
export function approvedForPublic(t: ApprovedTest): boolean {
  return t.pagePublished && t.approval.medical && t.approval.operations;
}
export function approvedPrice(t: ApprovedTest, now = new Date()): number | null {
  if (!approvedForPublic(t) || !t.approval.finance ||
      t.priceInr === null || !Number.isInteger(t.priceInr) || t.priceInr < 0 ||
      !t.priceValidUntil || !/^\d{4}-\d{2}-\d{2}$/.test(t.priceValidUntil) ||
      t.priceValidUntil < indiaDate(now)) return null;
  return t.priceInr;
}
export function canonical(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//') || /[?#]/.test(path))
    throw new Error('Use a validated absolute pathname without query or fragment');
  return SITE + (path === '/' ? '/' : path.replace(/\/+$/, '') + '/');
}
export function testUrl(t: ApprovedTest): string {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.slug)) throw new Error('Invalid slug');
  return canonical(`/tests/${t.slug}`);
}
const id = (suffix: string) => `${SITE}/#${suffix}`;
export function organizationJsonLd() {
  return { '@context': 'https://schema.org', '@type': 'MedicalOrganization',
    '@id': id('organization'), name: BRAND, url: SITE,
    areaServed: { '@type': 'City', name: 'Bengaluru' },
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Published diagnostic tests', url: canonical('/tests') } };
}
function verifiedScope(t: ApprovedTest): boolean {
  const lab = t.performingLab;
  if (!lab?.qualityApproved || !lab.certificateNumber || !lab.certificateUrl ||
      !lab.certificateExpires || lab.certificateExpires < indiaDate()) return false;
  return lab.accreditedTestIds.includes(t.id);
}
export function testJsonLd(t: ApprovedTest) {
  if (!approvedForPublic(t)) return null;
  const u = testUrl(t), price = approvedPrice(t);
  const medical: Record<string, unknown> = {
    '@type': 'MedicalTest', '@id': `${u}#medical-test`, name: t.name,
    alternateName: t.alternateNames, identifier: t.id,
    description: t.summary
  };
  // Published ranges and indications must first pass medical content review.
  if (t.normalRange) medical.normalRange = t.normalRange;
  if (t.conditionsUsedToDiagnose?.length) medical.usedToDiagnose =
    t.conditionsUsedToDiagnose.map(name => ({ '@type': 'MedicalCondition', name }));
  const service: Record<string, unknown> = {
    '@type': 'Service', '@id': `${u}#service`, name: `${t.name} test service`,
    serviceType: 'Diagnostic laboratory testing', provider: { '@id': id('organization') },
    serviceOutput: { '@id': `${u}#medical-test` },
    description: `${t.summary} ${t.collectionFeeDisclosure}`
  };
  if (price !== null && t.priceValidUntil) service.offers = {
    '@type': 'Offer', url: u, priceCurrency: 'INR', price,
    priceValidUntil: t.priceValidUntil,
    priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR', price,
      description: t.collectionFeeDisclosure }
  };
  // Place the actual performing laboratory in a distinct node; collection network is not the accredited lab.
  const labNodes: Record<string, unknown>[] = [];
  if (verifiedScope(t) && t.performingLab) {
    labNodes.push({
      '@type': 'DiagnosticLab', '@id': `${SITE}/laboratories/${encodeURIComponent(t.performingLab.id)}#lab`,
      name: t.performingLab.legalName,
      availableTest: { '@id': `${u}#medical-test` },
      hasCertification: {
        '@type': 'Certification', name: 'NABL medical testing accreditation',
        certificationIdentification: t.performingLab.certificateNumber,
        url: t.performingLab.certificateUrl,
        expires: t.performingLab.certificateExpires
      }
    });
  }
  const page: Record<string, unknown> = {
    '@type': 'MedicalWebPage', '@id': `${u}#page`, url: u,
    name: `${t.name} in Bengaluru — Price & Preparation`, description: t.summary,
    about: { '@id': `${u}#medical-test` }, mainEntity: { '@id': `${u}#service` }
  };
  const graph: Record<string, unknown>[] = [page, medical, service, ...labNodes,
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Test Prices', item: canonical('/tests') },
      { '@type': 'ListItem', position: 3, name: t.name, item: u }
    ] }];
  const r = t.reviewer;
  if (r?.credentialsVerified && /^\d{4}-\d{2}-\d{2}$/.test(r.reviewDate)) {
    const rid = `${SITE}/authors/${encodeURIComponent(r.name.toLowerCase().replace(/\s+/g, '-'))}/#person`;
    page.lastReviewed = r.reviewDate;
    page.reviewedBy = { '@id': rid };
    graph.push({ '@type': 'Person', '@id': rid, name: r.name, jobTitle: r.specialty,
      hasCredential: r.qualifications.map(q => ({ '@type': 'EducationalOccupationalCredential', name: q })),
      ...(r.council && r.registrationNumber ? { identifier: {
        '@type': 'PropertyValue', propertyID: r.council, value: r.registrationNumber
      }} : {}) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
