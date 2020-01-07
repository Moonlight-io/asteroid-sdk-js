import { api, u, wallet } from '@cityofzion/neon-js'
const { default: neon } = require("@cityofzion/neon-js");
import { NeoCommon } from '.'

export class NeoContractLX {

  static async allowance(network: any, contractHash: any, address: any, spender: any): Promise<any> {
    const operation = 'allowance';
    let args = [
      u.reverseHex(address),
      u.reverseHex(spender)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args);
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value);
    }
    return null
  }

  static async approve(network: any, contractHash: any, spender: any, amount: any, wif: any): Promise<any> {
    const operation = 'transferFrom';
    let invokeAccount = new wallet.Account(wif);
    let args = [
      u.reverseHex(invokeAccount.address),
      u.reverseHex(spender),
      amount
    ];
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async addAddress(network: any, contractHash: any, address: any, group: any, wif: any): Promise<any> {
    const operation = 'AddAddress';
    let args = [
      u.reverseHex(address),
      group
    ];
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async balanceOf(network: any, contractHash: any, address: any): Promise<any> {
    const operation = 'balanceOf';
    let args = [
      u.str2hexstring(address),
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args);
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value);
    }
    return null
  }

  static async balanceOfVestedAddress(network: any, contractHash: any, address: any): Promise<any> {
    const operation = 'BalanceOfVestedAddress';
    let args = [
      u.reverseHex(wallet.getScriptHashFromAddress(address)),
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args);
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value);
    }
    return null
  }

  static async decimals(network: any, contractHash: any): Promise<any> {
    const operation = 'decimals';
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, []);
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value;
    }
    return null
  }

  static async enableDEXWhiteListing(network: any, contractHash: any, value: any, wif: any): Promise<any> {
    const operation = 'admin';
    let args = [
      u.str2hexstring("EnableDEXWhiteListing"),
      value
    ];
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async contractName(network: any, contractHash: any): Promise<any> {
    const operation = 'name';
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, []);
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  static async getGroupUnlockBlock(network: any, contractHash: any, targetGroup: any): Promise<any> {
    const operation = 'GetGroupUnlockBlock';
    let args = [
      targetGroup
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, []);
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value;
    }
    return null
  }

  static async getTokenSaleGroupNumber(network: any, contractHash: any, targetAddress: any): Promise<any> {
    const operation = 'GetGroupNumber';
    let args = [
      u.reverseHex(targetAddress)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, []);
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value;
    }
    return null
  }

  static async initSmartContract(network: any, contractHash: any, wif: any): Promise<any> {
    const operation = 'admin';
    let args = [
      u.str2hexstring("InitSmartContract")
    ];
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async isPresaleAllocationLocked(network: any, contractHash: any): Promise<any> {
    const operation = 'IsPresaleAllocationLocked';
    return NeoCommon.invokeFunction(network, contractHash, operation, []);
  }

  static async mintTokens(network: any, contractHash: any, neoAmount: any, wif: any): Promise<any> {
    const operation = "mintTokens"
    neon.add.network(network);
    let _api = new api.neoscan.instance(network.name);
    let account = new wallet.Account(wif)

    let script = neon.create.script({
      scriptHash: contractHash,
      operation: operation,
      args: []
    });

    let invoke = {
      api: _api,
      url: network.extra.rpcServer,
      account: account,
      intents: api.makeIntent({NEO: neoAmount}, contractHash),
      script: script
    };
    neon.doInvoke(invoke)
  }

  static async setGroupUnlockBlock(network: any, contractHash: any, group: any, block: any, wif: any): Promise<any> {
    const operation = 'SetGroupUnlockBlock';
    let args = [
      group,
      block
    ];
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async symbol(network: any, contractHash: any): Promise<any> {
    const operation = 'symbol';
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, []);
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  static async totalSupply(network: any, contractHash: any): Promise<any> {
    const operation = 'totalSupply';
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, []);
    if (response.result.stack.length > 0) {
      return u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value);
    }
    return null
  }

  static async transfer(network: any, contractHash: any, to: any, amount: any, wif: any): Promise<any> {
    const operation = 'transfer';
    let account = new wallet.Account(wif);
    let args = [
      u.reverseHex(account.address),
      u.reverseHex(to),
      amount
    ];
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async transferFrom(network: any, contractHash: any, from: any, to: any, amount: any, wif: any): Promise<any> {
    const operation = 'transferFrom';
    let invokeAccount = new wallet.Account(wif);
    let args = [
      u.reverseHex(invokeAccount.address),
      u.reverseHex(from),
      u.reverseHex(to),
      amount
    ];
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static async updateAdminAddress(network: any, contractHash: any, address: any, wif: any): Promise<any> {
    const operation = 'admin';
    const args = [
      u.str2hexstring("UpdateAdminAddress"),
      u.reverseHex(address)
    ];
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

}

