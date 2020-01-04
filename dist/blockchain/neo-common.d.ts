export declare class NeoCommon {
    /**
     * Attempt to retrieve the contract name (defined within the contract) that will be used for CNS
     * @returns {Promise<string|boolean>}
     */
    static contractName(network: any, contractHash: any): Promise<string | boolean>;
    /**
     * Return the scriptHash for a file
     */
    static getScriptHashForData(data: string): string;
    /**
     * Claim gas for account
     */
    static claimGas(_api: any, account: any): Promise<any>;
    /**
     * Transfer neo or gas to an address
     */
    static transferAsset(network: any, _api: any, accountFrom: any, addressTo: any, neoAmount: any, gasAmount: any): Promise<import("@cityofzion/neon-api/lib/funcs/types").SendAssetConfig>;
    /**
     * Get a balance of all unspent assets for address
     */
    static getAssetBalanceSummary(_api: any, address: any): Promise<any>;
    /**
     * Invoke a contract method (readonly) and expect a response
     */
    static invokeFunction(network: any, contractHash: any, operation: any, args?: any[]): Promise<any>;
    /**
     * Deploy a contract to the neo network
     */
    static deployContract(network: any, avmData: any, _wif: any): Promise<any>;
    /**
     * Initiate a read-only event to the rpc server
     */
    static scriptInvocation(network: any, scripts: any): Promise<any>;
    /**
     * Initiate a contract invocation
     */
    static contractInvocation(network: any, contractHash: any, operation: any, args: any, wif: any, gas?: any, fee?: any): Promise<any>;
    /**
     * Parse a neon-js response when expecting a boolean value
     */
    static expectBoolean(response: any): boolean;
}
