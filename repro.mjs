import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
console.log('typescript', require('typescript/package.json').version);

await import('@stencil/unplugin');
console.log('loaded @stencil/unplugin');
