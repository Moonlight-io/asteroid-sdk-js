import { urls } from './urls'
import { rpcErrorCodes } from './rpc-error-codes'
import { rpcDefaults } from './rpc-defaults'
import { attributeTypes } from './attribute-types'
import { claimEncryptionModes } from './claim_encryption'
import { BIP32Accounts, BIP32Coins, BIP32MasterSeeds, BIP32Purposes, curves } from './bips'

const constants = {
  claimEncryptionModes,
  urls,
  rpcErrorCodes,
  rpcDefaults,
  attributeTypes,
  BIP32Accounts,
  BIP32Coins,
  BIP32MasterSeeds,
  BIP32Purposes,
  curves,
}

export { constants }
