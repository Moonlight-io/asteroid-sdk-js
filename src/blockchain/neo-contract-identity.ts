import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper, Encryption } from '../helpers'
import { NetworkItem } from '../interfaces'

export class NeoContractIdentity {
  // #region RootKey

  /**
   * creates a new root key for the user.  This can be used to issue group and delegated access rights without giving away
   * identity ownership.
   * @param network - the network
   * @param contractHash - the contract hash to invoke
   * @param wif - the wif of the user
   */
  static async createRootKey(network: NetworkItem, contractHash: string, wif: string): Promise<any> {
    const operation = 'createRootKey'
    const account = new wallet.Account(wif)
    const rootKey = new wallet.Account()

    const payload = await Encryption.p256ECIESEncrypt(account.publicKey, Buffer.from(rootKey.privateKey))
    const encryptedPayload = JSON.stringify(payload)

    const args = [account.publicKey, rootKey.publicKey, u.str2hexstring(encryptedPayload)]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * attempts to get the root key pair for an identity
   * @param network
   * @param contractHash
   * @param sub
   */
  static async getRootKeyByIdentity(network: NetworkItem, contractHash: string, sub: string): Promise<any> {
    const operation = 'getRootKeyByIdentity'
    const args = [sub]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      return {
        sub: response.result.stack[0].value[0].value,
        rootPublicKey: response.result.stack[0].value[1].value,
        rootPrivateKey: u.hexstring2str(response.result.stack[0].value[2].value),
      }
    }
    return null
  }

  /**
   * attempts to get a root key pair using a pointer
   * @param network
   * @param contractHash
   * @param pointer
   */
  static async getRootKeyByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<any> {
    const operation = 'getRootKeyByPointer'
    const args = [pointer]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      return {
        sub: response.result.stack[0].value[0].value,
        rootPublicKey: response.result.stack[0].value[1].value,
        rootPrivateKey: u.hexstring2str(response.result.stack[0].value[2].value),
      }
    }
    return null
  }

  /**
   * gets the write head for root keys
   * @param network
   * @param contractHash
   */
  static async getRootKeyWritePointer(network: NetworkItem, contractHash: string): Promise<any> {
    const operation = 'getRootKeyWritePointer'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return null
  }

  /**
   * Test whether `sub` exists on-chain and has a root key
   */
  static async getIdentityExists(network: NetworkItem, contractHash: string, sub: string): Promise<boolean> {
    const operation = 'getIdentityExists'
    const args = [sub]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  // #endregion

  // #region Keychain

  /**
   * issues a new key to an identity's keychain
   * @param network
   * @param contractHash
   * @param holder
   * @param owner
   * @param sub
   * @param type
   * @param payload
   * @param encryption
   * @param wif
   */
  static async issueKey(network: NetworkItem, contractHash: string, holder: string, owner: string, sub: string, type: string, payload: Buffer, encryption: string, wif: string): Promise<any> {
    const operation = 'issueKey'
    const issuer = new wallet.Account(wif)

    // encrypt the payload using the requested method
    let identityPubKey
    let encryptedPayload
    if (encryption === 'holder_ecies') {
      identityPubKey = holder
    } else if (encryption === 'root_ecies') {
      const rootKeys = await NeoContractIdentity.getRootKeyByIdentity(network, contractHash, holder)
      if (rootKeys == null) {
        throw new Error('unable to determine root key: verify the holder has a registered root key')
      }
      identityPubKey = rootKeys.rootPublicKey
    } else {
      throw new Error('invalid encryption method')
    }
    encryptedPayload = Encryption.p256ECIESEncrypt(identityPubKey, payload)
    encryptedPayload = JSON.stringify(encryptedPayload)
    encryptedPayload = u.str2hexstring(encryptedPayload)

    const args = [holder, owner, issuer.publicKey, u.str2hexstring(sub), u.str2hexstring(type), encryptedPayload, wallet.sign(encryptedPayload, issuer.privateKey), u.str2hexstring(encryption)]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 2)
  }

  /**
   * attempts to remove a key from an identity's keychain
   * @param network
   * @param contractHash
   * @param pointer
   * @param wif
   */
  static async revokeKeyByPointer(network: NetworkItem, contractHash: string, pointer: number, wif: string): Promise<any> {
    const operation = 'revokeKeyByPointer'
    const requestor = new wallet.Account(wif)

    const args = [pointer, requestor.publicKey]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * gets the key at a specific write pointer
   * @param network
   * @param contractHash
   * @param pointer
   */
  static async getKeyByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<any> {
    const operation = 'getKeyByPointer'
    const args = [pointer]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoContractIdentity.parseKey(response)
  }

  /**
   * gets the write pointer for the keychain
   * @param network
   * @param contractHash
   */
  static async getKeychainWritePointer(network: NetworkItem, contractHash: string): Promise<number | null> {
    const operation = 'getKeychainWritePointer'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return null
  }

  /**
   * gets the key pointers for the holder
   * @param network
   * @param contractHash
   * @param holder
   */
  static async getKeyByHolder(network: NetworkItem, contractHash: string, holder: string, pointer: number): Promise<number[] | null> {
    const operation = 'getKeyByHolder'
    const args = [holder, pointer]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoContractIdentity.parseKey(response)
  }

  /**
   * gets the key pointers for the owner
   * @param network
   * @param contractHash
   * @param owner
   * @param pointer
   */
  /*
  static async getKeyByOwner(network: NetworkItem, contractHash: string, owner: string, pointer: number): Promise<number | null> {
    const operation = 'getKeyByOwner'
    const args = [owner, pointer]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoContractIdentity.parseKey(response)
  }
   */

  /**
   * gets the key pointers for the issuer
   * @param network
   * @param contractHash
   * @param issuer
   */
  static async getKeyByIssuer(network: NetworkItem, contractHash: string, issuer: string, pointer: number): Promise<number | null> {
    const operation = 'getKeyByIssuer'
    const args = [issuer, pointer]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoContractIdentity.parseKey(response)
  }

  /**
   * gets the key pointers for the holder with a specific subject
   * @param network
   * @param contractHash
   * @param holder
   * @param sub
   */
  static async getKeyByHolderSub(network: NetworkItem, contractHash: string, holder: string, sub: string, pointer: number): Promise<number | null> {
    const operation = 'getKeyByHolderSub'
    const args = [holder, u.str2hexstring(sub), pointer]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoContractIdentity.parseKey(response)
  }

  // #endregion

  // #region Helpers

  static parseKey(response: any): any {
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const deleted = response.result.stack[0].value[8].value === '1'
      if (deleted) {
        return {
          deleted,
          pointer: parseInt(u.reverseHex(response.result.stack[0].value[9].value), 16),
        }
      } else {
        return {
          holder: response.result.stack[0].value[0].value,
          owner: response.result.stack[0].value[1].value,
          iss: response.result.stack[0].value[2].value,
          sub: u.hexstring2str(response.result.stack[0].value[3].value) || false,
          type: u.hexstring2str(response.result.stack[0].value[4].value),
          payload: u.hexstring2str(response.result.stack[0].value[5].value),
          signature: response.result.stack[0].value[6].value,
          encryption: u.hexstring2str(response.result.stack[0].value[7].value),
          deleted,
          pointer: parseInt(u.reverseHex(response.result.stack[0].value[9].value), 16),
        }
      }
    }
    return null
  }

  // #endregion
}
