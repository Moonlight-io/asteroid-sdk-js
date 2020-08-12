import { urls } from './urls'
import { rpcErrorCodes } from './rpc-error-codes'
import { rpcDefaults } from './rpc-defaults'
import { attributeTypes } from './attribute-types'
import { claimEncryptionModes } from './claim_encryption'
import { bip32Accounts, bip32Coins, bip32MasterSeeds, bip32Purposes, curves } from './bips'
import { neo2CNSHash } from './blockchain'

const constants = {
  claimEncryptionModes,
  urls,
  rpcErrorCodes,
  rpcDefaults,
  attributeTypes,
  bip32MasterSeeds,
  bip32Purposes,
  bip32Coins,
  bip32Accounts,
  curves,
  neo2CNSHash,
}

export { constants }
