// Price bands shared by the homepage price slider (src/pages/Home.jsx) and the
// dedicated price pages (scripts/generate-price-band-pages.mjs).
//  - slideMin/slideMax: the non-overlapping range shown on each homepage slide
//  - pageMin/pageMax:   the range listed on the dedicated page (e.g. "under ₹100"
//    lists everything up to ₹100)
export const PRICE_BANDS = [
  {
    slug: 'tests-under-50',
    slideLabel: '₹50 & below', slideTitle: 'Essential investigations', slideMin: 0, slideMax: 50,
    pageMin: 0, pageMax: 50, pageTitle: 'Blood Tests Under ₹50', pageLabel: 'Under ₹50',
    eyebrow: 'Essential tests', accent: '#16A34A', tint: '#F0FDF4',
    intro: 'Essential blood and urine investigations such as blood glucose, creatinine, urea and urine routine.',
  },
  {
    slug: 'tests-under-100',
    slideLabel: '₹51 – ₹100', slideTitle: 'Affordable routine tests', slideMin: 51, slideMax: 100,
    pageMin: 0, pageMax: 100, pageTitle: 'Blood Tests Under ₹100', pageLabel: 'Under ₹100',
    eyebrow: 'Routine tests', accent: '#0284C7', tint: '#F0F9FF',
    intro: 'Routine tests including haemoglobin, calcium, liver enzymes, blood group and TSH.',
  },
  {
    slug: 'tests-under-200',
    slideLabel: '₹101 – ₹200', slideTitle: 'Routine diagnostic profiles', slideMin: 101, slideMax: 200,
    pageMin: 0, pageMax: 200, pageTitle: 'Blood Tests Under ₹200', pageLabel: 'Under ₹200',
    eyebrow: 'Routine profiles', accent: '#7C3AED', tint: '#F5F3FF',
    intro: 'Common profiles such as CBC with ESR, thyroid profile, electrolytes and PT/INR.',
  },
  {
    slug: 'tests-under-300',
    slideLabel: '₹201 – ₹300', slideTitle: 'Diabetes & other investigations', slideMin: 201, slideMax: 300,
    pageMin: 0, pageMax: 300, pageTitle: 'Blood Tests Under ₹300', pageLabel: 'Under ₹300',
    eyebrow: 'Diabetes & more', accent: '#D97706', tint: '#FFFBEB',
    intro: 'Includes HbA1c, lipid profile, iron studies, CRP and infection screening tests.',
  },
  {
    slug: 'tests-under-500',
    slideLabel: '₹301 – ₹500', slideTitle: 'Advanced investigations', slideMin: 301, slideMax: 500,
    pageMin: 0, pageMax: 500, pageTitle: 'Blood Tests Under ₹500', pageLabel: 'Under ₹500',
    eyebrow: 'Advanced tests', accent: '#DB2777', tint: '#FDF2F8',
    intro: 'Includes liver and renal profiles, vitamin B12, ferritin, hormones and PSA.',
  },
  {
    slug: 'tests-above-500',
    slideLabel: 'Above ₹500', slideTitle: 'Selected specialised tests', slideMin: 501, slideMax: 100000,
    pageMin: 501, pageMax: 100000, pageTitle: 'Specialised Tests Above ₹500', pageLabel: 'Above ₹500',
    eyebrow: 'Specialised tests', accent: '#BB1827', tint: '#FEF2F2',
    intro: 'Specialised investigations such as vitamin D, D-dimer, troponin I, tumour markers and anti-TPO, to be done as advised by your doctor.',
  },
];
