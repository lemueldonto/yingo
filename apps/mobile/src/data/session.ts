import { toDataError } from './errors';
import { supabase } from './supabase';

export interface SessionInfo {
  userId: string;
  isAnonymous: boolean;
}

/** The session stored on the device, if any. Works offline. */
export async function getStoredSession(): Promise<SessionInfo | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw toDataError(error);
  const user = data.session?.user;
  return user ? { userId: user.id, isAnonymous: user.is_anonymous ?? false } : null;
}

/** Creates an anonymous session (ONB-01). Needs the network. */
export async function signInAnonymously(): Promise<SessionInfo> {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) throw toDataError(error);
  return { userId: data.user.id, isAnonymous: true };
}
