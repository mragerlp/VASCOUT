import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const repository = fileURLToPath(new URL('../../', import.meta.url));
const output = join(repository, 'web/.cloudflare/output/v0/workers/default/assets');

function checkCopy(source, destination) {
  assert.deepEqual(readFileSync(join(output, destination)),
    readFileSync(join(repository, source)), destination);
}

checkCopy('src/charming/ui.js', 'ui.js');
checkCopy('src/charming/styles.css', 'styles.css');
checkCopy('web/public/local-bridge.js', 'local-bridge.js');
checkCopy('assets/asset-manifest.json', 'assets/asset-manifest.json');

const tables = readdirSync(join(repository, 'data/normalized')).sort();
assert.equal(tables.length, 14);
assert.deepEqual(readdirSync(join(output, 'data')).sort(), tables);
for (const name of tables) {
  checkCopy(`data/normalized/${name}`, `data/${name}`);
}

const manifest = JSON.parse(readFileSync(join(output, 'assets/asset-manifest.json'), 'utf8'));
const decks = manifest.assets.filter(asset => asset.local_path);
assert.equal(decks.length, 9);
assert.deepEqual(readdirSync(join(output, 'assets/decks')).sort(),
  decks.map(asset => asset.key).sort());
for (const asset of decks) {
  const bytes = readFileSync(join(output, asset.local_path));
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
  assert.equal(bytes.length, asset.size_bytes, asset.key);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.key);
}

const html = readFileSync(join(output, 'index.html'), 'utf8');
assert.ok(html.includes('id="app"'), 'Missing application mount');
assert.ok(html.includes('https://github.com/mragerlp/VASCOUT#readme'), 'Missing documentation link');
for (const [, assetPath] of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
  readFileSync(join(output, assetPath.slice(1)));
}
console.log('PASS: built UI, stylesheet, adapter, 14 data files and nine manifest-hashed PDFs.');
