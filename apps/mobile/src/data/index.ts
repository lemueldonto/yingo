// Single data-access layer: features and stores import from here, never from Supabase.
export { getServerEngineVersion } from './engineVersion';
export { DataError, OfflineError } from './errors';
export type { Profile } from './mappers';
export { ensureProfile, getProfile } from './profile';
export { getStoredSession, signInAnonymously, type SessionInfo } from './session';
