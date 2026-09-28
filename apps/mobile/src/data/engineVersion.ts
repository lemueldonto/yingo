import { toDataError } from './errors';
import { supabase } from './supabase';

/** ENGINE_VERSION as seen by the Edge Functions (D-001 smoke check). */
export async function getServerEngineVersion(): Promise<string> {
  const { data, error } = await supabase.functions.invoke<{ engineVersion: string }>(
    'engine-version',
    { method: 'GET' },
  );
  if (error || !data) throw toDataError(error);
  return data.engineVersion;
}
