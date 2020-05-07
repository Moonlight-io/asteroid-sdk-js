import elliptic from 'elliptic'
import crypto from 'crypto'
import { constants } from '../constants'
import * as bip39 from 'bip39'
import { Key } from '.'
import { PlatformType } from '../interfaces'

/**
 * A blockchain keychain for elliptic curve-based platforms
 * implements: BIP32, BIP39, BIP44
 */
export class Keychain {
  mnemonic: Buffer | undefined
  seed: Buffer | undefined
  secret: string | undefined

  constructor() {
    this.mnemonic = this.generateMnemonic()
    this.seed = this.generateSeed()
    this.secret = ''
  }

  /**
   * generates a new child key for a chain along a derivation vector
   * @param platform
   * @param derivationPath (example:
   */
  generateChildKey(platform: PlatformType, derivationPath: string): Key {
    let childKey = this.generateMasterKey(platform)

    let pathArray = derivationPath.split('/')
    if (pathArray[0] !== 'm') {
      throw new Error('derivation path must be of format: m/x/x...')
    }
    pathArray = pathArray.slice(1)
    for (const stringIdx of pathArray) {
      let childIdx
      if (stringIdx.slice(-1) === "'") {
        childIdx = parseInt(stringIdx.slice(0, stringIdx.length - 1), 10) + constants.bip32Accounts.firstHardenedChild
      } else {
        childIdx = parseInt(stringIdx, 10)
      }
      childKey = this.newChildKey(platform, childKey, childIdx)
    }
    return childKey
  }

  /**
   * generates a bip39 mnemonic for the key
   * @param strength
   */
  generateMnemonic(strength: number = 256): Buffer {
    this.mnemonic = Buffer.from(bip39.generateMnemonic(strength))
    this.secret = ''
    this.seed = this.generateSeed(this.secret)
    return this.mnemonic
  }

  /**
   * generates a bip39 compliant seed
   * @param secret
   */
  generateSeed(secret: string = ''): Buffer {
    if (this.mnemonic === undefined) {
      throw new Error('mnemonic required, but undefined')
    }
    this.secret = secret
    this.seed = bip39.mnemonicToSeedSync(this.mnemonic.toString(), this.secret)
    return this.seed!
  }

  /**
   * imports a mnemonic into the key
   * @param mnemonic
   */
  importMnemonic(mnemonic: string): void {
    this.mnemonic = Buffer.from(mnemonic)
    delete this.secret
    this.seed = this.generateSeed(this.secret)
  }

  importSeed(seed: string): void {
    delete this.secret
    this.seed = Buffer.from(seed)
  }

  /**
   * generates a new child key along a childIdx
   * @param platform
   * @param parentKey
   * @param childIdx
   */
  private newChildKey(platform: PlatformType, parentKey: Key, childIdx: number): Key {
    const curve = constants.curves[platform]

    const hardenedChild = childIdx >= constants.bip32Accounts.firstHardenedChild
    let data
    if (hardenedChild) {
      data = Buffer.concat([Buffer.from('00', 'hex'), parentKey.f.key])
    } else {
      const pk = curve.keyFromPrivate(parentKey.f.key, 'hex')
      data = Buffer.from(pk.getPublic().encodeCompressed())
    }
    const childIdBuffer = Buffer.from(childIdx.toString(16).padStart(8, '0'), 'hex')
    data = Buffer.concat([data, childIdBuffer])
    const intermediary = crypto
      .createHmac('sha512', parentKey.f.chainCode)
      .update(data)
      .digest()

    let newKey
    if (parentKey.f.isPrivate) {
      let k1 = BigInt('0x' + intermediary.slice(0, 32).toString('hex'))
      const k2 = BigInt('0x' + parentKey.f.key.toString('hex'))

      k1 = k1 + k2
      k1 = k1 % BigInt(curve.n)

      const protoKey = k1.toString(16)
      newKey = Buffer.from(protoKey.padStart(64, '0'), 'hex')
    } else {
      throw new Error('only private keys are supported for keygen')
    }

    return new Key({
      childNumber: childIdx,
      chainCode: intermediary.slice(32, intermediary.length),
      depth: parentKey.f.depth + 1,
      fingerprint: crypto
        .createHash('sha256')
        .update(newKey)
        .digest(),
      key: newKey,
      isPrivate: parentKey.f.isPrivate,
    })
  }

  /**
   * generates a bip32 compliant master key
   * @param platform
   */
  private generateMasterKey(platform: PlatformType): Key {
    if (!(platform in constants.bip32MasterSeeds)) {
      throw new Error('requested chain is not supported')
    } else if (this.seed === undefined) {
      throw new Error('invalid seed')
    }

    const hmac = crypto
      .createHmac('sha512', constants.bip32MasterSeeds[platform])
      .update(this.seed)
      .digest()

    return new Key({
      childNumber: 0,
      chainCode: hmac.slice(32, hmac.length),
      key: hmac.slice(0, 32),
      fingerprint: Buffer.from((0x0).toString(16)),
      depth: 0,
      isPrivate: true,
    })
  }
}
