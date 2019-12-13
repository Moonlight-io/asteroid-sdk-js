export declare class NeoNameService {
    /**
     * Test whether an address is registered with CNS
     */
    static getAddress(network: any, contractHash: any, name: string): Promise<string | null>;
    static registerName(network: any, api: any, contractHash: any, name: any, address: any, owner: any, wif: any): Promise<any>;
    static releaseName(network: any, api: any, contractHash: any, name: any, wif: any): Promise<any>;
    static updateAddress(network: any, api: any, contractHash: any, name: any, address: any, wif: any): Promise<any>;
}
