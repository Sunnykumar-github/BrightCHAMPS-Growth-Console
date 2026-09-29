const fs = require('fs');
const path = require('path');

// Read DOCX (which is a ZIP file)
const buf = fs.readFileSync('public/BrightChamps_USA_Math_Growth_Plan.docx');

// Find word/document.xml inside the ZIP
// Simple approach: find all XML text w:t tags
const str = buf.toString('binary');

// Extract text between <w:t> tags
const matches = [];
const re = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
let m;
while ((m = re.exec(str)) !== null) {
    const text = m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    if (text.trim()) matches.push(text);
}

const fullText = matches.join(' ');
fs.writeFileSync('plan_text.txt', fullText, 'utf8');
console.log('Extracted', matches.length, 'text segments');
console.log('Total chars:', fullText.length);
console.log('--- PREVIEW (first 5000 chars) ---');
console.log(fullText.substring(0, 5000));
