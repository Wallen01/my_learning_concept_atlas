#!/usr/bin/env node
// Read-only preflight. Semantic note creation is intentionally performed by AI under AGENTS.md.
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const raw = path.join(root, 'raw');
const registry = JSON.parse(await readFile(path.join(root, 'vault/_system/source-registry.json'), 'utf8'));
const known = new Set(registry.sources.map((item) => item.content_hash));
const files = (await readdir(raw, { withFileTypes: true })).filter((entry) => entry.isFile());
for (const file of files) {
  const bytes = await readFile(path.join(raw, file.name));
  const hash = `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
  console.log(`${known.has(hash) ? 'DUPLICATE' : 'NEW'}\t${file.name}\t${hash}`);
}

