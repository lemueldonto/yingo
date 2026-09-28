// Shared packages (engine, i18n) must stay dependency-free so they run in Deno as-is.
import { readFileSync } from 'node:fs';

const packages = ['packages/engine', 'packages/i18n'];
let failed = false;

for (const dir of packages) {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(`${dir}/package.json`, 'utf8'));
  } catch {
    continue;
  }
  const deps = Object.keys(manifest.dependencies ?? {});
  if (deps.length > 0) {
    console.error(`${dir}: runtime dependencies are not allowed (${deps.join(', ')})`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
