import fs from 'fs';

const html = fs.readFileSync('public/index.html', 'utf8');
const scriptMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (scriptMatch) {
  const code = scriptMatch[1];
  const lines = code.split('\n');

  lines.forEach((line, index) => {
    // Check for inline style syntax errors in JSX
    // e.g. invalid style properties, unescaped characters, missing commas, invalid style object syntax
    if (line.includes('style={{') && !line.includes('}}')) {
      // style line spanning or single line
    }

    // Check for potential invalid properties in style objects
    const styleMatches = line.match(/style=\{\{([^}]+)\}\}/g);
    if (styleMatches) {
      styleMatches.forEach(sm => {
        const props = sm.replace('style={{', '').replace('}}', '').split(',');
        props.forEach(p => {
          const parts = p.split(':');
          if (parts.length === 2) {
            const key = parts[0].trim();
            if (key && !/^[a-zA-Z0-9_$]+$/.test(key) && !key.startsWith("'") && !key.startsWith('"')) {
              console.log(`Potential invalid style key at line ${index + 1}: "${key}" in line: ${line.trim()}`);
            }
          }
        });
      });
    }
  });
}
