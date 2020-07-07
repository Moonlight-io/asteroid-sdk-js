import { DoInvokeConfig } from '@cityofzion/neon-api/lib/funcs/types';
import { NetworkItem, ScriptInvocationResponse } from '../interfaces';
export declare class NeoContractLX {
    static allowance(network: NetworkItem, contractHash: string, address: string, spender: string): Promise<number | undefined>;
    static approve(network: NetworkItem, contractHash: string, spender: string, amount: any, wif: string): Promise<DoInvokeConfig>;
    static addAddress(network: NetworkItem, contractHash: string, address: string, group: any, wif: string): Promise<DoInvokeConfig>;
    static balanceOf(network: NetworkItem, contractHash: string, address: string): Promise<number | undefined>;
    static balanceOfVestedAddress(network: NetworkItem, contractHash: string, address: string): Promise<number | undefined>;
    static decimals(network: NetworkItem, contractHash: string): Promise<any | undefined>;
    static enableDEXWhiteListing(network: NetworkItem, contractHash: string, value: any, wif: string): Promise<DoInvokeConfig>;
    static contractName(network: NetworkItem, contractHash: string): Promise<string | undefined>;
    static getGroupUnlockBlock(network: NetworkItem, contractHash: string, targetGroup: any): Promise<number | undefined>;
    static getTokenSaleGroupNumber(network: NetworkItem, contractHash: string, address: string): Promise<number | undefined>;
    static initSmartContract(network: NetworkItem, contractHash: string, wif: string): Promise<DoInvokeConfig>;
    static isPresaleAllocationLocked(network: NetworkItem, contractHash: string): Promise<ScriptInvocationResponse>;
    static mintTokens(network: NetworkItem, contractHash: string, neoAmount: any, wif: string): Promise<DoInvokeConfig>;
    static setGroupUnlockBlock(network: NetworkItem, contractHash: string, group: any, block: any, wif: string): Promise<DoInvokeConfig>;
    static symbol(network: NetworkItem, contractHash: string): Promise<string | undefined>;
    static totalSupply(network: NetworkItem, contractHash: string): Promise<number | undefined>;
    static transfer(network: NetworkItem, contractHash: string, toAddress: string, amount: any, wif: string): Promise<DoInvokeConfig>;
    static transferFrom(network: NetworkItem, contractHash: string, fromAddress: string, toAddress: string, amount: any, wif: string): Promise<DoInvokeConfig>;
    static updateAdminAddress(network: NetworkItem, contractHash: string, address: string, wif: string): Promise<DoInvokeConfig>;
    static unlockFoundersTokens(network: NetworkItem, contractHash: string, address: string, period: number, wif: string): Promise<DoInvokeConfig>;
}
