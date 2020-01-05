import Neon, { wallet, u, rpc, api, sc } from '@cityofzion/neon-js'
const { default: neon } = require("@cityofzion/neon-js");

export class NeoCommon {
  /**
   * Attempt to retrieve the contract name (defined within the contract) that will be used for CNS
   * @returns {Promise<string|boolean>}
   */
  static async contractName(network: any, contractHash: any): Promise<string | boolean> {
    const operation = 'getContractName';
    const args: any[] = [];
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args);

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
  static async claimGas(network: any, wif: string): Promise<any> {
    const account = new wallet.Account(wif);
    neon.add.network(network);
    let _api = new api.neoscan.instance(network.name);

    const config = {
      api: _api,
      url: network.extra.rpcServer,
      account,
    };
    return neon.claimGas(config)
  }

  /**
   * Transfer neo or gas to an address
   */
  static async transferAsset(network: any, wif_from: any, address_to: any, neo_amount: any, gas_amount: any): Promise<any> {
    const account = new wallet.Account(wif_from);
    neon.add.network(network);
    let _api = new api.neoscan.instance(network.name);

    const _assets: any = {};

    if (neo_amount > 0) {
      _assets.NEO = neo_amount
    }

    if (gas_amount > 0) {
      _assets.GAS = gas_amount
    }

    const intent = api.makeIntent(_assets, address_to);
    const config = {
      api: _api,
      url: network.extra.rpcServer,
      account: account,
      intents: intent,
    };

    return Neon.sendAsset(config)
  }

  /**
   * transfers all an accounts neo to itself, then claims the gas.
   * @param network
   * @param wif
   * @returns {Promise<any>}
   */
  static async transferAndClaim(network: any, wif: any): Promise<any> {
    neon.add.network(network);
    const account = new wallet.Account(wif);
    let _api = new api.neoscan.instance(network.name);

    let balances = await NeoCommon.getAssetBalanceSummary(network, account.address);
    await NeoCommon.transferAsset(network, account.WIF, account.address, balances.NEO, 0);
    for (let i = 0; i < 30; i ++) {
      let claims = await _api.getClaims(account.address);
      if (claims.claims.length > 0 ) {
        break;
      }
      await NeoCommon.sleep(1000)
    }
    return NeoCommon.claimGas(network, account.WIF);
  }

  /**
   * Get a balance of all unspent assets for address
   */
  static async getAssetBalanceSummary(network: any, address: any): Promise<any> {
    neon.add.network(network);
    let _api = new api.neoscan.instance(network.name);

    const coins = await _api.getBalance(address);
    const balances: any = { NEO: 0, GAS: 0 };
    for (const n in balances) {
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
    };
    return NeoCommon.scriptInvocation(network, invocation)
  }

  /**
   * Deploy a contract to the neo network
   */
  static async deployContract(network: any, avmData: any, _wif: any): Promise<any> {
    const account = new wallet.Account(_wif);
    neon.add.network(network);
    let _api = new api.neoscan.instance(network.name);

    const sb = Neon.create.scriptBuilder();

    sb.emitPush(u.str2hexstring('')) // description
      .emitPush(u.str2hexstring('')) // email
      .emitPush(u.str2hexstring('')) // author
      .emitPush(u.str2hexstring('')) // code_version
      .emitPush(u.str2hexstring('')) // name
      .emitPush(0x03) // storage: {none: 0x00, storage: 0x01, dynamic: 0x02, storage+dynamic:0x03}
      .emitPush('05') // expects hexstring  (_emitString) // usually '05'
      .emitPush('0710') // expects hexstring  (_emitString) // usually '0710'
      .emitPush(avmData) // script
      .emitSysCall('Neo.Contract.Create');

    const config = {
      api: _api,
      url: network.extra.rpcServer,
      account: account,
      script: sb.str,
      fees: 1,
      gas: 990,
    };

    return await neon.doInvoke(config)
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
  static async contractInvocation(network: any, contractHash: any, operation: any, args: any, wif: any, gas: any = 0, fee: any = 0.001): Promise<any> {
    neon.add.network(network);
    let _api = new api.neoscan.instance(network.name);

    let account = new wallet.Account(wif);

    const props = {
      scriptHash: contractHash,
      operation: operation,
      args: args
    };

    const script = Neon.create.script(props);

    const invoke = {
      url: network.extra.rpcServer,
      api: _api, //neoscan entity
      account: account,
      script: script,
      gas: gas,
      fees: fee,
    };
    return await neon.doInvoke(invoke)
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

  static async sleep(milliseconds: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };
}

