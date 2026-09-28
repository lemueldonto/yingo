import { AESEncryptionKey, AESSealedData, aesDecryptAsync, aesEncryptAsync } from 'expo-crypto';

import type { Cipher } from './encryptedStorage';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function importKey(keyHex: string): Promise<AESEncryptionKey> {
  return (await AESEncryptionKey.import(keyHex, 'hex')) as AESEncryptionKey;
}

/** AES-256-GCM from expo-crypto; ciphertext stored as base64 (IV + data + tag). */
export const expoCipher: Cipher = {
  async generateKey() {
    const key = await AESEncryptionKey.generate();
    return key.encoded('hex');
  },
  async encrypt(plaintext, keyHex) {
    const sealed = await aesEncryptAsync(encoder.encode(plaintext), await importKey(keyHex));
    return sealed.combined('base64');
  },
  async decrypt(ciphertext, keyHex) {
    const bytes = await aesDecryptAsync(
      AESSealedData.fromCombined(ciphertext),
      await importKey(keyHex),
    );
    return decoder.decode(bytes);
  },
};
