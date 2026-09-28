// Smoke check for D-001: the engine source is importable from an Edge Function.
// Returns the ENGINE_VERSION this function was deployed with.
import { ENGINE_VERSION } from '@yingo/engine';

Deno.serve((request) => {
  if (request.method !== 'GET') {
    return new Response(null, { status: 405, headers: { Allow: 'GET' } });
  }
  return Response.json({ engineVersion: ENGINE_VERSION });
});
