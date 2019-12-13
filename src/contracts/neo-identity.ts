import Neon, { wallet, u, rpc } from '@cityofzion/neon-js'
import * as fs from 'fs'

export class NeoIdentityContract {
  /**
   * have the identity contract do a dynamic invoke to the CNS registering itself
   */
  static async cnsRegister(network: any, api: any, contractHash: any, contractNameService: any, owner: any, wif: any): Promise<void> {
    const operation = 'registerContractName'
    const args = [
      u.reverseHex(contractNameService),
      owner
    ]
    await NeoIdentityContract.contractInvocation(network, api, contractHash, operation, args, wif)
  }


  /**
   * Have the identity contract do a dynamic invoke to the CNS updating its scriptHash
   */
  static async cnsUpdate(network: any, api: any, contractHash: any, contractNameService: any, wif: any): Promise<void> {
    const operation = 'updateContractAddress'
    const args = [
      u.reverseHex(contractNameService),
      wif,
    ]

    await NeoIdentityContract.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  /**
   * Test whether an address is registered with CNS
   */
  static async cnsIntegration(network: any, api: any, contractHash: any, contractNameService: any, defaultContact: any, owner: any, wif: any): Promise<void|boolean> {
    // get contract name from deployed contract
    const contractName = await NeoIdentityContract.contractName(network, contractHash)

    const operation = 'GetAddress'
    const args = [u.str2hexstring(contractName as string)]
    const invocation = {
      scriptHash: contractNameService,
      operation,
      args,
    };

    // test if address exists on CNS
    const response = await NeoIdentityContract.scriptInvocation(network, invocation)
    if (response.result.stack.length > 0 && response.result.stack[0].value !== '') {
      let currentAddress = u.reverseHex(response.result.stack[0].value.toString())
      if (currentAddress !== defaultContact) {
        // contract address has changed, update it
        await NeoIdentityContract.cnsUpdate(network, api, contractHash, contractNameService, wif)
      }
    } else {
      // address doesn't exist, register it
      await NeoIdentityContract.cnsRegister(network, api, contractHash, contractNameService, owner, wif)
    }

    return false
  }


  /**
   * Attempt to retrieve the contract name (defined within the contract) that will be used for CNS
   * @returns {Promise<string|boolean>}
   */
  static async contractName(network: any, contractHash: any): Promise<string|boolean> {
    const operation = 'getContractName'
    const args: any[] = []
    const response = await NeoIdentityContract.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value.toString());
    }
    return false;
  }


  /**
   * Test whether `identityId` exists on-chain
   */
  static async identityExists(network: any, contractHash: any, identityId: any): Promise<boolean> {
    const operation: 'identityExists'
    const args = [identityId]
    const response = await NeoIdentityContract.invokeFunction(network, contractHash, operation, args)
    return NeoIdentityContract.expectBoolean(response);
  },




  /**
   * Invoke a contract method (readonly) and expect a response
   */
  static async invokeFunction(network: any, contractHash: any, operation: any, args: any[] = []): Promise<any> {
    const invocation = {
      scriptHash: contractHash,
      operation,
      args,
    };
    return NeoIdentityContract.scriptInvocation(network, invocation);
  }


  /**
   * Deploy a contract to the neo network
   */
  static async deployContract(network: any, api: any, avmData: any, _wif: any): Promise<any> {
    const walletAccount = new wallet.Account(_wif);
    const sb = Neon.create.scriptBuilder();

    sb.emitPush(u.str2hexstring("")) // description
      .emitPush(u.str2hexstring("")) // email
      .emitPush(u.str2hexstring("")) // author
      .emitPush(u.str2hexstring("")) // code_version
      .emitPush(u.str2hexstring("")) // name
      .emitPush(0x03) // storage: {none: 0x00, storage: 0x01, dynamic: 0x02, storage+dynamic:0x03}
      .emitPush("05") // expects hexstring  (_emitString) // usually '05'
      .emitPush("0710") // expects hexstring  (_emitString) // usually '0710'
      .emitPush(avmData) //script
      .emitSysCall('Neo.Contract.Create');

    const config = {
      api,
      url: network.extra.rpcServer,
      account: walletAccount,
      script: sb.str,
      fees: 1,
      gas: 990
    };

    return await Neon.doInvoke(config);
  }

  /**
   * Initiate a read-only event to the rpc server
   */
  static async scriptInvocation(network: any, scripts: any): Promise<any> {
    return await rpc.Query.invokeScript(Neon.create.script(scripts))
      .execute(network.extra.rpcServer);
  }

  /**
   * Initiate a contract invocation
   */
  static async contractInvocation(network: any, api: any, contractHash: any, operation: any, args: any, wif: any, gas: any = 0, fee: any = 0.001): Promise<any> {
    Neon.add.network(network)

    const walletAccount = new wallet.Account(wif);
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
      fees: fee
    };

    return await Neon.doInvoke(invoke);
  }

  /**
   * Parse a neon-js response when expecting a boolean value
   */
  static expectBoolean(response: any): boolean {
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
    }
    return false;
  }
}



























  /**
   * test whether `identityId` exists on-chain
   * @param identityId
   * @returns {Promise<boolean>}
   * @constructor
   */
  IdentityExists: async function (identityId: any) {
    let response = await this.InvokeFunction('identityExists', [identityId]);
    return this.ExpectBoolean(response);
  },
  KeyExistsForIdentity: async function (identityId: any, targetKey: any) {
    let response = await this.InvokeFunction('keyExistsForIdentity', [identityId, targetKey]);
    return this.ExpectBoolean(response);
  },
  AddKeyToIdentity: async function (identityId: any, adminKey: any, targetKey: any, permissionLevel: any, _wif: any) {
    return this.ContractInvocation('addKeyToIdentity', [
      identityId,
      adminKey,
      targetKey,
      permissionLevel
    ], _wif)
  },
  /**
   * @return {number}
   */
  GetKeyPermissionLevel: async function (identityId: any, targetKey: any) {
    let response = await this.InvokeFunction('getKeyPermissionLevel', [identityId, targetKey]);
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value === '' ? 0 : parseInt(this.neon.u.reverseHex(response.result.stack[0].value.toString()), 16);
    }
    return 0;
  },
  SetKeyPermissionLevel: async function (identityId: any, adminKey: any, targetKey: any, permissionLevel: any, _wif: any) {
    return this.ContractInvocation('setKeyPermissionLevel', [
      identityId,
      adminKey,
      targetKey,
      permissionLevel
    ], _wif)
  },
  DeleteKeyFromIdentity: async function (identityId: any, adminKey: any, targetKey: any, _wif: any) {
    return this.ContractInvocation('deleteKeyFromIdentity', [
      identityId,
      adminKey,
      targetKey
    ], _wif)
  },
  DeleteIdentity: async function (identityId: any, adminKey: any, _wif: any) {
    return this.ContractInvocation('deleteIdentity', [
      identityId,
      adminKey
    ], _wif)
  },
  CreateIdentity: async function (identityLabel: any, keys: any, _wif: any) {
    let args = [identityLabel];
    args = args.concat(keys);
    return this.ContractInvocation('createIdentity', args, _wif)
  },
  /**
   * pause execution for `ms`
   * @param ms
   * @returns {Promise<unknown>}
   * @constructor
   */
  Sleep: function (ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  /**
   *
   * @param str
   * @returns {string}
   * @constructor
   */
  HexToAscii: function (str: any) {
    const hex = str.toString();
    let output = '';
    for (let n = 0; n < hex.length; n += 2) {
      output += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return output;
  },
  /**
   * load the contents of an avm
   * @param avmPath
   * @constructor
   * @return {string}
   */
  GetAVM: function (avmPath: any) {
    return fs.readFileSync(avmPath, "hex");
  },
  /**
   * return the scriptHash for a file
   * @returns {string}
   * @constructor
   * @param data
   */
  GetScriptHashForData: function (data: any) {
    return Neon.u.reverseHex(this.neon.u.hash160(data));
  },



  // /**
  //  * invoke a contract method (readonly) and expect a response
  //  * @param fnName
  //  * @param _args
  //  * @returns {*|Promise<any>}
  //  * @constructor
  //  */
  // InvokeFunction: function (fnName: any, _args: any[] = []) {
  //   const invocation = {
  //     scriptHash: this._contract,
  //     operation: fnName,
  //     args: _args
  //   };
  //   return this.ScriptInvocation(invocation);
  // },



  /**
   * get a balance of all unspent assets for address
   * @param address
   * @returns {Promise<{GAS: number, NEO: number}>}
   * @constructor
   */
  GetAssetBalanceSummary: async function (address: any) {
    let coins = await this._api.getBalance(address);
    let balances = {NEO: 0, GAS: 0};
    for (let n in balances) {
      if (coins.assets[n]) {
        coins.assets[n].unspent.forEach(function (val) {
          balances[n] += parseFloat(val.value.toString());
        });
      }
    }
    return balances;
  },
  /**
   * claim gas for account
   * @param _account
   * @returns {never}
   * @constructor
   */
  ClaimGas: function (_account: any) {
    const config = {
      api: this._api,
      account: _account
    };

    return Neon.claimGas(config);
  },
  /**
   * transfer neo or gas to an address
   * @param _accountFrom
   * @param _addressTo
   * @param _neoAmount
   * @param _gasAmount
   * @constructor
   */
  TransferAsset: function (_accountFrom: any, _addressTo: any, _neoAmount: any, _gasAmount: any) {
    let assets = {};

    if (_neoAmount > 0) {
      assets.NEO = _neoAmount;
    }

    if (_gasAmount > 0) {
      assets.GAS = _gasAmount;
    }

    const intent = this.neon.api.makeIntent(assets, _addressTo);
    const config = {
      api: this._api,
      url: this._network.extra.rpcServer,
      account: _accountFrom,
      intents: intent
    };

    return Neon.sendAsset(config);
  },



  // /**
  //  * deploy a contract to the neo network
  //  * @param avmData
  //  * @param _wif
  //  * @returns {never}
  //  * @constructor
  //  */
  // DeployContract: function (avmData: any, _wif: any) {
  //   const n = this.neon.default;
  //   const walletAccount = new this.neon.wallet.Account(_wif);
  //   const sb = n.create.scriptBuilder();

  //   sb.emitPush(n.u.str2hexstring("")) // description
  //     .emitPush(n.u.str2hexstring("")) // email
  //     .emitPush(n.u.str2hexstring("")) // author
  //     .emitPush(n.u.str2hexstring("")) // code_version
  //     .emitPush(n.u.str2hexstring("")) // name
  //     .emitPush(0x03) // storage: {none: 0x00, storage: 0x01, dynamic: 0x02, storage+dynamic:0x03}
  //     .emitPush("05") // expects hexstring  (_emitString) // usually '05'
  //     .emitPush("0710") // expects hexstring  (_emitString) // usually '0710'
  //     .emitPush(avmData) //script
  //     .emitSysCall('Neo.Contract.Create');

  //   const network = {
  //     api: this._api,
  //     url: this._network.extra.rpcServer,
  //     account: walletAccount,
  //     script: sb.str,
  //     fees: 1,
  //     gas: 990
  //   };

  //   return n.doInvoke(network);
  // },



  // /**
  //  * initiate a read-only event to the rpc server
  //  * @param _scripts
  //  * @returns {Promise<any>}
  //  * @constructor
  //  */
  // ScriptInvocation: function (_scripts: any) {
  //   return this.neon.rpc.Query.invokeScript(Neon.create.script(_scripts))
  //     .execute(this._network.extra.rpcServer);
  // },



  // /**
  //  * initiate a contract invocation
  //  * @param _operation
  //  * @param _args
  //  * @param _wif
  //  * @param _gas
  //  * @param _fee
  //  * @returns {never}
  //  * @constructor
  //  */
  // ContractInvocation: function (_operation: any, _args: any, _wif: any, _gas: any = 0, _fee: any = 0.001) {
  //   let walletAccount = new this.neon.wallet.Account(_wif);

  //   const invoke = {
  //     api: this._api,
  //     url: this._network.extra.rpcServer,
  //     script: Neon.create.script({
  //       scriptHash: this._contract,
  //       operation: _operation,
  //       args: _args
  //     }),
  //     account: walletAccount,
  //     gas: _gas,
  //     fees: _fee
  //   };

  //   return Neon.doInvoke(invoke);
  // },



  // /**
  //  * parse a neon-js response when expecting a boolean value
  //  * @param response
  //  * @returns {boolean}
  //  * @constructor
  //  */
  // ExpectBoolean: function (response: any) {
  //   if (response.result.stack.length > 0) {
  //     return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
  //   }
  //   return false;
  // },
};

module.exports = claimsInterface;
