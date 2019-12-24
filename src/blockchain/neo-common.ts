import Neon, { wallet, u, rpc, api } from '@cityofzion/neon-js'

export class NeoCommon {
  /**
   * Attempt to retrieve the contract name (defined within the contract) that will be used for CNS
   * @returns {Promise<string|boolean>}
   */
  static async contractName(network: any, contractHash: any): Promise<string | boolean> {
    const operation = 'getContractName'
    const args: any[] = []
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value.toString())
    }
    return false
  }

  /**
   * Return the scriptHash for a file
   */
  static getScriptHashForData(data: string): string {
    return u.reverseHex(u.hash160(data))
  }

  /**
   * Claim gas for account
   */
  static async claimGas(api: any, account: any): Promise<any> {
    const config = {
      api,
      account,
    }
    return Neon.claimGas(config)
  }

  /**
   * Transfer neo or gas to an address
   */
  static async transferAsset(network: any, _api: any, accountFrom: any, addressTo: any, neoAmount: any, gasAmount: any) {
    let assets: any = {}

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
      account: accountFrom,
      intents: intent,
    }

    return Neon.sendAsset(config)
  }

  /**
   * Get a balance of all unspent assets for address
   */
  static async getAssetBalanceSummary(api: any, address: any): Promise<any> {
    let coins = await api.getBalance(address)
    let balances: any = { NEO: 0, GAS: 0 }
    for (let n in balances) {
      if (coins.assets[n]) {
        coins.assets[n].unspent.forEach((val: any) => {
          balances[n] += parseFloat(val.value.toString())
        })
      }
    }
    return balances
  }

  /**
   * Invoke a contract method (readonly) and expect a response
   */
  static async invokeFunction(network: any, contractHash: any, operation: any, args: any[] = []): Promise<any> {
    const invocation = {
      scriptHash: contractHash,
      operation,
      args,
    }
    return NeoCommon.scriptInvocation(network, invocation)
  }

  /**
   * Deploy a contract to the neo network
   */
  static async deployContract(network: any, api: any, avmData: any, _wif: any): Promise<any> {
    const walletAccount = new wallet.Account(_wif)
    const sb = Neon.create.scriptBuilder()

    sb.emitPush(u.str2hexstring('')) // description
      .emitPush(u.str2hexstring('')) // email
      .emitPush(u.str2hexstring('')) // author
      .emitPush(u.str2hexstring('')) // code_version
      .emitPush(u.str2hexstring('')) // name
      .emitPush(0x03) // storage: {none: 0x00, storage: 0x01, dynamic: 0x02, storage+dynamic:0x03}
      .emitPush('05') // expects hexstring  (_emitString) // usually '05'
      .emitPush('0710') // expects hexstring  (_emitString) // usually '0710'
      .emitPush(avmData) //script
      .emitSysCall('Neo.Contract.Create')

    const config = {
      api,
      url: network.extra.rpcServer,
      account: walletAccount,
      script: sb.str,
      fees: 1,
      gas: 990,
    }

    return await Neon.doInvoke(config)
  }

  /**
   * Initiate a read-only event to the rpc server
   */
  static async scriptInvocation(network: any, scripts: any): Promise<any> {
    return await rpc.Query.invokeScript(Neon.create.script(scripts)).execute(network.extra.rpcServer)
  }

  /**
   * Initiate a contract invocation
   */
  static async contractInvocation(network: any, api: any, contractHash: any, operation: any, args: any, wif: any, gas: any = 0, fee: any = 0.001): Promise<any> {
    Neon.add.network(network)

    const walletAccount = new wallet.Account(wif)
    const invoke = {
      api,
      url: network.extra.rpcServer,
      script: Neon.create.script({
        scriptHash: contractHash,
        operation,
        args,
      }),
      account: walletAccount,
      gas: gas,
      fees: fee,
    }

    return await Neon.doInvoke(invoke)
  }

  /**
   * Parse a neon-js response when expecting a boolean value
   */
  static expectBoolean(response: any): boolean {
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return false
  }
}
