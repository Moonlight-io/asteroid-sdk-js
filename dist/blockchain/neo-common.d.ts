import { ScriptIntent } from '@cityofzion/neon-core/lib/sc';
import { DoInvokeConfig, ClaimGasConfig, SendAssetConfig } from '@cityofzion/neon-api/lib/funcs/types';
import { NetworkItem, ScriptInvocationResponse } from '../interfaces';
export declare class NeoCommon {
    /**
     * Attempt to retrieve the contract name (defined within the contract) that will be used for CNS
     * @returns {Promise<string|boolean>}
     */
    static getContractName(network: NetworkItem, contractHash: string): Promise<string | undefined>;
    static getContractVersion(network: NetworkItem, contractHash: string): Promise<string | undefined>;
    static initSmartContract(network: NetworkItem, contractHash: string, wif: string): Promise<DoInvokeConfig>;
    /**
     * Return the scriptHash for a file
     */
    static getScriptHashForData(data: string): string;
    /**
     * Claim gas for account
     */
    static claimGas(network: NetworkItem, wif: string): Promise<ClaimGasConfig>;
    /**
     * Transfer neo or gas to an address
     */
    static transferAsset(network: NetworkItem, wifFrom: string, addressTo: string, neoAmount: number, gasAmount: number): Promise<SendAssetConfig>;
    /**
     * transfers all an accounts neo to itself, then claims the gas.
     */
    static transferAndClaim(network: NetworkItem, wif: string): Promise<ClaimGasConfig>;
    /**
     * Get a balance of all unspent assets for address
     */
    static getAssetBalanceSummary(network: NetworkItem, address: string): Promise<any>;
    /**
     * Invoke a contract method (readonly) and expect a response
     */
    static invokeFunction(network: NetworkItem, contractHash: string, operation: string, args?: any[]): Promise<ScriptInvocationResponse>;
    /**
     * Deploy a contract to the neo network
     */
    static deployContract(network: NetworkItem, avmData: any, wif: string): Promise<DoInvokeConfig>;
    /**
     * Initiate a read-only event to the rpc server
     */
    static scriptInvocation(network: NetworkItem, scripts: ScriptIntent): Promise<ScriptInvocationResponse>;
    /**
     * Initiate a contract invocation
     */
    static contractInvocation(network: NetworkItem, contractHash: string, operation: string, args: any[], wif: string, gas?: number, fee?: number): Promise<DoInvokeConfig>;
    static contractMigrate(network: NetworkItem, contractHash: string, avmData: any, parameterTypes: string, returnType: string, needStorage: number, name: string, version: string, author: string, email: string, description: string, wif: string): Promise<void>;
    /**
     * Parse a neon-js response when expecting a boolean value
     */
    static expectBoolean(response: ScriptInvocationResponse): boolean;
}
