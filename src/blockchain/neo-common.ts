import Neon, { wallet, u, rpc, api, sc } from '@cityofzion/neon-js'
import * as neonCore from '@cityofzion/neon-core'
import { ScriptIntent } from '@cityofzion/neon-core/lib/sc'
import { DoInvokeConfig, ClaimGasConfig, SendAssetConfig } from '@cityofzion/neon-api/lib/funcs/types'
import { NetworkItem, ScriptInvocationResponse, Address, ScriptHash, WIF } from '../interfaces'
import { TimingHelper } from '../helpers'

export class NeoCommon {
  /**
   * Gets the contract name of a moonlight smart contract.
   * @param network  The Neo network target.
   * @param contractHash  The script hash which can be found by using [[`NeoContractNameService.getAddress`]].
   */
  static async getContractName(network: NetworkItem, contractHash: ScriptHash): Promise<string | undefined> {
    const operation = 'getContractName'
    const args: any[] = []
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value.toString())
    }
    return undefined
  }

  /**
   * Gets the contract version of a moonlight smart contract.
   * @param network  The Neo network target.
   * @param contractHash  The script hash which can be found by using [[`NeoContractNameService.getAddress`]].
   */
  static async getContractVersion(network: NetworkItem, contractHash: ScriptHash): Promise<string | undefined> {
    const operation = 'getContractVersion'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Initializes a smart contract
   * @param network  The Neo network target.
   * @param contractHash  The script hash which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param wif contract admin wif
   */
  static async initSmartContract(network: NetworkItem, contractHash: ScriptHash, wif: WIF): Promise<DoInvokeConfig> {
    const operation = 'admin'
    const args = [u.str2hexstring('initSmartContract')]
    return NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)
  }

  static getScriptHashForData(data: string): string {
    return u.reverseHex(u.hash160(data))
  }

  /**
   * Claims gas.
   * @param network  The Neo network target.
   * @param wif The wif of the requestor
   */
  static async claimGas(network: NetworkItem, wif: WIF): Promise<ClaimGasConfig> {
    const account = new wallet.Account(wif)
    Neon.add.network(network as neonCore.rpc.Network)
    const _api = new api.neoscan.instance(network.name)

    const config = {
      api: _api,
      url: network.extra.rpcServer,
      account,
    }
    return Neon.claimGas(config)
  }

  /**
   * Transfers a system asset.
   * @param network  The Neo network target.
   * @param wifFrom The WIF to transfer assets from.
   * @param addressTo The address to transfer the assets to.
   * @param neoAmount The amount of neo the transfer.
   * @param gasAmount The amount of gas to transfer.
   */
  static async transferAsset(network: NetworkItem, wifFrom: WIF, addressTo: Address, neoAmount: number, gasAmount: number): Promise<SendAssetConfig> {
    const account = new wallet.Account(wifFrom)
    Neon.add.network(network as neonCore.rpc.Network)
    const _api = new api.neoscan.instance(network.name)

    const assets: any = {}

    if (neoAmount > 0) {
      assets.NEO = neoAmount
    }

    if (gasAmount > 0) {
      assets.GAS = gasAmount
    }

    const intent = api.makeIntent(assets, addressTo)
    const config = {
      api: _api,
      url: network.extra.rpcServer,
      account,
      intents: intent,
    }

    return Neon.sendAsset(config)
  }

  /**
   * Transfers all of an accounts neo to itself, then executes a gas claim.
   * @param network The Neo network to target.
   * @param wif The WIF to transfer assets from.
   */
  static async transferAndClaim(network: NetworkItem, wif: WIF): Promise<ClaimGasConfig> {
    Neon.add.network(network as neonCore.rpc.Network)
    const account = new wallet.Account(wif)
    const _api = new api.neoscan.instance(network.name)

    const balances = await NeoCommon.getAssetBalanceSummary(network, account.address)
    await NeoCommon.transferAsset(network, account.WIF, account.address, balances.NEO, 0)
    for (let i = 0; i < 30; i++) {
      const claims = await _api.getClaims(account.address)
      if (claims.claims.length > 0) {
        break
      }
      await TimingHelper.sleep(1000)
    }
    return NeoCommon.claimGas(network, account.WIF)
  }

  /**
   * Gets the balance of all unspent assets of an account.
   * @param network
   * @param address
   */
  static async getAssetBalanceSummary(network: NetworkItem, address: Address): Promise<any> {
    Neon.add.network(network as neonCore.rpc.Network)
    const _api = new api.neoscan.instance(network.name)

    const coins = await _api.getBalance(address)
    const balances: any = { NEO: 0, GAS: 0 }
    for (const n in balances) {
      if (coins.assets[n]) {
        coins.assets[n].unspent.forEach((val) => {
          balances[n] += parseFloat(val.value.toString())
        })
      }
    }
    return balances
  }

  /**
   * Invoke a contract method (readonly) and expect a response
   */
  static async invokeFunction(network: NetworkItem, contractHash: ScriptHash, operation: string, args: any[] = []): Promise<ScriptInvocationResponse> {
    const invocation: ScriptIntent = {
      scriptHash: contractHash,
      operation,
      args,
    }
    return NeoCommon.scriptInvocation(network, invocation)
  }

  /**
   * Deploy a contract to the neo network
   */
  static async deployContract(network: NetworkItem, avmData: any, wif: string): Promise<DoInvokeConfig> {
    const account = new wallet.Account(wif)
    Neon.add.network(network as neonCore.rpc.Network)
    const _api = new api.neoscan.instance(network.name)

    const sb = Neon.create.scriptBuilder()

    sb.emitPush(u.str2hexstring('')) // description
      .emitPush(u.str2hexstring('')) // email
      .emitPush(u.str2hexstring('')) // author
      .emitPush(u.str2hexstring('')) // code_version
      .emitPush(u.str2hexstring('')) // name
      .emitPush(0x03) // storage: {none: 0x00, storage: 0x01, dynamic: 0x02, storage+dynamic:0x03}
      .emitPush('05') // expects hexstring  (_emitString) // usually '05'
      .emitPush('0710') // expects hexstring  (_emitString) // usually '0710'
      .emitPush(avmData) // script
      .emitSysCall('Neo.Contract.Create')

    const config = {
      api: _api,
      url: network.extra.rpcServer,
      account,
      script: sb.str,
      fees: 1,
      gas: 990,
    }

    return await Neon.doInvoke(config)
  }

  /**
   * Initiate a read-only event to the rpc server
   */
  static async scriptInvocation(network: NetworkItem, scripts: ScriptIntent): Promise<ScriptInvocationResponse> {
    return await rpc.Query.invokeScript(Neon.create.script(scripts)).execute(network.extra.rpcServer)
  }

  /**
   * Initiate a contract invocation
   */
  static async contractInvocation(network: NetworkItem, contractHash: string, operation: string, args: any[], wif: string, gas: number = 0, fee: number = 0.001): Promise<DoInvokeConfig> {
    Neon.add.network(network as neonCore.rpc.Network)
    const _api = new api.neoscan.instance(network.name)

    const account = new wallet.Account(wif)

    const props = {
      scriptHash: contractHash,
      operation,
      args,
    }

    const script = Neon.create.script(props)

    const invoke = {
      url: network.extra.rpcServer,
      api: _api, // neoscan entity
      account,
      script,
      gas,
      fees: fee,
    }
    return await Neon.doInvoke(invoke)
  }

  /**
   * Executes a contract migration event on Moonlight issued contracts.
   * @param network
   * @param contractHash
   * @param avmData
   * @param parameterTypes
   * @param returnType
   * @param needStorage
   * @param name
   * @param version
   * @param author
   * @param email
   * @param description
   * @param wif
   */
  static async contractMigrate(
    network: NetworkItem,
    contractHash: ScriptHash,
    avmData: any,
    parameterTypes: string,
    returnType: string,
    needStorage: number,
    name: string,
    version: string,
    author: string,
    email: string,
    description: string,
    wif: WIF
  ): Promise<void> {
    const operation = 'admin'
    const args = [
      u.str2hexstring('contractMigrate'),
      avmData,
      parameterTypes,
      returnType,
      u.int2hex(needStorage),
      u.str2hexstring(name),
      u.str2hexstring(version),
      u.str2hexstring(author),
      u.str2hexstring(email),
      u.str2hexstring(description),
    ]
    NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 500, 1)
  }

  /**
   * Parse a neon-js response when expecting a boolean value
   */
  static expectBoolean(response: ScriptInvocationResponse): boolean {
    if (response.result && response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return false
  }
}
