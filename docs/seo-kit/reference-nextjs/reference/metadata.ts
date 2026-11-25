/** Put into the corresponding EXISTING pages; fix home-canonical bugs without changing routes. */
import type { Metadata } from 'next';
export const qualityMetadata: Metadata = {
  title: 'Laboratory Testing Quality, Accreditation Evidence & Sample Handling | BJSL',
  description: 'Review how Bharath Jan Sewa Labs verifies performing laboratories, specimens and testing quality for Bengaluru diagnostic services.',
  alternates: { canonical: 'https://bharathjansewalabs.com/quality/' }
};
export const assistanceMetadata: Metadata = {
  title: 'Affordable Diagnostic Testing Assistance in Bengaluru | BJSL',
  description: 'Enquire about approved low-cost blood tests and any available diagnostic assistance for medically recommended investigations in Bengaluru.',
  alternates: { canonical: 'https://bharathjansewalabs.com/affordable-testing-assistance/' }
};
