import crypto from 'crypto'
import * as bs58 from 'bs58'

interface KeyFields {
  childNumber: number
  chainCode: Buffer
  key: Buffer
  fingerprint: Buffer
  depth: number
  isPrivate: boolean
}

export class Key {
  f: KeyFields

  constructor(fields: KeyFields) {
    this.f = fields
  }

  getWIF() {
    const wif = Buffer.concat([Buffer.from('80', 'hex'), this.f.key, Buffer.from('01', 'hex')])

    const sha256H = crypto
      .createHash('sha256')
      .update(wif)
      .digest()

    const sha256H2 = crypto
      .createHash('sha256')
      .update(sha256H)
      .digest()

    return bs58.encode(Buffer.concat([wif, sha256H2.slice(0, 4)]))
  }
}
