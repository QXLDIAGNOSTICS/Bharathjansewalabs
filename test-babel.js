import fs from 'fs';

const html = fs.readFileSync('public/index.html', 'utf8');
const scriptMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (!scriptMatch) {
  console.log('No babel script found in public/index.html');
} else {
  const code = scriptMatch[1];
  console.log('Found script code, length:', code.length);
  
  // Test basic ES6 evaluation / Function syntax check
  try {
    // Check for JSX or syntax anomalies
    const lines = code.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('justifyCenter')) {
        console.log(`Found justifyCenter at line ${idx + 1}: ${line}`);
      }
    });
    console.log('Line count:', lines.length);
  } catch (e) {
    console.error('Syntax error:', e);
  }
}
