/**
 * Session storage for the Supabase client: values are encrypted with AES-GCM; the key
 * lives in the platform secure store (Keychain / Keystore), the ciphertext in regular
 * app storage (the secure store alone caps values at about 2 KB).
 *
 * Dependencies are injected so the logic is testable without native modules.
 */

export interface KeyValueStore {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export interface Cipher {
  /** Returns a new key, encoded as a string safe for the secure store. */
  generateKey(): Promise<string>;
  encrypt(plaintext: string, key: string): Promise<string>;
  decrypt(ciphertext: string, key: string): Promise<string>;
}

export const ENCRYPTION_KEY_NAME = 'yingo.storage-key';

export function createEncryptedStorage(deps: {
  secureStore: KeyValueStore;
  storage: KeyValueStore;
  cipher: Cipher;
}): KeyValueStore {
  const { secureStore, storage, cipher } = deps;
  let keyPromise: Promise<string> | null = null;

  function getKey(): Promise<string> {
    keyPromise ??= (async () => {
      const existing = await secureStore.getItem(ENCRYPTION_KEY_NAME);
      if (existing) return existing;
      const created = await cipher.generateKey();
      await secureStore.setItem(ENCRYPTION_KEY_NAME, created);
      return created;
    })();
    return keyPromise;
  }

  return {
    async getItem(name) {
      const ciphertext = await storage.getItem(name);
      if (ciphertext === null) return null;
      try {
        return await cipher.decrypt(ciphertext, await getKey());
      } catch {
        // Unreadable (key lost or data corrupted): drop it rather than crash.
        await storage.removeItem(name);
        return null;
      }
    },
    async setItem(name, value) {
      await storage.setItem(name, await cipher.encrypt(value, await getKey()));
    },
    async removeItem(name) {
      await storage.removeItem(name);
    },
  };
}
