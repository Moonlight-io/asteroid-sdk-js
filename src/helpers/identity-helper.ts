import { KeychainKey, SecureAttestation } from '../interfaces'
import { Encryption } from './encryption'
import { u } from '@cityofzion/neon-js'

export class IdentityHelper {
  static parseKey(response: any): KeychainKey | undefined {
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
          sub: u.hexstring2str(response.result.stack[0].value[3].value),
          type: u.hexstring2str(response.result.stack[0].value[4].value),
          payload: u.hexstring2str(response.result.stack[0].value[5].value),
          signature: response.result.stack[0].value[6].value,
          encryption: u.hexstring2str(response.result.stack[0].value[7].value),
          deleted,
          pointer: parseInt(u.reverseHex(response.result.stack[0].value[9].value), 16),
        }
      }
    }
  }
}
