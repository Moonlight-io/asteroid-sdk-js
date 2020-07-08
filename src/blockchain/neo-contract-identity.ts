import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper, Encryption } from '../helpers'
import { EncryptionMethod, Identity, KeychainKey, NetworkItem, RootKeyItem, ScriptHash, WIF } from '../interfaces'
import { IdentityHelper } from '../helpers/identity-helper'

export class NeoContractIdentity {
  // #region RootKey

  /**
   * creates a new root key for the user.  This can be used to issue group and delegated access rights without giving away
   * identity ownership.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param wif  the wif of the identity.
   */
  static async createRootKey(network: NetworkItem, identityContractHash: ScriptHash, wif: WIF): Promise<void> {
    const operation = 'createRootKey'
    const account = new wallet.Account(wif)
    const rootKey = new wallet.Account()

    const securePayload = Encryption.encryptPayload('holder_ecies', rootKey.privateKey, account.publicKey)

    const args = [account.publicKey, rootKey.publicKey, ClaimsHelper.fieldToHexString(securePayload.value, false)]
    await NeoCommon.contractInvocation(network, identityContractHash, operation, args, wif)
  }

  /**
   * Resolves the root key pair of an identity.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param sub  The identity to retrieve the root key from.
   */
  static async getRootKeyByIdentity(network: NetworkItem, identityContractHash: ScriptHash, sub: Identity): Promise<RootKeyItem | undefined> {
    const operation = 'getRootKeyByIdentity'
    const args = [sub]
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const res: RootKeyItem = {
        sub: response.result.stack[0].value[0].value,
        rootPublicKey: response.result.stack[0].value[1].value,
        rootPrivateKey: u.hexstring2str(response.result.stack[0].value[2].value),
      }
      return res
    }
    return undefined
  }

  /**
   * Resolves the root key of an identity using a pointer.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param pointer  A pointer to the identity requested.
   */
  static async getRootKeyByPointer(network: NetworkItem, identityContractHash: ScriptHash, pointer: number): Promise<RootKeyItem | undefined> {
    const operation = 'getRootKeyByPointer'
    const args = [pointer]
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const res: RootKeyItem = {
        sub: response.result.stack[0].value[0].value,
        rootPublicKey: response.result.stack[0].value[1].value,
        rootPrivateKey: u.hexstring2str(response.result.stack[0].value[2].value),
      }
      return res
    }
    return undefined
  }

  /**
   * Gets the Write Pointer of the root keys.  This can be used when building an iterator in conjunction with [[`getRootKeyByPointer`]].
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   */
  static async getRootKeyWritePointer(network: NetworkItem, identityContractHash: ScriptHash): Promise<number | undefined> {
    const operation = 'getRootKeyWritePointer'
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return undefined
  }

  /**
   * Checks if the identity exists in the system.  Technically, this is checking whether a root key-pair exists.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param sub The identity in question.
   */
  static async getIdentityExists(network: NetworkItem, identityContractHash: ScriptHash, sub: Identity): Promise<boolean> {
    const operation = 'getIdentityExists'
    const args = [sub]
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  // #endregion

  // #region Keychain

  /**
   * Issues a new key to an identity's keychain.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param holder The identity which the key will be issued to.  When using a security method, this user's information will be used to secure the payload.
   * @param owner  The owner of the key.  This user has the ability to operate on the key using methods to edit and delete it.
   * @param sub  The subject of the key.  For example, `claim_id:0` maybe refer to the first attestation in a claim.
   * @param type  The type of the key.  This is primarily used for query efficiency and grouping. It is free form.  For Vivid, we use `proof` to indicate a key against an attestation.
   * @param payload  The unsecured payload which will be secured and issued to the holder.
   * @param encryption  The encryption regime to use.
   * @param wif  The key issuer's WIF.
   */
  static async issueKey(network: NetworkItem, identityContractHash: ScriptHash, holder: Identity, owner: Identity, sub: Identity, type: string, payload: Buffer, encryption: EncryptionMethod, wif: WIF): Promise<void> {
    const operation = 'issueKey'
    const issuer = new wallet.Account(wif)

    // encrypt the payload using the requested method
    let identityPubKey: string
    if (encryption === 'holder_ecies') {
      identityPubKey = holder
    } else if (encryption === 'root_ecies') {
      const rootKeys = await NeoContractIdentity.getRootKeyByIdentity(network, identityContractHash, holder)
      if (!rootKeys) {
        throw new Error('unable to determine root key: verify the holder has a registered root key')
      }
      identityPubKey = rootKeys.rootPublicKey
    } else {
      throw new Error('invalid encryption method')
    }
    const securePayload = Encryption.encryptPayload(encryption, payload.toString(), identityPubKey)
    const value = ClaimsHelper.fieldToHexString(securePayload.value, false)

    const args = [holder, owner, issuer.publicKey, u.str2hexstring(sub), u.str2hexstring(type), value, wallet.sign(value, issuer.privateKey), u.str2hexstring(encryption)]

    await NeoCommon.contractInvocation(network, identityContractHash, operation, args, wif, 2)
  }

  /**
   * Revokes an owned key using the key's pointer
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param pointer  The pointer to the key being revoked.
   * @param wif  The wif of the key owner.
   */
  static async revokeKeyByPointer(network: NetworkItem, identityContractHash: ScriptHash, pointer: number, wif: WIF): Promise<void> {
    const operation = 'revokeKeyByPointer'
    const requestor = new wallet.Account(wif)

    const args = [pointer, requestor.publicKey]

    await NeoCommon.contractInvocation(network, identityContractHash, operation, args, wif)
  }

  /**
   * Retrieves a key using its pointer.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param pointer  The pointer to the key.
   */
  static async getKeyByPointer(network: NetworkItem, identityContractHash: ScriptHash, pointer: number): Promise<KeychainKey | undefined> {
    const operation = 'getKeyByPointer'
    const args = [pointer]
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, args)
    return IdentityHelper.parseKey(response)
  }

  /**
   * Gets the write pointer for the keychain.  This can be used to globally iterate on keys using [[`getKeyByPointer`]]
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   */
  static async getKeychainWritePointer(network: NetworkItem, identityContractHash: ScriptHash): Promise<number | undefined> {
    const operation = 'getKeychainWritePointer'
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
  }

  /**
   * Gets a key by its holder using a symbolic pointer.  This can be used to iterate over every key on a holder's keychain.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param holder  The holder's identity.
   * @param pointer A symbollic pointer that starts at 0.
   */
  static async getKeyByHolder(network: NetworkItem, identityContractHash: ScriptHash, holder: Identity, pointer: number): Promise<KeychainKey | undefined> {
    const operation = 'getKeyByHolder'
    const args = [holder, pointer]
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, args)
    return IdentityHelper.parseKey(response)
  }

  /**
   * gets the key pointers for the owner
   */
  /*
  static async getKeyByOwner(network: NetworkItem, contractHash: string, owner: string, pointer: number): Promise<number | undefined> {
    const operation = 'getKeyByOwner'
    const args = [owner, pointer]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoContractIdentity.parseKey(response)
  }
   */

  /**
   * Gets a key by its issuer using a symbolic pointer. This can be used to iterate over every active key issued by an identity.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param issuer The key issuer.
   * @param pointer  The symbolic pointer.
   */
  static async getKeyByIssuer(network: NetworkItem, identityContractHash: ScriptHash, issuer: Identity, pointer: number): Promise<KeychainKey | undefined> {
    const operation = 'getKeyByIssuer'
    const args = [issuer, pointer]
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, args)
    return IdentityHelper.parseKey(response)
  }

  /**
   * Gets a key by its holder and subject using a symbolic pointer. This can be used to iterate over every active keys issued to a holder for a subject.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param holder The key holder.
   * @param sub The key's subject.
   * @param pointer  The symbolic pointer.
   */
  static async getKeyByHolderSub(network: NetworkItem, identityContractHash: ScriptHash, holder: Identity, sub: Identity, pointer: number): Promise<KeychainKey | undefined> {
    const operation = 'getKeyByHolderSub'
    const args = [holder, u.str2hexstring(sub), pointer]
    const response = await NeoCommon.invokeFunction(network, identityContractHash, operation, args)
    return IdentityHelper.parseKey(response)
  }

  // #endregion

  // #region Helpers

  /**
   * Used to get every key issued to an identity with a specific subject.
   * @param network  The Neo network target.
   * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param holder  The holder identity of the keys being requested.
   * @param keySub  The subject of the key.
   */
  static async getTargetKeys(network: NetworkItem, identityContractHash: ScriptHash, holder: Identity, keySub: string): Promise<KeychainKey[]> {
    let indexPointer = 0
    const keys = []
    while (true) {
      const key = await NeoContractIdentity.getKeyByHolderSub(network, identityContractHash, holder, keySub, indexPointer)
      if (!key) {
        break
      }
      if (!key.deleted) {
        keys.push(key)
      }
      indexPointer++
    }
    return keys
  }
  // #endregion
}
