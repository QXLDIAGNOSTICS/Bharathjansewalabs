// Comprehensive Authentic Database for Bharath Jan Sewa Labs (BJSL)
// Extracted & Cleaned from bharathjansewalabs.com

export const TODAY = new Date();
export const TODAY_FORMATTED = TODAY.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); // 28 September 2026
export const TODAY_SHORT = TODAY.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); // 28 Sep 2026

export const TODAY_SLOTS = [
  `Today, ${TODAY.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} (7:00 AM - 9:00 AM)`,
  `Today, ${TODAY.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} (9:00 AM - 11:00 AM)`,
  `Today, ${TODAY.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} (11:00 AM - 1:00 PM)`,
  `Today, ${TODAY.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} (2:00 PM - 5:00 PM)`,
  `Tomorrow, ${new Date(Date.now() + 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} (7:00 AM - 9:00 AM)`
];

export const COMPANY_INFO = {
  name: 'Bharath Jan Sewa Labs (BJSL)',
  positioning: 'Diagnostics with Dignity, For Every Indian',
  mission: 'Quality diagnostics that are affordable, accessible, and timely — reaching every community, everywhere in the nation.',
  phone: '+91 98055 43143',
  email: 'contact@bharathjansewalabs.com',
  hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
  pricingClaim: 'Rates are 50–70% lower than market prices.',
  lastUpdated: TODAY_FORMATTED
};

export const CATEGORIES = [
  { id: 'all', name: 'All Tests & Packages', icon: 'Sparkles' },
  { id: 'blood', name: 'Blood Tests', icon: 'Droplet' },
  { id: 'diabetes', name: 'Diabetes & Sugar', icon: 'Activity' },
  { id: 'thyroid', name: 'Thyroid Care', icon: 'Zap' },
  { id: 'liver', name: 'Liver Function (LFT)', icon: 'ShieldCheck' },
  { id: 'kidney', name: 'Kidney Profile (KFT)', icon: 'Filter' },
  { id: 'heart', name: 'Heart & Lipids', icon: 'Heart' },
  { id: 'vitamins', name: 'Vitamins & Minerals', icon: 'Sun' },
  { id: 'hormones', name: 'Hormones & Fertility', icon: 'Dna' },
  { id: 'allergy', name: 'Allergy & Immunology', icon: 'ShieldAlert' },
  { id: 'packages', name: 'Full Body Checkups', icon: 'PackageCheck' }
];

export const INDIVIDUAL_TESTS = [
  {
    id: 'cbc-test',
    code: 'BJSL-T101',
    name: 'Complete Blood Count (CBC)',
    shortDesc: 'Evaluates overall health and detects anemia, infections, inflammation, and blood disorders.',
    category: 'blood',
    mrp: 600,
    price: 299,
    sampleType: 'Blood (EDTA)',
    fasting: 'No Fasting Required',
    tat: 'Same Day (Within 6 Hours)',
    homeCollection: true,
    centreAvailable: true,
    parametersCount: 29,
    parameters: [
      'Hemoglobin (Hb)', 'Total Leucocyte Count (TLC / WBC)', 'Differential Leucocyte Count (DLC)',
      'Platelet Count', 'Red Blood Cell Count (RBC)', 'Packed Cell Volume (PCV)', 'MCV', 'MCH', 'MCHC',
      'RDW-CV & RDW-SD', 'Neutrophils', 'Lymphocytes', 'Eosinophils', 'Monocytes', 'Basophils',
      'Absolute Neutrophil Count', 'Absolute Lymphocyte Count', 'Absolute Eosinophil Count', 'Mean Platelet Volume (MPV)'
    ],
    whyDone: 'Recommended as part of routine health evaluation, unexplained fever, weakness, or persistent infection.',
    preparation: 'No specific fasting needed. Drink water normally.'
  },
  {
    id: 'hba1c-test',
    code: 'BJSL-T102',
    name: 'HbA1c (Glycated Hemoglobin)',
    shortDesc: 'Gold standard test for measuring average blood sugar control over the past 3 months.',
    category: 'diabetes',
    mrp: 750,
    price: 349,
    sampleType: 'Blood (EDTA)',
    fasting: 'No Fasting Required',
    tat: 'Same Day',
    homeCollection: true,
    centreAvailable: true,
    parametersCount: 3,
    parameters: ['HbA1c %', 'Estimated Average Glucose (eAG mg/dL)', 'HPLC Automated Assay'],
    whyDone: 'Essential for screening prediabetes and monitoring long-term glucose control.',
    preparation: 'Can be taken at any time of day regardless of meal timing.'
  },
  {
    id: 'thyroid-profile',
    code: 'BJSL-T103',
    name: 'Thyroid Profile Total (T3, T4, TSH)',
    shortDesc: 'Comprehensive panel measuring thyroid gland function and metabolic speed.',
    category: 'thyroid',
    mrp: 850,
    price: 399,
    sampleType: 'Serum',
    fasting: '8-10 Hours Fasting Preferred (Morning Sample)',
    tat: 'Same Day',
    homeCollection: true,
    centreAvailable: true,
    parametersCount: 3,
    parameters: ['Total Triiodothyronine (T3)', 'Total Thyroxine (T4)', 'Thyroid Stimulating Hormone (TSH)'],
    whyDone: 'Detects hyperthyroidism or hypothyroidism symptoms like fatigue, weight changes, and hair loss.',
    preparation: 'Morning fasting sample preferred. Take thyroid medication after sample collection.'
  },
  {
    id: 'vitamin-d-test',
    code: 'BJSL-T104',
    name: 'Vitamin D 25-Hydroxy',
    shortDesc: 'Measures Vitamin D in blood essential for bone strength, calcium absorption, and immunity.',
    category: 'vitamins',
    mrp: 1400,
    price: 699,
    sampleType: 'Serum',
    fasting: 'No Fasting Required',
    tat: 'Same Day',
    homeCollection: true,
    centreAvailable: true,
    parametersCount: 1,
    parameters: ['25-OH Vitamin D Total'],
    whyDone: 'Evaluates bone weakness, joint pain, muscle fatigue, and immune health.',
    preparation: 'No special preparation needed.'
  },
  {
    id: 'lipid-profile',
    code: 'BJSL-T105',
    name: 'Lipid Profile Comprehensive (Heart Health)',
    shortDesc: 'Evaluates cardiovascular risk by measuring good, bad, and total cholesterol levels.',
    category: 'heart',
    mrp: 1000,
    price: 450,
    sampleType: 'Serum',
    fasting: '10-12 Hours Overnight Fasting Mandatory',
    tat: 'Same Day',
    homeCollection: true,
    centreAvailable: true,
    parametersCount: 14,
    parameters: [
      'Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'VLDL Cholesterol', 'Triglycerides',
      'Non-HDL Cholesterol', 'TC/HDL Ratio', 'LDL/HDL Ratio', 'Apolipoprotein A1', 'Apolipoprotein B'
    ],
    whyDone: 'Assesses risk of heart attack, stroke, arterial blockage, and hypertension.',
    preparation: 'Strict 10-12 hours fasting required. Water is allowed.'
  },
  {
    id: 'lft-test',
    code: 'BJSL-T106',
    name: 'Liver Function Test (LFT)',
    shortDesc: 'Panel evaluating liver proteins, enzymes, and bilirubin excretion.',
    category: 'liver',
    mrp: 950,
    price: 499,
    sampleType: 'Serum',
    fasting: '8-10 Hours Fasting Recommended',
    tat: 'Same Day',
    homeCollection: true,
    centreAvailable: true,
    parametersCount: 14,
    parameters: [
      'Bilirubin Total', 'Bilirubin Direct', 'Bilirubin Indirect', 'SGOT (AST)', 'SGPT (ALT)',
      'Alkaline Phosphatase (ALP)', 'Total Protein', 'Albumin', 'Globulin', 'A/G Ratio', 'GGT'
    ],
    whyDone: 'Screens for fatty liver, hepatitis, jaundice, and medication liver toxicity.',
    preparation: 'Overnight fasting recommended. Avoid alcohol 24 hours prior.'
  }
];

