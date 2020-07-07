import { NetworkItem } from '../interfaces';
export declare class NeoContractNameService {
    /**
     * Test whether an address is registered with CNS
     */
    static getAddress(network: NetworkItem, contractHash: string, domain: string, subDomain: string): Promise<string | undefined>;
    /**
     * registers a contract to the name service
     */
    static registerDomain(network: NetworkItem, contractHash: string, domain: string, wif: string): Promise<boolean | undefined>;
    static transferDomain(network: NetworkItem, contractHash: string, domain: string, target: any, wif: string): Promise<boolean | undefined>;
    static upsertSubDomain(network: NetworkItem, contractHash: string, domain: string, subDomain: string, address: string, wif: string): Promise<boolean | undefined>;
}
