export declare class NeoContractNameService {
    /**
     * Test wehether the contract has been deployed
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static contractVersion(network: any, contractHash: any): Promise<number | null>;
    /**
     * Test whether an address is registered with CNS
     */
    static getAddress(network: any, contractHash: any, name: string): Promise<string | null>;
    /**
     * registers a contract to the name service
     * @param network
     * @param api
     * @param {string} contractHash
     * @param {string} name
     * @param {string} address
     * @param {string} owner
     * @param wif
     * @returns {Promise<any>}
     */
    static registerName(network: any, contractHash: string, name: string, address: string, wif: any): Promise<any>;
    static releaseName(network: any, contractHash: any, name: any, wif: any): Promise<any>;
    static updateAddress(network: any, contractHash: any, name: any, address: any, wif: any): Promise<any>;
}
