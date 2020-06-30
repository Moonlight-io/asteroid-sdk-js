import Neon, { api, u, wallet } from '@cityofzion/neon-js'
import * as neonCore from '@cityofzion/neon-core'
import { NeoCommon } from '.'
import {Address, NetworkItem, ScriptHash, WIF} from '../interfaces'

export class NeoContractLX {
  /**
   * Gets the transferFrom allowance of an address
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param address  The base address to get the allowance against.
   * @param spender  The address who can spend from "address".
   */
  static async allowance(network: NetworkItem, lxContractHash: ScriptHash, address: Address, spender: Address): Promise<any> {
    const operation = 'allowance'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address)), u.reverseHex(wallet.getScriptHashFromAddress(spender))]
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Approve an amount to transfer on behalf of an address.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param spender  The address to grant a transfer allowance.
   * @param amount  The number of tokens to grant spender control over.
   * @param wif  The wif of the base account being spent from.
   */
  static async approve(network: NetworkItem, lxContractHash: ScriptHash, spender: Address, amount: any, wif: WIF): Promise<any> {
    const operation = 'transferFrom'
    const invokeAccount = new wallet.Account(wif)
    const args = [u.reverseHex(invokeAccount.address), u.reverseHex(spender), amount]
    return NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)
  }

  /**
   * Adds an address to a token sale group.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param address  The address to add.
   * @param group  The group number.
   * @param wif  The contract admin WIF.
   */
  static async addAddress(network: NetworkItem, lxContractHash: ScriptHash, address: Address, group: any, wif: WIF): Promise<any> {
    const operation = 'AddAddress'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address)), group]
    return NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)
  }

  /**
   * Returns the token balance of an address
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param address  The requested address to return the balance of.
   */
  static async balanceOf(network: NetworkItem, lxContractHash: ScriptHash, address: Address): Promise<number | undefined> {
    const operation = 'balanceOf'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address))]
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)
    }
    return undefined
  }


  /**
   *  Gets the amount of tokens on an account that are part of a vesting workflow.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param address  The requested address to return the balance of.
   */
  static async balanceOfVestedAddress(network: NetworkItem, lxContractHash: ScriptHash, address: Address): Promise<number | undefined> {
    const operation = 'BalanceOfVestedAddress'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address))]
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Returns the number of decimals used on token amounts.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   */
  static async decimals(network: NetworkItem, lxContractHash: ScriptHash): Promise<any> {
    const operation = 'decimals'
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return undefined
  }

  /**
   * Enables Whitelisting of addresses for the transferFrom method.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param value  A value representing whether this feature is enabled or disabled.
   * @param wif  The contract admin wif.
   */
  static async enableDEXWhiteListing(network: NetworkItem, lxContractHash: ScriptHash, value: any, wif: WIF): Promise<any> {
    const operation = 'admin'
    const args = [u.str2hexstring('EnableDEXWhiteListing'), value]
    return NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)
  }

  /**
   * Returns the contract's name.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   */
  static async contractName(network: NetworkItem, lxContractHash: ScriptHash): Promise<string | undefined> {
    const operation = 'name'
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Gets the unlock block for a token sale for a specific group.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param targetGroup  The target group.
   */
  static async getGroupUnlockBlock(network: NetworkItem, lxContractHash: ScriptHash, targetGroup: any): Promise<number | undefined> {
    const operation = 'GetGroupUnlockBlock'
    const args = [targetGroup]
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, args)
    if (response.result.stack.length > 0) {
      if (response.result.stack[0].value !== '') {
        return parseInt(u.reverseHex(response.result.stack[0].value.toString()), 16)
      }
    }
    return undefined
  }

  /**
   * Gets the token sale group number of an address.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param address  The target address to request information about.
   */
  static async getTokenSaleGroupNumber(network: NetworkItem, lxContractHash: ScriptHash, address: Address): Promise<number | undefined> {
    const operation = 'GetGroupNumber'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address))]
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, args)
    if (response.result.stack.length > 0) {
      if (response.result.stack[0].value !== '') {
        return parseInt(u.reverseHex(response.result.stack[0].value.toString()), 16)
      }
    }
    return undefined
  }

  /**
   * Initialized the smart contract.  This is a mandatory step that must occur prior to using the contract for the first time.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param wif  The contract admin WIF.
   */
  static async initSmartContract(network: NetworkItem, lxContractHash: ScriptHash, wif: WIF): Promise<any> {
    const operation = 'admin'
    const args = [u.str2hexstring('InitSmartContract')]
    return NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)
  }

  /**
   * Checks if presale allocations are locked.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   */
  static async isPresaleAllocationLocked(network: NetworkItem, lxContractHash: string): Promise<any> {
    const operation = 'IsPresaleAllocationLocked'
    return NeoCommon.invokeFunction(network, lxContractHash, operation, [])
  }

  /**
   * Mints tokens...
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param neoAmount  The amount to mint.
   * @param wif  The contract admin WIF.
   */
  static async mintTokens(network: NetworkItem, lxContractHash: ScriptHash, neoAmount: any, wif: WIF): Promise<any> {
    const operation = 'mintTokens'
    Neon.add.network(network as neonCore.rpc.Network)
    const _api = new api.neoscan.instance(network.name)
    const account = new wallet.Account(wif)

    const script = Neon.create.script({
      scriptHash: lxContractHash,
      operation,
      args: [],
    })

    const invoke = {
      api: _api,
      url: network.extra.rpcServer,
      account,
      intents: api.makeIntent({ NEO: neoAmount }, lxContractHash),
      script,
    }
    Neon.doInvoke(invoke)
  }

  /**
   * Sets a group's unlock block to a token sale.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param group  The target group number.
   * @param block  The unlock block height.
   * @param wif  The contract admin wif.
   */
  static async setGroupUnlockBlock(network: NetworkItem, lxContractHash: ScriptHash, group: any, block: any, wif: WIF): Promise<any> {
    const operation = 'SetGroupUnlockBlock'
    const args = [group, block]
    return NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)
  }

  /**
   * Gets the contract's token symbol.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   */
  static async symbol(network: NetworkItem, lxContractHash: string): Promise<string | undefined> {
    const operation = 'symbol'
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Gets the token's total supply.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   */
  static async totalSupply(network: NetworkItem, lxContractHash: ScriptHash): Promise<number | undefined> {
    const operation = 'totalSupply'
    const response = await NeoCommon.invokeFunction(network, lxContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Transfers tokens between two addresses if the spender has custody of enough tokens.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param toAddress  The address to transfer to.
   * @param amount  The amount of tokens to transfer.
   * @param wif  The token holder's WIF.
   */
  static async transfer(network: NetworkItem, lxContractHash: ScriptHash, toAddress: Address, amount: any, wif: WIF): Promise<any> {
    const operation = 'transfer'
    const account = new wallet.Account(wif)
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(account.address)), u.reverseHex(wallet.getScriptHashFromAddress(toAddress)), amount]
    return await NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif)
  }

  /**
   * Transfers tokens on behalf of another user.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param fromAddress  The address to transfer from.
   * @param toAddress  The address to transfer to.
   * @param amount  The amount to transfer.
   * @param wif  The wif of the user wishing to initiate the transfer.
   */
  static async transferFrom(network: NetworkItem, lxContractHash: ScriptHash, fromAddress: Address, toAddress: Address, amount: any, wif: WIF): Promise<any> {
    const operation = 'transferFrom'
    const invokeAccount = new wallet.Account(wif)
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(invokeAccount.address)), u.reverseHex(wallet.getScriptHashFromAddress(fromAddress)), u.reverseHex(wallet.getScriptHashFromAddress(toAddress)), amount]
    return NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)
  }

  /**
   * Updates the contract admin.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param address  The new contract admin.
   * @param wif  The contract admin WIF.
   */
  static async updateAdminAddress(network: NetworkItem, lxContractHash: ScriptHash, address: Address, wif: WIF): Promise<any> {
    const operation = 'admin'
    const args = [u.str2hexstring('UpdateAdminAddress'), u.reverseHex(address)]
    return NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)
  }

  /**
   * Unlocks founder tokens.
   * @param network  The Neo network target.
   * @param lxContractHash  The LX script hash found (Here).
   * @param address  The target founder address.
   * @param period  The vesting period to unlock.
   * @param wif  The contract admin wif.
   */
  static async unlockFoundersTokens(network: NetworkItem, lxContractHash: ScriptHash, address: Address, period: number, wif: WIF): Promise<any> {
    const operation = 'admin'
    const args = [u.str2hexstring('UnlockFoundersTokens'), u.reverseHex(wallet.getScriptHashFromAddress(address)), period]
    return await NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif)
  }
}
