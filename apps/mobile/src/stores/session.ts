import NetInfo from '@react-native-community/netinfo';
import { create } from 'zustand';

import { ensureProfile, getStoredSession, OfflineError, signInAnonymously } from '../data';

type SessionStatus = 'starting' | 'offline' | 'ready' | 'error';

interface SessionState {
  status: SessionStatus;
  userId: string | null;
  isAnonymous: boolean;
  profileEnsured: boolean;
  /** Restores or creates the anonymous session, then ensures the profile. */
  start: () => Promise<void>;
}

export const useSession = create<SessionState>((set, get) => ({
  status: 'starting',
  userId: null,
  isAnonymous: false,
  profileEnsured: false,

  start: async () => {
    try {
      let session = await getStoredSession();
      if (!session) {
        const network = await NetInfo.fetch();
        if (network.isConnected === false) {
          set({ status: 'offline' });
          return;
        }
        session = await signInAnonymously();
      }
      set({ status: 'ready', userId: session.userId, isAnonymous: session.isAnonymous });

      if (!get().profileEnsured) {
        await ensureProfile(session.userId);
        set({ profileEnsured: true });
      }
    } catch (error) {
      if (error instanceof OfflineError) {
        // No session yet: wait for the network. With a session: the profile is retried later.
        if (get().userId === null) set({ status: 'offline' });
        return;
      }
      set({ status: 'error' });
      throw error;
    }
  },
}));

/** Retries the startup sequence when the network comes back. Returns the unsubscribe. */
export function retryWhenOnline(): () => void {
  return NetInfo.addEventListener((network) => {
    const { status, profileEnsured, start } = useSession.getState();
    const pending = status === 'offline' || (status === 'ready' && !profileEnsured);
    if (network.isConnected && pending) void start();
  });
}
