export declare class NeoContractNameService {
    /**
     * Test whether an address is registered with CNS
     */
    static getAddress(network: any, contractHash: any, domain: string, subDomain: string): Promise<string | null>;
    /**
     * registers a contract to the name service
     * @param network
     * @param {string} contractHash
     * @param {string} name
     * @param {string} address
     * @param wif
     * @returns {Promise<any>}
     */
    static registerDomain(network: any, contractHash: string, domain: string, wif: any): Promise<any>;
    static transferDomain(network: any, contractHash: string, domain: string, target: any, wif: any): Promise<any>;
    static upsertSubDomain(network: any, contractHash: string, domain: string, subDomain: string, address: string, wif: any): Promise<any>;
}
