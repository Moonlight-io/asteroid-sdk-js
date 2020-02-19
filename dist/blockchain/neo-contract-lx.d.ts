import { NetworkItem } from '../interfaces';
export declare class NeoContractLX {
    static allowance(network: NetworkItem, contractHash: string, address: string, spender: any): Promise<any>;
    static approve(network: NetworkItem, contractHash: string, spender: any, amount: any, wif: string): Promise<any>;
    static addAddress(network: NetworkItem, contractHash: string, address: string, group: any, wif: string): Promise<any>;
    static balanceOf(network: NetworkItem, contractHash: string, address: string): Promise<number | null>;
    static balanceOfVestedAddress(network: NetworkItem, contractHash: string, address: string): Promise<number | null>;
    static decimals(network: NetworkItem, contractHash: string): Promise<any>;
    static enableDEXWhiteListing(network: NetworkItem, contractHash: string, value: any, wif: string): Promise<any>;
    static contractName(network: NetworkItem, contractHash: string): Promise<string | null>;
    static getGroupUnlockBlock(network: NetworkItem, contractHash: string, targetGroup: any): Promise<number | null>;
    static getTokenSaleGroupNumber(network: NetworkItem, contractHash: string, address: string): Promise<number | null>;
    static initSmartContract(network: NetworkItem, contractHash: string, wif: string): Promise<any>;
    static isPresaleAllocationLocked(network: NetworkItem, contractHash: string): Promise<any>;
    static mintTokens(network: NetworkItem, contractHash: string, neoAmount: any, wif: string): Promise<any>;
    static setGroupUnlockBlock(network: NetworkItem, contractHash: string, group: any, block: any, wif: string): Promise<any>;
    static symbol(network: NetworkItem, contractHash: string): Promise<string | null>;
    static totalSupply(network: NetworkItem, contractHash: string): Promise<number | null>;
    static transfer(network: NetworkItem, contractHash: string, toAddress: string, amount: any, wif: string): Promise<any>;
    static transferFrom(network: NetworkItem, contractHash: string, fromAddress: string, toAddress: string, amount: any, wif: string): Promise<any>;
    static updateAdminAddress(network: NetworkItem, contractHash: string, address: string, wif: string): Promise<any>;
}