export const HEALTH_PACKAGES = [
  {
    id: 'chirayu-prime',
    code: 'BJSL-PKG01',
    name: 'Chirayu Full Body Check (PRIME)',
    image: '/images/packages/chirayu-prime.webp',
    badge: 'Most Popular Entry Checkup',
    tagline: 'Essential preventive health screening for all adults covering 71 vital parameters.',
    mrp: 2388,
    price: 796,
    savings: 1592,
    discount: '33.33%',
    parametersCount: 71,
    sampleType: 'Blood & Urine',
    fasting: '10-12 Hours Fasting Required',
    tat: 'Same Day',
    includedCategories: [
      { name: 'Lipids Profile', count: 14, items: ['Total Cholesterol', 'HDL', 'LDL', 'VLDL', 'Triglycerides', 'Ratios'] },
      { name: 'Renal / Kidney Panel', count: 7, items: ['Serum Creatinine', 'BUN', 'Uric Acid', 'Calcium', 'Electrolytes'] },
      { name: 'Diabetic Profile', count: 2, items: ['HbA1c', 'Fasting Blood Sugar'] },
      { name: 'Liver Function Test (LFT)', count: 14, items: ['Bilirubin Total/Direct', 'SGOT', 'SGPT', 'ALP', 'Proteins', 'Albumin'] },
      { name: 'Iron Profile', count: 5, items: ['Serum Iron', 'TIBC', '% Saturation'] },
      { name: 'Complete Blood Count (CBC)', count: 29, items: ['Hemoglobin', 'TLC', 'DLC', 'Platelets', 'RBC', 'PCV', 'MCV'] }
    ],
    preparation: '10-12 hours overnight fasting mandatory. Water allowed.'
  },
  {
    id: 'chirayu-master',
    code: 'BJSL-PKG02',
    name: 'Chirayu Full Body Check (MASTER)',
    image: '/images/packages/chirayu-master.webp',
    badge: 'Recommended for Age 35+',
    tagline: 'Comprehensive 109-test health evaluation with full vitamins, thyroid, & organ integrity.',
    mrp: 5698,
    price: 1566,
    savings: 4132,
    parametersCount: 109,
    sampleType: 'Blood & Urine',
    fasting: '10-12 Hours Fasting Required',
    tat: 'Same Day',
    includedCategories: [
      { name: 'Lipids Profile', count: 14, items: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides', 'Apolipoproteins'] },
      { name: 'Thyroid Profile Total', count: 3, items: ['T3', 'T4', 'TSH Ultrasensitive'] },
      { name: 'Diabetic Profile', count: 2, items: ['HbA1c', 'Fasting Glucose'] },
      { name: 'Bone Care', count: 2, items: ['Calcium', 'Phosphorus'] },
      { name: 'Iron Profile', count: 5, items: ['Serum Iron', 'TIBC', 'Ferritin'] },
      { name: 'Apolipoprotein Heart Panel', count: 3, items: ['Apo A1', 'Apo B', 'Apo B/A1 Ratio'] },
      { name: 'Complete Blood Count (CBC)', count: 29, items: ['Hemoglobin', 'TLC', 'DLC', 'Platelets'] },
      { name: 'Enzymes', count: 2, items: ['SGOT', 'SGPT'] },
      { name: 'Renal / Kidney Panel', count: 9, items: ['Creatinine', 'BUN', 'Uric Acid', 'Sodium', 'Potassium'] },
      { name: 'Zinc Marker', count: 1, items: ['Serum Zinc'] },
      { name: 'Liver Function Test (LFT)', count: 14, items: ['Bilirubin Total/Direct', 'ALP', 'Proteins'] },
      { name: 'Homocysteine Cardiac Marker', count: 1, items: ['Homocysteine'] },
      { name: 'Vitamins Profile', count: 2, items: ['Vitamin D 25-OH', 'Vitamin B12'] },
      { name: 'Insulin Fasting', count: 1, items: ['Serum Insulin'] },
      { name: 'Urine Routine Microscopic', count: 18, items: ['pH', 'Protein', 'Pus Cells', 'Crystals'] },
      { name: 'ESR Inflammation Marker', count: 1, items: ['Erythrocyte Sedimentation Rate'] },
      { name: 'Cancer Screen Marker', count: 1, items: ['Tumor Screen Marker'] },
      { name: 'Magnesium', count: 1, items: ['Serum Magnesium'] }
    ],
    preparation: '10-12 hours overnight fasting mandatory.'
  },
  {
    id: 'chirayu-advanced',
    code: 'BJSL-PKG03',
    name: 'Chirayu Full Body Check (ADVANCED)',
    image: '/images/packages/chirayu-advanced.webp',
    badge: 'Executive Shield',
    tagline: '88 diagnostic tests assessing core metabolic systems, vitamins, and organ health.',
    mrp: 4098,
    price: 1366,
    savings: 2732,
    parametersCount: 88,
    sampleType: 'Blood & Urine',
    fasting: '10-12 Hours Fasting Required',
    tat: 'Same Day',
    includedCategories: [
      { name: 'Lipids Profile', count: 14, items: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
      { name: 'Thyroid Profile', count: 3, items: ['T3', 'T4', 'TSH'] },
      { name: 'Diabetic Profile', count: 2, items: ['HbA1c', 'Fasting Glucose'] },
      { name: 'Liver Function Test (LFT)', count: 14, items: ['Bilirubin', 'SGOT', 'SGPT', 'ALP'] },
      { name: 'Iron Profile', count: 5, items: ['Serum Iron', 'TIBC'] },
      { name: 'Bone Care', count: 2, items: ['Calcium', 'Phosphorus'] },
      { name: 'CBC Panel', count: 29, items: ['Hemoglobin', 'TLC', 'DLC', 'Platelets'] },
      { name: 'Apolipoproteins', count: 3, items: ['Apo A1', 'Apo B'] },
      { name: 'Enzymes', count: 2, items: ['SGOT', 'SGPT'] },
      { name: 'Vitamins Profile', count: 2, items: ['Vitamin D', 'Vitamin B12'] },
      { name: 'Insulin Fasting', count: 1, items: ['Serum Insulin'] },
      { name: 'Zinc Marker', count: 1, items: ['Serum Zinc'] },
      { name: 'Renal Function (KFT)', count: 9, items: ['Creatinine', 'BUN', 'Uric Acid'] }
    ],
    preparation: '10-12 hours fasting required.'
  },
  {
    id: 'chirayu-men',
    code: 'BJSL-PKG04',
    name: 'Chirayu Full Body Check (MEN)',
    image: '/images/packages/chirayu-men.webp',
    badge: 'Tailored Men’s Health',
    tagline: '111 parameters specifically structured for male hormonal, prostate, & cardiovascular screening.',
    mrp: 6596,
    price: 2199,
    savings: 4397,
    parametersCount: 111,
    sampleType: 'Blood & Urine',
    fasting: '10-12 Hours Fasting Required',
    tat: 'Same Day',
    includedCategories: [
      { name: 'Lipids Profile', count: 14, items: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
      { name: 'Bone Care', count: 2, items: ['Calcium', 'Phosphorus'] },
      { name: 'Diabetic Profile', count: 2, items: ['HbA1c', 'Fasting Sugar'] },
      { name: 'Apolipoproteins', count: 3, items: ['Apo A1', 'Apo B'] },
      { name: 'Iron Profile', count: 5, items: ['Serum Iron', 'TIBC', 'Ferritin'] },
      { name: 'Enzymes', count: 2, items: ['SGOT', 'SGPT'] },
      { name: 'Complete Blood Count (CBC)', count: 29, items: ['Hemoglobin', 'TLC', 'DLC', 'Platelets'] },
      { name: 'Zinc Marker', count: 1, items: ['Serum Zinc'] },
      { name: 'Renal Function (KFT)', count: 9, items: ['Creatinine', 'BUN', 'Uric Acid'] },
      { name: 'Homocysteine Cardiac', count: 1, items: ['Homocysteine'] },
      { name: 'Liver Function Test (LFT)', count: 14, items: ['Bilirubin Total/Direct', 'ALP'] },
      { name: 'Insulin Fasting', count: 1, items: ['Serum Insulin'] },
      { name: 'Thyroid Profile', count: 3, items: ['T3', 'T4', 'TSH'] },
      { name: 'ESR Marker', count: 1, items: ['ESR'] },
      { name: 'Vitamins Profile', count: 2, items: ['Vitamin D', 'Vitamin B12'] },
      { name: 'Tumor / Prostate Screen', count: 2, items: ['PSA Total', 'Prostate Marker'] },
      { name: 'Urine Routine Analysis', count: 18, items: ['Complete Urine Microscopic'] },
      { name: 'Androgen Male Hormone', count: 1, items: ['Testosterone Total'] },
      { name: 'Magnesium', count: 1, items: ['Serum Magnesium'] }
    ],
    preparation: '10-12 hours fasting required.'
  },
  {
    id: 'chirayu-women',
    code: 'BJSL-PKG05',
    name: 'Chirayu Full Body Check (WOMEN)',
    image: '/images/packages/chirayu-women.webp',
    badge: 'Tailored Women’s Health',
    tagline: '112 parameters covering female hormones, bone density markers, thyroid, & anemia.',
    mrp: 6498,
    price: 2166,
    savings: 4332,
    parametersCount: 112,
    sampleType: 'Blood & Urine',
    fasting: '10-12 Hours Fasting Required',
    tat: 'Same Day',
    includedCategories: [
      { name: 'Lipids Profile', count: 14, items: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
      { name: 'Cancer Marker', count: 1, items: ['CA-125 Breast/Ovarian Marker'] },
      { name: 'Diabetic Profile', count: 2, items: ['HbA1c', 'Fasting Sugar'] },
      { name: 'Thyroid Profile', count: 3, items: ['T3', 'T4', 'TSH'] },
      { name: 'Iron Profile', count: 5, items: ['Serum Iron', 'TIBC', 'Ferritin'] },
      { name: 'Apolipoproteins', count: 3, items: ['Apo A1', 'Apo B'] },
      { name: 'CBC Panel', count: 29, items: ['Hemoglobin', 'TLC', 'DLC', 'Platelets'] },
      { name: 'Enzymes', count: 2, items: ['SGOT', 'SGPT'] },
      { name: 'Renal Function (KFT)', count: 9, items: ['Creatinine', 'BUN', 'Uric Acid'] },
      { name: 'Zinc Marker', count: 1, items: ['Serum Zinc'] },
      { name: 'Liver Function Test (LFT)', count: 14, items: ['Bilirubin Total/Direct', 'ALP'] },
      { name: 'Homocysteine Cardiac', count: 1, items: ['Homocysteine'] },
      { name: 'Hormones Female Panel', count: 3, items: ['Estrogen / FSH / LH Screen'] },
      { name: 'Insulin Fasting', count: 1, items: ['Serum Insulin'] },
      { name: 'Vitamins Profile', count: 2, items: ['Vitamin D', 'Vitamin B12'] },
      { name: 'ESR Marker', count: 1, items: ['ESR'] },
      { name: 'Urine Routine Analysis', count: 18, items: ['Complete Urine Microscopic'] },
      { name: 'Magnesium', count: 1, items: ['Serum Magnesium'] },
      { name: 'Calcium', count: 1, items: ['Serum Calcium'] },
      { name: 'Phosphorus', count: 1, items: ['Serum Phosphorus'] }
    ],
    preparation: '10-12 hours fasting required.'
  },
  {
    id: 'senior-male',
    code: 'BJSL-PKG06',
    name: 'Chirayu Full Body Check (Senior Citizen MALE)',
    image: '/images/packages/senior-male.webp',
    badge: 'Senior Elders Care',
    tagline: '110 parameters focused on cardiac safety, joint health, diabetes, and kidney protection for senior men.',
    mrp: 6396,
    price: 1999,
    savings: 4397,
    parametersCount: 110,
    sampleType: 'Blood & Urine',
    fasting: '10-12 Hours Fasting Required',
    tat: 'Same Day',
    includedCategories: [
      { name: 'Lipids Profile', count: 14, items: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
      { name: 'Thyroid Profile', count: 3, items: ['T3', 'T4', 'TSH'] },
      { name: 'Diabetic Profile', count: 2, items: ['HbA1c', 'Fasting Glucose'] },
      { name: 'Bone Care', count: 2, items: ['Calcium', 'Phosphorus'] },
      { name: 'Iron Profile', count: 5, items: ['Serum Iron', 'TIBC'] },
      { name: 'Apolipoproteins', count: 3, items: ['Apo A1', 'Apo B'] },
      { name: 'CBC Panel', count: 29, items: ['Hemoglobin', 'TLC', 'DLC', 'Platelets'] },
      { name: 'Enzymes', count: 2, items: ['SGOT', 'SGPT'] },
      { name: 'Renal Function (KFT)', count: 9, items: ['Creatinine', 'BUN', 'Uric Acid'] },
      { name: 'Zinc Marker', count: 1, items: ['Serum Zinc'] },
      { name: 'Liver Function Test (LFT)', count: 14, items: ['Bilirubin', 'ALP'] },
      { name: 'Homocysteine Cardiac', count: 1, items: ['Homocysteine'] },
      { name: 'Vitamins Profile', count: 2, items: ['Vitamin D', 'Vitamin B12'] },
      { name: 'Insulin Fasting', count: 1, items: ['Serum Insulin'] },
      { name: 'Urine Routine Analysis', count: 18, items: ['Urine Microscopic'] },
      { name: 'ESR Marker', count: 1, items: ['ESR'] },
      { name: 'Hormone Male', count: 1, items: ['Testosterone Total'] },
      { name: 'Cancer / PSA Screen', count: 2, items: ['PSA Total', 'Prostate Marker'] }
    ],
    preparation: '10-12 hours fasting required.'
  },
  {
    id: 'senior-female',
    code: 'BJSL-PKG07',
    name: 'Chirayu Full Body Check (Senior Citizen FEMALE)',
    image: '/images/packages/senior-female.webp',
    badge: 'Senior Elders Care',
    tagline: '108 parameters focused on osteoporosis risk, joint health, thyroid, & cardiac wellness for senior women.',
    mrp: 6396,
    price: 1999,
    savings: 4397,
    parametersCount: 108,
    sampleType: 'Blood & Urine',
    fasting: '10-12 Hours Fasting Required',
    tat: 'Same Day',
    includedCategories: [
      { name: 'Lipids Profile', count: 14, items: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
      { name: 'Bone Care', count: 2, items: ['Calcium', 'Phosphorus'] },
      { name: 'Diabetic Profile', count: 2, items: ['HbA1c', 'Fasting Sugar'] },
      { name: 'Enzymes', count: 2, items: ['SGOT', 'SGPT'] },
      { name: 'Iron Profile', count: 5, items: ['Serum Iron', 'TIBC'] },
      { name: 'Apolipoproteins', count: 3, items: ['Apo A1', 'Apo B'] },
      { name: 'CBC Panel', count: 29, items: ['Hemoglobin', 'TLC', 'DLC', 'Platelets'] },
      { name: 'Zinc Marker', count: 1, items: ['Serum Zinc'] },
      { name: 'Renal Function (KFT)', count: 9, items: ['Creatinine', 'BUN', 'Uric Acid'] },
      { name: 'Homocysteine Cardiac', count: 1, items: ['Homocysteine'] },
      { name: 'Thyroid Profile', count: 3, items: ['T3', 'T4', 'TSH'] },
      { name: 'Insulin Fasting', count: 1, items: ['Serum Insulin'] },
      { name: 'Liver Function Test (LFT)', count: 14, items: ['Bilirubin', 'ALP'] },
      { name: 'ESR Marker', count: 1, items: ['ESR'] },
      { name: 'Vitamins Profile', count: 2, items: ['Vitamin D', 'Vitamin B12'] },
      { name: 'Cancer Screen Marker', count: 1, items: ['Female Tumor Screen'] },
      { name: 'Urine Routine Analysis', count: 18, items: ['Urine Microscopic'] }
    ],
    preparation: '10-12 hours fasting required.'
  },
  {
    id: 'all-in-one',
    code: 'BJSL-PKG08',
    name: 'Chirayu Full Body Check (ALL IN ONE)',
    image: '/images/packages/all-in-one.webp',
    badge: 'Ultimate 360° Shield',
    tagline: '136 parameters combining full body checkup with a 27-parameter food & respiratory allergy panel.',
    mrp: 16630,
    price: 6366,
    savings: 10264,
    discount: '38.28%',
    parametersCount: 136,
    sampleType: 'Blood & Urine',
    fasting: '10-12 Hours Fasting Required',
    tat: '03 Days',
    includedCategories: [
      { name: 'Lipids Profile', count: 14, items: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
      { name: 'Enzymes', count: 2, items: ['SGOT', 'SGPT'] },
      { name: 'Diabetic Profile', count: 2, items: ['HbA1c', 'Fasting Sugar'] },
      { name: 'Apolipoproteins', count: 3, items: ['Apo A1', 'Apo B'] },
      { name: 'Iron Profile', count: 5, items: ['Serum Iron', 'TIBC', 'Ferritin'] },
      { name: 'Zinc Marker', count: 1, items: ['Serum Zinc'] },
      { name: 'Complete Blood Count (CBC)', count: 29, items: ['Hemoglobin', 'TLC', 'DLC', 'Platelets'] },
      { name: 'Homocysteine Cardiac', count: 1, items: ['Homocysteine'] },
      { name: 'Renal Function (KFT)', count: 9, items: ['Creatinine', 'BUN', 'Uric Acid'] },
      { name: 'Insulin Fasting', count: 1, items: ['Serum Insulin'] },
      { name: 'Thyroid Profile', count: 3, items: ['T3', 'T4', 'TSH'] },
      { name: 'ESR Marker', count: 1, items: ['ESR'] },
      { name: 'Liver Function Test (LFT)', count: 14, items: ['Bilirubin Total/Direct', 'ALP'] },
      { name: 'Cancer Screen Marker', count: 1, items: ['Tumor Screen Marker'] },
      { name: 'Vitamins Profile', count: 2, items: ['Vitamin D', 'Vitamin B12'] },
      { name: 'Magnesium', count: 1, items: ['Serum Magnesium'] },
      { name: 'Urine Routine Analysis', count: 18, items: ['Complete Urine Microscopic'] },
      { name: 'Allergy Panel (Food & Dust)', count: 27, items: ['IgE Specific Allergy Screen (27 Allergens)'] },
      { name: 'Bone Care', count: 2, items: ['Calcium', 'Phosphorus'] }
    ],
    preparation: '10-12 hours fasting required. 3 days report turnaround.'
  }
];

export const CENTRES = [
  {
    id: 'sanjaynagar',
    name: 'BJSL Centre – Sanjaynagar',
    area: 'Sanjaynagar',
    city: 'Bangalore',
    pincode: '560094',
    address: 'GMR Layout, 2nd Main, Sanjay Nagar Main Road, near RMV Hospital, Geddalahalli, Bengaluru 560094',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Phlebotomy Collection Hub', 'ECG Desk', 'NABL Processing Dispatch', 'Home Sample Dispatch'],
    homeCollectionCoverage: ['Sanjaynagar', 'RMV 2nd Stage', 'Hebbal', 'Geddalahalli', 'Dollars Colony', 'Mathikere'],
    rating: 4.9,
    reviewCount: 312
  },
  {
    id: 'ittamadu',
    name: 'BJSL Centre – Ittamadu / Banashankari',
    area: 'Ittamadu',
    city: 'Bangalore',
    pincode: '560085',
    address: 'House No. 36, 23rd Cross Road, near Valentine Model School, Manjunath Nagar, Ittamadu, Banashankari 3rd Stage, Bengaluru 560085',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Diagnostic Specimen Collection', 'Express Home Collection Dispatch'],
    homeCollectionCoverage: ['Ittamadu', 'Banashankari 3rd Stage', 'Katriguppe', 'Manjunath Nagar', 'Girinagar'],
    rating: 4.8,
    reviewCount: 189
  },
  {
    id: 'peenya',
    name: 'BJSL Centre – Peenya 2nd Stage',
    area: 'Peenya',
    city: 'Bangalore',
    pincode: '560091',
    address: 'No. 113, 77, 14th Cross Road, Peenya 2nd Stage, Srigandha Nagar, Hegganahalli, Bengaluru 560091',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Worker & Corporate Health Screenings', 'STAT Specimen Transport'],
    homeCollectionCoverage: ['Peenya 2nd Stage', 'Srigandha Nagar', 'Hegganahalli', 'Yeshwanthpur'],
    rating: 4.8,
    reviewCount: 245
  },
  {
    id: 'kr-market',
    name: 'BJSL Centre – KR Market / Opp. Victoria Hospital',
    area: 'KR Market',
    city: 'Bangalore',
    pincode: '560002',
    address: 'No. 102/A, K R Road, Near City Market Metro Station, Kalasipalya, Bengaluru 560002',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Metro Accessible Collection Desk', 'Emergency Sample Handling Desk'],
    homeCollectionCoverage: ['KR Market', 'Kalasipalya', 'Chamarajpet', 'Victoria Hospital Hub'],
    rating: 4.9,
    reviewCount: 380
  },
  {
    id: 'srirampura',
    name: 'BJSL Centre – Ambedkar Tapasana Kendra Srirampura',
    area: 'Srirampura',
    city: 'Bangalore',
    pincode: '560021',
    address: 'Dr B R Ambedkar Tapasana Kendra, 5th Block, Gowtham Nagar, Srirampura, Bengaluru 560021',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Community Healthcare Collection Point', 'Affordable Health Checkup Desk'],
    homeCollectionCoverage: ['Srirampura', 'Gowtham Nagar', 'Malleshwaram', 'Rajajinagar'],
    rating: 4.8,
    reviewCount: 195
  },
  {
    id: 'subramanyapura',
    name: 'BJSL Centre – Subramanyapura',
    area: 'Subramanyapura',
    city: 'Bangalore',
    pincode: '560061',
    address: 'Park View Diagnostic Center, 11, 1st Street, Jayanagar Housing Society Layout, Subramanyapura, Bengaluru 560061',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Pediatric & Geriatric Sample Handling', 'Home Dispatch'],
    homeCollectionCoverage: ['Subramanyapura', 'Jayanagar Society Layout', 'Uttarahalli', 'Vasanthapura'],
    rating: 4.8,
    reviewCount: 164
  },
  {
    id: 'kengeri',
    name: 'BJSL Centre – BDA Complex Kengeri',
    area: 'Kengeri',
    city: 'Bangalore',
    pincode: '560059',
    address: 'Shop No. 32, BDA Commercial Complex, Mysore Road, Jnanabharathi Complex, Harsha Layout, Kengeri Satellite Town, Bengaluru 560059',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Full Diagnostic Sample Collection', 'Digital Report Kiosk'],
    homeCollectionCoverage: ['Kengeri Satellite Town', 'Harsha Layout', 'Mysore Road', 'RR Nagar'],
    rating: 4.9,
    reviewCount: 420
  },
  {
    id: 'jaraganahalli',
    name: 'BJSL Centre – Jaraganahalli / JP Nagar 6th Phase',
    area: 'Jaraganahalli',
    city: 'Bangalore',
    pincode: '560078',
    address: 'No. 41, Basava Kalyana 17th D Cross, Basavaraj Layout, JP Nagar 6th Phase, Jaraganahalli, Bengaluru 560078',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Phlebotomy Hub', 'Cold-Chain Transport Desk'],
    homeCollectionCoverage: ['Jaraganahalli', 'JP Nagar 6th Phase', 'Basavaraj Layout', 'Kanakapura Road'],
    rating: 4.9,
    reviewCount: 298
  },
  {
    id: 'vv-puram',
    name: 'BJSL Centre – VASAVI Clinic VV Puram',
    area: 'VV Puram',
    city: 'Bangalore',
    pincode: '560004',
    address: 'Vasavi Convention Center, #25, National High School Road, V.V. Puram, Basavanagudi, Bengaluru 560004',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Community Health Desk', 'Express Blood Specimen Collection'],
    homeCollectionCoverage: ['VV Puram', 'Basavanagudi', 'National High School Road', 'Gandhi Bazaar'],
    rating: 4.9,
    reviewCount: 215
  },
  {
    id: 'basaveshwara-nagar',
    name: 'BJSL Centre – Basaveshwara Nagar',
    area: 'Basaveshwara Nagar',
    city: 'Bangalore',
    pincode: '560079',
    address: 'Netaji Clinic Desk, 3rd Main Road, Basaveshwara Nagar, Bengaluru 560079',
    phone: '+91 98055 43143',
    email: 'contact@bharathjansewalabs.com',
    hours: 'Mon - Sat: 7:00 AM - 8:00 PM | Sun: 7:00 AM - 2:00 PM',
    facilities: ['Phlebotomy Desk', 'Home Collection Dispatch'],
    homeCollectionCoverage: ['Basaveshwara Nagar', 'Kamalanagar', 'Kurubarahalli', 'Rajajinagar 3rd Block'],
    rating: 4.8,
    reviewCount: 175
  }
];

export const GOOGLE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Parameshwar Biradar',
    rating: 5,
    date: '2 weeks ago',
    centre: 'Kengeri Centre',
    text: 'Blood sample collection was smooth, prompt, and painless. Phlebotomist came at 7:00 AM as scheduled. Got report on WhatsApp by afternoon. Rates are 60% lower than corporate chain labs with NABL partner accuracy!',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Nagaratna',
    rating: 5,
    date: '1 month ago',
    centre: 'Sanjaynagar Centre',
    text: 'Booked the Chirayu PRIME Full Body Check for my parents. 71 parameters for ₹796 is unmatched value in Bangalore. Clean laboratory and polite staff.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Basava Panegova',
    rating: 5,
    date: '3 weeks ago',
    centre: 'Peenya Centre',
    text: 'Timely blood collection service at home. Reports delivered without delay with digital QR verification. Highly reliable service.',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Nikhil Gowda',
    rating: 5,
    date: '2 months ago',
    centre: 'Jaraganahalli Centre',
    text: 'Experienced sample collection phlebotomists. Careful patient handling and clean disposable vacuum tubes used. Highly recommended!',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Sunita Sharma',
    rating: 5,
    date: '1 week ago',
    centre: 'Banashankari Centre',
    text: 'Extremely impressed with the home sample collection service. Phlebotomist was very hygienic and wore full protective gear. Got accurate NABL test results in just 5 hours on WhatsApp!',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Anand Kumar',
    rating: 5,
    date: '3 days ago',
    centre: 'Subramanyapura Hub',
    text: 'Best health checkup package prices in Bangalore! Full body MASTER package covered Vitamin D, B12, and HbA1c for a fraction of what hospital chains charge.',
    verified: true
  },
  {
    id: 'rev-7',
    author: 'Kavitha R.',
    rating: 5,
    date: '4 days ago',
    centre: 'Sanjaynagar Hub',
    text: 'Super efficient service. The phlebotomist arrived right on time at 7:15 AM. Sterile single-use Vacutainer tubes were opened in front of us. Highly professional team!',
    verified: true
  },
  {
    id: 'rev-8',
    author: 'Dr. Ramesh Prasad',
    rating: 5,
    date: '1 month ago',
    centre: 'Peenya Hub',
    text: 'As a consulting doctor, I regularly recommend BJSL to my patients. Their NABL reference lab quality and automated analyzer reports are consistently accurate and trustworthy.',
    verified: true
  },
  {
    id: 'rev-9',
    author: 'Venkatesh Rao',
    rating: 5,
    date: '5 days ago',
    centre: 'KR Market Hub',
    text: 'Same day reports directly on WhatsApp! Very polite customer support and transparent pricing without any hidden doorstep fees.',
    verified: true
  },
  {
    id: 'rev-10',
    author: 'Deepa Hegde',
    rating: 5,
    date: '2 weeks ago',
    centre: 'Kengeri Satellite Town',
    text: 'Chirayu Senior Citizen package for my mother was super comprehensive (108 tests). Doctor was very satisfied with the report details.',
    verified: true
  }
];

export const FAQS = [
  {
    question: 'How does Bharath Jan Sewa Labs provide tests at 50–70% lower prices?',
    answer: 'BJSL operates on a lean, high-volume centralized laboratory model. By eliminating marketing overheads and passing operational scale directly to patients, we deliver high-grade diagnostic testing at transparent, affordable prices.'
  },
  {
    question: 'Where are blood samples processed and tested?',
    answer: 'Samples collected through BJSL collection centres and home visits across Bangalore are safely transported under temperature-controlled cold chains to associated, fully NABL-accredited reference laboratory facilities with automated robotics.'
  },
  {
    question: 'Is doorstep home sample collection really free?',
    answer: 'Yes! Home sample collection is completely FREE for test bookings of ₹499 or above across all covered Bangalore localities including Sanjaynagar, Peenya, Kengeri, Banashankari, Hebbal, and Subramanyapura.'
  },
  {
    question: 'How fast will I receive my test reports?',
    answer: 'Routine blood tests and health checkup packages are delivered on the SAME DAY within 4 to 8 hours of sample collection directly to your registered WhatsApp number, Email ID, and patient portal.'
  },
  {
    question: 'Do I need to fast before taking a health checkup?',
    answer: 'For Diabetic profiles (Fasting Blood Sugar, HbA1c) and Lipid Profiles, 10 to 12 hours of overnight fasting is mandatory (water is allowed). Routine CBC, Vitamin D, and Thyroid tests do not require fasting.'
  },
  {
    question: 'Are sample collection phlebotomists trained and safe?',
    answer: 'All BJSL phlebotomists are DMLT-certified medical professionals equipped with sterile single-use disposable vacuum tubes (Vacutainers), ice-pack cold-chain carrier boxes, and strict infection control protocols.'
  },
  {
    question: 'Which areas in Bangalore are covered for home collection?',
    answer: 'We provide free doorstep collection across Sanjaynagar, Peenya 2nd Stage, Kengeri BDA Town, Banashankari, Ittamadu, Jaraganahalli, Hebbal, RMV 2nd Stage, Malleshwaram, Rajajinagar, and surrounding PIN codes.'
  },
  {
    question: 'What payment options are available for test bookings?',
    answer: 'You can pay conveniently via UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking online, or Cash to the phlebotomist at the texport const BLOG_POSTS = [
  {
    id: 'hba1c-guide',
    slug: 'understanding-hba1c-blood-sugar-levels',
    title: 'Understanding Your HbA1c Results: What Do Your Blood Sugar Numbers Mean?',
    category: 'Diabetes & Sugar',
    author: 'Dr. Ananya Rao, MD (Pathology)',
    date: TODAY_FORMATTED,
    readTime: '5 min read',
    excerpt: 'Glycated Hemoglobin (HbA1c) measures your average blood sugar levels over 2-3 months. Learn what normal, prediabetic, and diabetic ranges mean for your long-term health.',
    content: `
      <div class="at-a-glance-box" style="background:#F8FAFC; padding:1.25rem; border-radius:14px; border:1px solid #E2E8F0; margin-bottom:1.5rem">
        <h4 style="margin-bottom:0.75rem; color:#0F172A; font-weight:800">📋 HbA1c Test At a Glance</h4>
        <table style="width:100%; border-collapse:collapse; font-size:0.9rem">
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Sample Required:</td><td>Whole Blood (EDTA)</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Fasting Needed:</td><td>No Fasting Required (Can be taken anytime)</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Report Turnaround:</td><td>Same Day (4 to 8 hours)</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Home Collection:</td><td>Available across Bengaluru</td></tr>
          <tr><td style="padding:4px 0; font-weight:700">Test Price:</td><td>₹349 (NABL Accredited Lab Processing)</td></tr>
        </table>
      </div>

      <h3>What Is an HbA1c Test?</h3>
      <p>Glycated hemoglobin (HbA1c) is a standardized blood test evaluating the percentage of hemoglobin proteins coated with sugar (glucose). Because red blood cells live for approximately 120 days, the HbA1c test reflects your average blood sugar control over the preceding 2 to 3 months.</p>
      
      <h3>Key HbA1c Reference Ranges:</h3>
      <ul>
        <li><strong>Normal (Non-Diabetic):</strong> Below 5.7%</li>
        <li><strong>Prediabetes Warning Zone:</strong> 5.7% to 6.4%</li>
        <li><strong>Diabetes Diagnostic Threshold:</strong> 6.5% or higher</li>
      </ul>

      <h3>Does an HbA1c Test Require Fasting?</h3>
      <p>No fasting is required. Food intake on the day of the test does not alter glycated hemoglobin levels, making it convenient to schedule at any time of day.</p>

      <h3>HbA1c vs Fasting Blood Sugar:</h3>
      <p>While Fasting Blood Sugar measures glucose at a single moment after an 8-hour fast, HbA1c provides a cumulative 90-day average. Physicians frequently order both tests together for comprehensive diabetes screening.</p>
    `,
    image: '🩸',
    relatedTests: ['hba1c-test', 'chirayu-prime']
  },
  {
    id: 'cbc-blood-test-guide',
    slug: 'cbc-blood-test-complete-guide',
    title: 'What Is a Complete Blood Count (CBC)? Uses, Preparation & Reading Your Results',
    category: 'Blood Tests',
    author: 'Dr. Rajesh Vardhan, Consultant Pathologist',
    date: TODAY_FORMATTED,
    readTime: '6 min read',
    excerpt: 'CBC is the most common blood test prescribed by doctors. Learn what Hemoglobin, WBC, Platelets, and RBC indices indicate about your health.',
    content: `
      <div class="at-a-glance-box" style="background:#F8FAFC; padding:1.25rem; border-radius:14px; border:1px solid #E2E8F0; margin-bottom:1.5rem">
        <h4 style="margin-bottom:0.75rem; color:#0F172A; font-weight:800">📋 CBC Blood Test At a Glance</h4>
        <table style="width:100%; border-collapse:collapse; font-size:0.9rem">
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Sample Required:</td><td>Blood (EDTA Vacuum Tube)</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Fasting Needed:</td><td>No Fasting Required</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Parameters Measured:</td><td>29 Cellular Parameters</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Report Turnaround:</td><td>Same Day (4-6 Hours)</td></tr>
          <tr><td style="padding:4px 0; font-weight:700">Test Price:</td><td>₹299</td></tr>
        </table>
      </div>

      <h3>What Does a CBC Test Measure?</h3>
      <p>A Complete Blood Count evaluates three main types of cells circulating in your bloodstream:</p>
      <ul>
        <li><strong>Red Blood Cells (RBC) & Hemoglobin:</strong> Carries oxygen from lungs to body tissues. Low levels indicate anemia.</li>
        <li><strong>White Blood Cells (WBC / TLC):</strong> Key component of immune defense. Elevated counts signal active bacterial or viral infection.</li>
        <li><strong>Platelets:</strong> Cell fragments responsible for blood clotting and wound healing.</li>
      </ul>

      <h3>Why Is a CBC Prescribed?</h3>
      <p>Physicians order CBC tests during routine health checkups, or when patients experience unexplained fatigue, fever, bruising, weakness, or inflammation.</p>
    `,
    image: '🔬',
    relatedTests: ['cbc-test', 'chirayu-prime']
  },
  {
    id: 'thyroid-profile-guide',
    slug: 'thyroid-profile-t3-t4-tsh-explained',
    title: 'Thyroid Profile Test (TSH, T3, T4): Symptoms, Preparation & Results Guide',
    category: 'Thyroid Care',
    author: 'Dr. Suresh Kumar, Senior Clinical Advisor',
    date: TODAY_FORMATTED,
    readTime: '5 min read',
    excerpt: 'Thyroid hormones control your metabolism, energy, and weight. Learn how TSH, T3, and T4 tests detect hypothyroidism and hyperthyroidism.',
    content: `
      <div class="at-a-glance-box" style="background:#F8FAFC; padding:1.25rem; border-radius:14px; border:1px solid #E2E8F0; margin-bottom:1.5rem">
        <h4 style="margin-bottom:0.75rem; color:#0F172A; font-weight:800">📋 Thyroid Profile At a Glance</h4>
        <table style="width:100%; border-collapse:collapse; font-size:0.9rem">
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Sample Required:</td><td>Blood Serum</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Fasting Needed:</td><td>8-10 Hours Morning Fasting Preferred</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Parameters:</td><td>Total T3, Total T4, TSH Ultrasensitive</td></tr>
          <tr><td style="padding:4px 0; font-weight:700">Test Price:</td><td>₹399</td></tr>
        </table>
      </div>

      <h3>Understanding Thyroid Hormones:</h3>
      <p>The thyroid gland situated in your neck produces T3 (Triiodothyronine) and T4 (Thyroxine) hormones regulated by TSH (Thyroid Stimulating Hormone) from the pituitary gland.</p>
      <ul>
        <li><strong>Hypothyroidism (Underactive):</strong> High TSH with low T3/T4 levels, causing weight gain, lethargy, cold intolerance, and dry skin.</li>
        <li><strong>Hyperthyroidism (Overactive):</strong> Low TSH with high T3/T4 levels, causing rapid heartbeat, anxiety, and weight loss.</li>
      </ul>
    `,
    image: '🫁',
    relatedTests: ['thyroid-profile', 'chirayu-master']
  },
  {
    id: 'lipid-profile-heart-guide',
    slug: 'lipid-profile-cholesterol-test-guide',
    title: 'Lipid Profile & Heart Health: Understanding Good vs Bad Cholesterol',
    category: 'Heart & Lipids',
    author: 'Dr. Ananya Rao, MD (Pathology)',
    date: TODAY_FORMATTED,
    readTime: '6 min read',
    excerpt: 'Comprehensive cholesterol screening evaluates your cardiac risk. Learn how HDL, LDL, VLDL, and Triglycerides impact heart health.',
    content: `
      <div class="at-a-glance-box" style="background:#F8FAFC; padding:1.25rem; border-radius:14px; border:1px solid #E2E8F0; margin-bottom:1.5rem">
        <h4 style="margin-bottom:0.75rem; color:#0F172A; font-weight:800">📋 Lipid Profile At a Glance</h4>
        <table style="width:100%; border-collapse:collapse; font-size:0.9rem">
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Fasting Needed:</td><td>10-12 Hours Overnight Fasting Mandatory</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:4px 0; font-weight:700">Parameters:</td><td>14 Parameters (HDL, LDL, Triglycerides, Ratios)</td></tr>
          <tr><td style="padding:4px 0; font-weight:700">Test Price:</td><td>₹450</td></tr>
        </table>
      </div>

      <h3>Why Fasting Is Mandatory for Lipid Profiles:</h3>
      <p>Consuming meals right before a lipid test dramatically spikes serum triglyceride levels. 10 to 12 hours of overnight fasting ensures precise baseline measurement of arterial plaque risk factors.</p>
    `,
    image: '🫀',
    relatedTests: ['lipid-profile', 'chirayu-prime']
  },
  {
    id: 'vitamin-d-b12-deficiency',
    slug: 'vitamin-d-b12-deficiency-urban-lifestyle',
    title: 'Vitamin D & B12 Deficiency: Symptoms, Testing & Prevention in Adults',
    category: 'Vitamins & Minerals',
    author: 'Dr. Rajesh Vardhan, Consultant Pathologist',
    date: TODAY_FORMATTED,
    readTime: '6 min read',
    excerpt: 'Over 70% of urban Indians suffer from hidden Vitamin D and B12 deficiencies due to indoor desk jobs and dietary gaps.',
    content: `
      <p>Vitamin D and B12 are critical micronutrients controlling bone mineralization, nerve signal transmission, and red blood cell formation. Blood testing quantifies exact serum levels to guide targeted physician supplementation.</p>
    `,
    image: '☀️',
    relatedTests: ['vitamin-d-test', 'chirayu-master']
  },
  {
    id: 'home-sample-collection-guide',
    slug: 'how-home-sample-collection-works',
    title: 'How Home Sample Collection Works: Sterile Vacutainer Procedures & Cold-Chain Transport',
    category: 'Home Collection',
    author: 'BJSL Quality Assurance Team',
    date: TODAY_FORMATTED,
    readTime: '4 min read',
    excerpt: 'Step-by-step guide to booking certified phlebotomists for free doorstep blood collection across Bangalore.',
    content: `
      <h3>Safe, Hygienic Doorstep Phlebotomy:</h3>
      <p>All BJSL home collection visits utilize sterile, single-use disposable Vacutainer needle systems opened right in front of the patient. Samples are immediately sealed in temperature-controlled cold-chain carrier boxes to maintain specimen integrity en route to NABL-accredited processing labs.</p>
    `,
    image: '🛵',
    relatedTests: ['chirayu-prime', 'cbc-test']
  }
];
e', 'chirayu-master', 'chirayu-advanced']
  },
  {
    id: 'cbc-report-guide',
    slug: 'how-to-read-complete-blood-count-cbc-report',
    title: 'Deciphering Your Complete Blood Count (CBC) Report: What Each Parameter Tells You',
    category: 'Lab Diagnostics',
    author: 'Dr. Ananya Rao, MD (Pathology)',
    date: TODAY_FORMATTED,
    readTime: '7 min read',
    excerpt: 'Your CBC report measures Hemoglobin, WBCs, Platelets, and RBC indices. Learn how pathologists analyze these parameters to detect infections and blood health.',
    content: `
      <p>The Complete Blood Count (CBC) is the most frequently requested diagnostic blood panel. It examines three major blood cell components produced in bone marrow: Red Blood Cells (RBCs), White Blood Cells (WBCs), and Platelets.</p>

      <h3>Understanding Key CBC Markers:</h3>
      <ul>
        <li><strong>Hemoglobin (Hb):</strong> Oxygen-carrying protein in red blood cells. Low levels indicate anemia.</li>
        <li><strong>Total & Differential WBC (TLC/DLC):</strong> Immune defense cells. Elevated counts signal active viral/bacterial infection or systemic inflammation.</li>
        <li><strong>Platelets:</strong> Cell fragments essential for blood clotting and wound healing.</li>
      </ul>
    `,
    image: '🔬',
    relatedTests: ['cbc-test', 'chirayu-prime']
  }
];

export const SEO_METADATA = {
  title: 'Bharath Jan Sewa Labs (BJSL) | Diagnostics with Dignity, For Every Indian',
  description: 'Book blood tests, full body health checkups & diagnostic packages with NABL-accredited processing, transparent pricing 50-70% lower than market rates, and free home sample collection across Bangalore.',
  keywords: 'Bharath Jan Sewa Labs, BJSL, blood test Bangalore, full body checkup Bangalore, home sample collection, Chirayu checkup, NABL accredited lab, HbA1c test, CBC test price, diagnostic centre Sanjaynagar, Peenya, Kengeri, Banashankari',
  siteUrl: 'https://bharathjansewalabs.com',
  author: 'Bharath Jan Sewa Labs Pvt. Ltd.',
  lastModified: TODAY_FORMATTED
};

export const FRANCHISE_INFO = {
  heroTitle: 'Own a Bharath Jan Sewa Labs Diagnostic Collection Centre',
  heroSubtitle: 'Join India’s fastest-growing affordable diagnostic network. High margin business model with complete laboratory operational support, logistics, and NABL processing.',
  investmentRange: '₹5 Lakhs – ₹12 Lakhs',
  spaceRequired: '250 – 500 Sq. Ft.',
  paybackPeriod: '10 – 14 Months',
  benefits: [
    'No expensive heavy laboratory equipment capital expenditure — samples dispatched to central NABL reference lab',
    'Exclusive territorial rights for your designated PIN code / locality',
    'Full Laboratory Information System (LIS) cloud software & barcode scanner setup',
    'Marketing, digital branding, local doctor engagement support',
    'Certified phlebotomy training & cold-chain specimen handling certification'
  ],
  steps: [
    { step: '01', title: 'Submit Enquiry', desc: 'Fill out the franchise inquiry form with preferred locality and contact details.' },
    { step: '02', title: 'Site Inspection', desc: 'Our expansion team verifies your proposed 250-500 sq ft ground floor commercial space.' },
    { step: '03', title: 'MOU & LIS Setup', desc: 'Sign agreement, receive branding guidelines, and setup cloud LIS booking terminal.' },
    { step: '04', title: 'Grand Launch', desc: 'Staff training, phlebotomist onboarding, and official launch with local doctor outreach.' }
  ]
};

export const MOCK_USER_REPORTS = [
  {
    id: 'BJSL-REP-88210',
    date: '24 Sep 2026',
    testName: 'Chirayu Full Body Check MASTER (109 Parameters)',
    patientName: 'Afi Kumar',
    age: 34,
    gender: 'Male',
    status: 'Report Ready (NABL Verified)',
    pathologist: 'Dr. Ananya Rao, MD (Pathology)',
    labLocation: 'BJSL NABL Central Lab, Sanjaynagar',
    summary: 'Normal Thyroid (TSH 2.1 mIU/L), HbA1c 5.4% (Normal), Borderline Vitamin D (22 ng/mL).',
    parameters: [
      { name: 'Hemoglobin (Hb)', result: '14.8 g/dL', reference: '13.0 - 17.0 g/dL', status: 'Normal' },
      { name: 'Total Leucocyte Count (TLC)', result: '6,800 /uL', reference: '4,000 - 10,000 /uL', status: 'Normal' },
      { name: 'Fast Blood Sugar (FBS)', result: '92 mg/dL', reference: '70 - 99 mg/dL', status: 'Normal' },
      { name: 'HbA1c', result: '5.4 %', reference: 'Below 5.7 %', status: 'Normal' },
      { name: 'TSH Ultrasensitive', result: '2.14 mIU/L', reference: '0.45 - 4.50 mIU/L', status: 'Normal' },
      { name: 'Vitamin D 25-OH Total', result: '22.4 ng/mL', reference: '30.0 - 100.0 ng/mL', status: 'Slightly Low' }
    ]
  },
  {
    id: 'BJSL-REP-77492',
    date: '12 Aug 2026',
    testName: 'Complete Blood Count (CBC) + Vitamin D Panel',
    patientName: 'Afi Kumar',
    age: 34,
    gender: 'Male',
    status: 'Report Ready (NABL Verified)',
    pathologist: 'Dr. Rajesh Vardhan, Consultant Pathologist',
    labLocation: 'BJSL NABL Central Lab, Sanjaynagar',
    summary: 'All CBC blood cell counts within healthy reference intervals.',
    parameters: [
      { name: 'Hemoglobin (Hb)', result: '15.1 g/dL', reference: '13.0 - 17.0 g/dL', status: 'Normal' },
      { name: 'Platelet Count', result: '2.45 Lakhs/uL', reference: '1.5 - 4.5 Lakhs/uL', status: 'Normal' },
      { name: 'WBC Count', result: '7,200 /uL', reference: '4,000 - 10,000 /uL', status: 'Normal' }
    ]
  }
];



