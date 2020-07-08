import { Address, NetworkItem, ScriptHash, WIF } from '../interfaces';
import { DoInvokeConfig } from '@cityofzion/neon-api/lib/funcs/types';
export declare class NeoCommon {
    /**
     * Gets the contract name of a moonlight smart contract.
     * @param network  The Neo network target.
     * @param contractHash  The script hash which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    static getContractName(network: NetworkItem, contractHash: ScriptHash): Promise<string | undefined>;
    /**
     * Gets the contract version of a moonlight smart contract.
     * @param network  The Neo network target.
     * @param contractHash  The script hash which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    static getContractVersion(network: NetworkItem, contractHash: ScriptHash): Promise<string | undefined>;
    /**
     * Initializes a smart contract
     * @param network  The Neo network target.
     * @param contractHash  The script hash which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param wif contract admin wif
     */
    static initSmartContract(network: NetworkItem, contractHash: ScriptHash, wif: WIF): Promise<any>;
    static getScriptHashForData(data: string): string;
    /**
     * Claims gas...
     * @param network  The Neo network target.
     * @param wif The wif of the requestor
     */
    static claimGas(network: NetworkItem, wif: WIF): Promise<any>;
    /**
     * Transfers a system asset.
     * @param network  The Neo network target.
     * @param wifFrom The WIF to transfer assets from.
     * @param addressTo The address to transfer the assets to.
     * @param neoAmount The amount of neo the transfer.
     * @param gasAmount The amount of gas to transfer.
     */
    static transferAsset(network: NetworkItem, wifFrom: WIF, addressTo: Address, neoAmount: number, gasAmount: number): Promise<any>;
    /**
     * Transfers all of an accounts neo to itself, then executes a gas claim.
     * @param network The Neo network to target.
     * @param wif The WIF to transfer assets from.
     */
    static transferAndClaim(network: NetworkItem, wif: WIF): Promise<any>;
    /**
     * Gets the balance of all unspent assets of an account.
     * @param network
     * @param address
     */
    static getAssetBalanceSummary(network: NetworkItem, address: Address): Promise<any>;
    /**
     * Invoke a contract method (readonly) and expect a response
     */
    static invokeFunction(network: NetworkItem, contractHash: ScriptHash, operation: string, args?: any[]): Promise<any>;
    /**
     * Deploy a contract to the neo network
     */
    static deployContract(network: NetworkItem, avmData: any, wif: string): Promise<DoInvokeConfig>;
    /**
     * Initiate a read-only event to the rpc server
     */
    static scriptInvocation(network: NetworkItem, scripts: any): Promise<any>;
    /**
     * Initiate a contract invocation
     */
    static contractInvocation(network: NetworkItem, contractHash: string, operation: string, args: any[], wif: string, gas?: number, fee?: number): Promise<DoInvokeConfig>;
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
    static contractMigrate(network: NetworkItem, contractHash: ScriptHash, avmData: any, parameterTypes: string, returnType: string, needStorage: number, name: string, version: string, author: string, email: string, description: string, wif: WIF): Promise<void>;
    /**
     * Parse a neon-js response when expecting a boolean value
     */
    static expectBoolean(response: any): boolean;
    /**
     * An async compliant sleep method.
     * @param milliseconds
     */
    static sleep(milliseconds: number): Promise<void>;
}
