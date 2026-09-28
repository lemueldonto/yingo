import { toDataError } from './errors';
import { toProfile, type Profile } from './mappers';
import { supabase } from './supabase';

/**
 * Creates the user's profile if it does not exist yet. Safe to call repeatedly,
 * including after an interrupted first launch.
 */
export async function ensureProfile(userId: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .upsert({ user_id: userId }, { onConflict: 'user_id', ignoreDuplicates: true });
  if (error) throw toDataError(error);
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, created_at, updated_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw toDataError(error);
  return data ? toProfile(data) : null;
}
