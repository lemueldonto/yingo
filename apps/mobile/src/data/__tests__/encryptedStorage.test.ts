import { describe, expect, it } from 'vitest';

import {
  createEncryptedStorage,
  ENCRYPTION_KEY_NAME,
  type Cipher,
  type KeyValueStore,
} from '../encryptedStorage';

function memoryStore(): KeyValueStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: async (key) => data.get(key) ?? null,
    setItem: async (key, value) => {
      data.set(key, value);
    },
    removeItem: async (key) => {
      data.delete(key);
    },
  };
}

// Reversible stand-in for AES: tags the payload with the key so a wrong key fails.
const fakeCipher: Cipher = {
  generateKey: async () => 'key-1',
  encrypt: async (plaintext, key) => btoa(`${key}:${plaintext}`),
  decrypt: async (ciphertext, key) => {
    const decoded = atob(ciphertext);
    if (!decoded.startsWith(`${key}:`)) throw new Error('bad key');
    return decoded.slice(key.length + 1);
  },
};

const session = JSON.stringify({ access_token: 'secret-token', user: { id: 'u1' } });

describe('createEncryptedStorage', () => {
  it('round-trips a value', async () => {
    const storage = createEncryptedStorage({
      secureStore: memoryStore(),
      storage: memoryStore(),
      cipher: fakeCipher,
    });
    await storage.setItem('session', session);
    expect(await storage.getItem('session')).toBe(session);
  });

  it('never writes the plain value to regular storage', async () => {
    const regular = memoryStore();
    const storage = createEncryptedStorage({
      secureStore: memoryStore(),
      storage: regular,
      cipher: fakeCipher,
    });
    await storage.setItem('session', session);
    const stored = regular.data.get('session') ?? '';
    expect(stored).not.toContain('secret-token');
    expect(stored).not.toBe(session);
  });

  it('keeps the key in the secure store and reuses it', async () => {
    const secure = memoryStore();
    let generated = 0;
    const storage = createEncryptedStorage({
      secureStore: secure,
      storage: memoryStore(),
      cipher: { ...fakeCipher, generateKey: async () => `key-${++generated}` },
    });
    await storage.setItem('a', '1');
    await storage.setItem('b', '2');
    expect(generated).toBe(1);
    expect(secure.data.get(ENCRYPTION_KEY_NAME)).toBe('key-1');
  });

  it('reads values written before a restart', async () => {
    const secure = memoryStore();
    const regular = memoryStore();
    await createEncryptedStorage({
      secureStore: secure,
      storage: regular,
      cipher: fakeCipher,
    }).setItem('session', session);
    const afterRestart = createEncryptedStorage({
      secureStore: secure,
      storage: regular,
      cipher: fakeCipher,
    });
    expect(await afterRestart.getItem('session')).toBe(session);
  });

  it('drops unreadable data instead of failing', async () => {
    const regular = memoryStore();
    regular.data.set('session', btoa('other-key:whatever'));
    const storage = createEncryptedStorage({
      secureStore: memoryStore(),
      storage: regular,
      cipher: fakeCipher,
    });
    expect(await storage.getItem('session')).toBeNull();
    expect(regular.data.has('session')).toBe(false);
  });

  it('returns null for a missing value', async () => {
    const storage = createEncryptedStorage({
      secureStore: memoryStore(),
      storage: memoryStore(),
      cipher: fakeCipher,
    });
    expect(await storage.getItem('nothing')).toBeNull();
  });
});
