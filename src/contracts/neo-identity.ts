let neon = require('@cityofzion/neon-js');
const fs = require("fs");

const claimsInterface = {
  neon: neon,
  _network: null,
  _contract: null,
  _api: null,
  accounts: {},
  SetNetwork: function (_targetNetwork) {
    this._network = _targetNetwork;
    this.neon.default.add.network(this._network);
    return this;
  },
  SetContractScriptHash: function (_targetContract) {
    this._contract = _targetContract;
    return this;
  },
  SetAPIProvider: function () {
    this._api = new neon.api.neoscan.instance(this._network.name);
    return this;
  },
  Setup: function (_network, _contract) {
    this.SetNetwork(_network)
      .SetContractScriptHash(_contract)
      .SetAPIProvider();

    return this;
  },
  /**
   * have the identity contract do a dynamic invoke to the CNS registering itself
   * @param owner
   * @param _wif
   * @returns {Promise<void>}
   * @constructor
   */
  CNSRegister: async function (owner, _wif) {
    await this.ContractInvocation('registerContractName', [
      this.neon.u.reverseHex(process.env.CONTRACT_NAME_SERVICE),
      owner
    ], _wif);
  },
  /**
   * have the identity contract do a dynamic invoke to the CNS updating its scriptHash
   * @param _wif
   * @returns {Promise<void>}
   * @constructor
   */
  CNSUpdate: async function (_wif) {
    await this.ContractInvocation('updateContractAddress', [
      this.neon.u.reverseHex(process.env.CONTRACT_NAME_SERVICE)
    ], _wif);
  },
  /**
   * test whether an address is registered with CNS
   * @returns {Promise<boolean>}
   * @constructor
   */
  CNSIntegration: async function (owner, _wif) {
    // get contract name from deployed contract
    const contractName = await this.ContractName();

    const invocation = {
      scriptHash: process.env.CONTRACT_NAME_SERVICE,
      operation: 'GetAddress',
      args: [this.neon.u.str2hexstring(contractName)]
    };
    // test if address exists on CNS
    let response = await this.ScriptInvocation(invocation);

    if (response.result.stack.length > 0 && response.result.stack[0].value !== '') {
      let currentAddress = this.neon.u.reverseHex(response.result.stack[0].value.toString());
      if (currentAddress !== process.env.DEFAULT_CONTRACT) {
        // contract address has changed, update it
        await this.CNSUpdate(_wif);
      }
    } else {
      // address doesn't exist, register it
      await this.CNSRegister(owner, _wif);
    }
    return false;
  },
  /**
   * attempt to retrieve the contract name (defined within the contract) that will be used for CNS
   * @returns {Promise<string|boolean>}
   * @constructor
   */
  ContractName: async function () {
    let response = await this.InvokeFunction('getContractName', []);

    if (response.result.stack.length > 0) {
      return this.neon.u.hexstring2str(response.result.stack[0].value.toString());
    }
    return false;
  },
  /**
   * test whether `identityId` exists on-chain
   * @param identityId
   * @returns {Promise<boolean>}
   * @constructor
   */
  IdentityExists: async function (identityId) {
    let response = await this.InvokeFunction('identityExists', [identityId]);
    return this.ExpectBoolean(response);
  },
  KeyExistsForIdentity: async function (identityId, targetKey) {
    let response = await this.InvokeFunction('keyExistsForIdentity', [identityId, targetKey]);
    return this.ExpectBoolean(response);
  },
  AddKeyToIdentity: async function (identityId, adminKey, targetKey, permissionLevel, _wif) {
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
  GetKeyPermissionLevel: async function (identityId, targetKey) {
    let response = await this.InvokeFunction('getKeyPermissionLevel', [identityId, targetKey]);
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value === '' ? 0 : parseInt(this.neon.u.reverseHex(response.result.stack[0].value.toString()), 16);
    }
    return 0;
  },
  SetKeyPermissionLevel: async function (identityId, adminKey, targetKey, permissionLevel, _wif) {
    return this.ContractInvocation('setKeyPermissionLevel', [
      identityId,
      adminKey,
      targetKey,
      permissionLevel
    ], _wif)
  },
  DeleteKeyFromIdentity: async function (identityId, adminKey, targetKey, _wif) {
    return this.ContractInvocation('deleteKeyFromIdentity', [
      identityId,
      adminKey,
      targetKey
    ], _wif)
  },
  DeleteIdentity: async function (identityId, adminKey, _wif) {
    return this.ContractInvocation('deleteIdentity', [
      identityId,
      adminKey
    ], _wif)
  },
  CreateIdentity: async function (identityLabel, keys, _wif) {
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
  Sleep: function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  /**
   *
   * @param str
   * @returns {string}
   * @constructor
   */
  HexToAscii: function (str) {
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
  GetAVM: function (avmPath) {
    return fs.readFileSync(avmPath, "hex");
  },
  /**
   * return the scriptHash for a file
   * @returns {string}
   * @constructor
   * @param data
   */
  GetScriptHashForData: function (data) {
    return this.neon.default.u.reverseHex(this.neon.u.hash160(data));
  },
  /**
   * invoke a contract method (readonly) and expect a response
   * @param fnName
   * @param _args
   * @returns {*|Promise<any>}
   * @constructor
   */
  InvokeFunction: function (fnName, _args = []) {
    const invocation = {
      scriptHash: this._contract,
      operation: fnName,
      args: _args
    };
    return this.ScriptInvocation(invocation);
  },
  /**
   * get a balance of all unspent assets for address
   * @param address
   * @returns {Promise<{GAS: number, NEO: number}>}
   * @constructor
   */
  GetAssetBalanceSummary: async function (address) {
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
  ClaimGas: function (_account) {
    const config = {
      api: this._api,
      account: _account
    };

    return this.neon.default.claimGas(config);
  },
  /**
   * transfer neo or gas to an address
   * @param _accountFrom
   * @param _addressTo
   * @param _neoAmount
   * @param _gasAmount
   * @constructor
   */
  TransferAsset: function (_accountFrom, _addressTo, _neoAmount, _gasAmount) {
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

    return this.neon.default.sendAsset(config);
  },
  /**
   * deploy a contract to the neo network
   * @param avmData
   * @param _wif
   * @returns {never}
   * @constructor
   */
  DeployContract: function (avmData, _wif) {
    const n = this.neon.default;
    const walletAccount = new this.neon.wallet.Account(_wif);
    const sb = n.create.scriptBuilder();

    sb.emitPush(n.u.str2hexstring("")) // description
      .emitPush(n.u.str2hexstring("")) // email
      .emitPush(n.u.str2hexstring("")) // author
      .emitPush(n.u.str2hexstring("")) // code_version
      .emitPush(n.u.str2hexstring("")) // name
      .emitPush(0x03) // storage: {none: 0x00, storage: 0x01, dynamic: 0x02, storage+dynamic:0x03}
      .emitPush("05") // expects hexstring  (_emitString) // usually '05'
      .emitPush("0710") // expects hexstring  (_emitString) // usually '0710'
      .emitPush(avmData) //script
      .emitSysCall('Neo.Contract.Create');

    const network = {
      api: this._api,
      url: this._network.extra.rpcServer,
      account: walletAccount,
      script: sb.str,
      fees: 1,
      gas: 990
    };

    return n.doInvoke(network);
  },
  /**
   * initiate a read-only event to the rpc server
   * @param _scripts
   * @returns {Promise<any>}
   * @constructor
   */
  ScriptInvocation: function (_scripts) {
    return this.neon.rpc.Query.invokeScript(this.neon.default.create.script(_scripts))
      .execute(this._network.extra.rpcServer);
  },
  /**
   * initiate a contract invocation
   * @param _operation
   * @param _args
   * @param _wif
   * @param _gas
   * @param _fee
   * @returns {never}
   * @constructor
   */
  ContractInvocation: function (_operation, _args, _wif, _gas = 0, _fee = 0.001) {
    let walletAccount = new this.neon.wallet.Account(_wif);

    const invoke = {
      api: this._api,
      url: this._network.extra.rpcServer,
      script: this.neon.default.create.script({
        scriptHash: this._contract,
        operation: _operation,
        args: _args
      }),
      account: walletAccount,
      gas: _gas,
      fees: _fee
    };

    return this.neon.default.doInvoke(invoke);
  },
  /**
   * parse a neon-js response when expecting a boolean value
   * @param response
   * @returns {boolean}
   * @constructor
   */
  ExpectBoolean: function (response) {
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
    }
    return false;
  },
};

module.exports = claimsInterface;