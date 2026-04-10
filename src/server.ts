import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

import { watch } from 'node:fs';
import { join } from 'node:path';

const angularApp = new AngularAppEngine();
const reqHandler = createRequestHandler((req) => angularApp.handle(req));

if (typeof Bun !== 'undefined') {
  const browserDistFolder = join(import.meta.dir, '../browser');

  const server = Bun.serve({
    port: process.env['PORT'] ?? 4000,
    async fetch(req: Request) {
      const url = new URL(req.url);

      const file = Bun.file(join(browserDistFolder, url.pathname));
      if (await file.exists()) {
        return new Response(file, {
          headers: { 'Cache-Control': 'no-cache' },
        });
      }

      return (await angularApp.handle(req)) ?? new Response('Not found', { status: 404 });
    },
  });

  console.log(`Bun server listening on http://local.eudoo.com.co:${server.port}`);

  if (process.env['NODE_ENV'] !== 'production') {
    const watcher = watch(browserDistFolder, { recursive: true }, (event, filename) => {
      console.log(`[HMR] File changed: ${filename} — reloading...`);
      server.reload({ fetch: server.fetch });
    });

    process.on('exit', () => watcher.close());
  }
}

export { reqHandler };
