const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/manifest.json'), 'utf-8'));
const byTag = {};

for (const entry of manifest) {
  const allTags = [
    ...(entry.tags?.concept ?? []),
    ...(entry.tags?.domain ?? []),
    ...(entry.tags?.mood ?? []),
    ...(entry.mortgage_roles ?? []),
  ];
  for (const tag of allTags) {
    const key = tag.toLowerCase();
    if (!byTag[key]) byTag[key] = [];
    byTag[key].push(entry.id);
  }
}

fs.writeFileSync(
  path.join(process.cwd(), 'content/by-tag.json'),
  JSON.stringify(byTag, null, 2)
);
console.log('by-tag.json written with', Object.keys(byTag).length, 'tags');
