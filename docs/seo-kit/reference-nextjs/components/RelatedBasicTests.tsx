/** Existing BJSL slugs verified against public test sitemap. Place below the medical explanation. */
const basic = [
  ['Blood Sugar', '/tests/blood-sugar-test/'],
  ['CBC with ESR', '/tests/cbc-esr-test/'],
  ['HbA1c', '/tests/hba1c-test/'],
  ['TSH', '/tests/tsh-test/'],
  ['Serum Creatinine', '/tests/serum-creatinine-test/'],
  ['Urine Routine', '/tests/urine-routine-microscopy-test/'],
  ['Lipid Profile', '/tests/lipid-profile-test/'],
  ['Liver Function', '/tests/liver-function-test/'],
] as const;
export function RelatedBasicTests({ currentPath }: { currentPath: string }) {
  const items = basic.filter(([, href]) => href !== currentPath);
  return <nav aria-label="Other essential diagnostic tests" className="my-8">
    <h2 className="text-xl font-semibold">Other essential blood and urine tests in Bengaluru</h2>
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {items.map(([name, href]) => <li key={href}>
        <a className="block rounded border p-3 hover:underline" href={href}>{name} — price and preparation</a>
      </li>)}
    </ul>
  </nav>;
}
