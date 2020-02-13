import { api, u, wallet } from '@cityofzion/neon-js'
/* tslint:disable-next-line */
const { default: neon } = require('@cityofzion/neon-js')
import { NeoCommon } from '.'
import { NetworkItem } from '../interfaces'

export class NeoContractLX {
  static async allowance(network: NetworkItem, contractHash: string, address: any, spender: any): Promise<any> {
    const operation = 'allowance'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address)), u.reverseHex(wallet.getScriptHashFromAddress(spender))]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)
    }
    return null
  }

  static async approve(network: NetworkItem, contractHash: string, spender: any, amount: any, wif: string): Promise<any> {
    const operation = 'transferFrom'
    const invokeAccount = new wallet.Account(wif)
    const args = [u.reverseHex(invokeAccount.address), u.reverseHex(spender), amount]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async addAddress(network: NetworkItem, contractHash: string, address: any, group: any, wif: string): Promise<any> {
    const operation = 'AddAddress'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address)), group]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async balanceOf(network: NetworkItem, contractHash: string, address: any): Promise<any> {
    const operation = 'balanceOf'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address))]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)
    }
    return null
  }

  static async balanceOfVestedAddress(network: NetworkItem, contractHash: string, address: any): Promise<any> {
    const operation = 'BalanceOfVestedAddress'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address))]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)
    }
    return null
  }

  static async decimals(network: NetworkItem, contractHash: string): Promise<any> {
    const operation = 'decimals'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  static async enableDEXWhiteListing(network: NetworkItem, contractHash: string, value: any, wif: string): Promise<any> {
    const operation = 'admin'
    const args = [u.str2hexstring('EnableDEXWhiteListing'), value]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async contractName(network: NetworkItem, contractHash: string): Promise<any> {
    const operation = 'name'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  static async getGroupUnlockBlock(network: NetworkItem, contractHash: string, targetGroup: any): Promise<any> {
    const operation = 'GetGroupUnlockBlock'
    const args = [targetGroup]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      if (response.result.stack[0].value !== '') {
        return parseInt(u.reverseHex(response.result.stack[0].value.toString()), 16)
      }
    }
    return null
  }

  static async getTokenSaleGroupNumber(network: NetworkItem, contractHash: string, address: any): Promise<any> {
    const operation = 'GetGroupNumber'
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(address))]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      if (response.result.stack[0].value !== '') {
        return parseInt(u.reverseHex(response.result.stack[0].value.toString()), 16)
      }
    }
    return null
  }

  static async initSmartContract(network: NetworkItem, contractHash: string, wif: string): Promise<any> {
    const operation = 'admin'
    const args = [u.str2hexstring('InitSmartContract')]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async isPresaleAllocationLocked(network: NetworkItem, contractHash: string): Promise<any> {
    const operation = 'IsPresaleAllocationLocked'
    return NeoCommon.invokeFunction(network, contractHash, operation, [])
  }

  static async mintTokens(network: NetworkItem, contractHash: string, neoAmount: any, wif: string): Promise<any> {
    const operation = 'mintTokens'
    neon.add.network(network)
    const _api = new api.neoscan.instance(network.name)
    const account = new wallet.Account(wif)

    const script = neon.create.script({
      scriptHash: contractHash,
      operation,
      args: [],
    })

    const invoke = {
      api: _api,
      url: network.extra.rpcServer,
      account,
      intents: api.makeIntent({ NEO: neoAmount }, contractHash),
      script,
    }
    neon.doInvoke(invoke)
  }

  static async setGroupUnlockBlock(network: NetworkItem, contractHash: string, group: any, block: any, wif: string): Promise<any> {
    const operation = 'SetGroupUnlockBlock'
    const args = [group, block]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async symbol(network: NetworkItem, contractHash: string): Promise<any> {
    const operation = 'symbol'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  static async totalSupply(network: NetworkItem, contractHash: string): Promise<any> {
    const operation = 'totalSupply'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)
    }
    return null
  }

  static async transfer(network: NetworkItem, contractHash: string, toAddress: string, amount: any, wif: string): Promise<any> {
    const operation = 'transfer'
    const account = new wallet.Account(wif)
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(account.address)), u.reverseHex(wallet.getScriptHashFromAddress(toAddress)), amount]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async transferFrom(network: NetworkItem, contractHash: string, fromAddress: string, toAddress: string, amount: any, wif: string): Promise<any> {
    const operation = 'transferFrom'
    const invokeAccount = new wallet.Account(wif)
    const args = [u.reverseHex(wallet.getScriptHashFromAddress(invokeAccount.address)), u.reverseHex(wallet.getScriptHashFromAddress(fromAddress)), u.reverseHex(wallet.getScriptHashFromAddress(toAddress)), amount]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async updateAdminAddress(network: NetworkItem, contractHash: string, address: string, wif: string): Promise<any> {
    const operation = 'admin'
    const args = [u.str2hexstring('UpdateAdminAddress'), u.reverseHex(address)]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }
}
