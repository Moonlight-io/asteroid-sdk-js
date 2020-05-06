/// <reference types="node" />
import { EncryptedPayload } from '../interfaces';
export declare class Encryption {
    static aes256CbcEncrypt(iv: Buffer, key: Buffer, plaintext: Buffer): Buffer;
    static aes256CbcDecrypt(iv: Buffer, key: Buffer, ciphertext: Buffer): Buffer;
    /**
     * decrypts an ECIES encryption payload
     * @param privateKey - the private key of the recipient
     * @param payload - the ECIES payload
     */
    static p256ECIESDecrypt(privateKey: string, payload: any): Buffer;
    /**
     * encrypts a buffer using ECIES and returns a payload containing the message and signature.
     * @param publicKey - the public key of the recipient
     * @param payload - the payload buffer to encrypt
     * @param opts - optional parameters which will default if not configured
     */
    static p256ECIESEncrypt(publicKey: string, payload: Buffer, opts?: any): object;
    /**
     * formats an aes256 encrypted attestation
     * @param payload
     */
    static encryptionSymAES256(payload: string): EncryptedPayload;
    static encryptionp256ECIES(payload: string, publicKey: string): EncryptedPayload;
    static encryptPayload(method: string, payload: string, publicKey?: string): EncryptedPayload;
    static decryptPayload(method: string, payload: string, key?: string): string;
}
