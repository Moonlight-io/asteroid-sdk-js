export declare class NeoContractLX {
    static allowance(network: any, contractHash: any, address: any, spender: any): Promise<any>;
    static approve(network: any, contractHash: any, spender: any, amount: any, wif: any): Promise<any>;
    static addAddress(network: any, contractHash: any, address: any, group: any, wif: any): Promise<any>;
    static balanceOf(network: any, contractHash: any, address: any): Promise<any>;
    static balanceOfVestedAddress(network: any, contractHash: any, address: any): Promise<any>;
    static decimals(network: any, contractHash: any): Promise<any>;
    static enableDEXWhiteListing(network: any, contractHash: any, value: any, wif: any): Promise<any>;
    static contractName(network: any, contractHash: any): Promise<any>;
    static getGroupUnlockBlock(network: any, contractHash: any, targetGroup: any): Promise<any>;
    static getTokenSaleGroupNumber(network: any, contractHash: any, targetAddress: any): Promise<any>;
    static initSmartContract(network: any, contractHash: any, wif: any): Promise<any>;
    static isPresaleAllocationLocked(network: any, contractHash: any): Promise<any>;
    static setGroupUnlockBlock(network: any, contractHash: any, group: any, block: any, wif: any): Promise<any>;
    static symbol(network: any, contractHash: any): Promise<any>;
    static totalSupply(network: any, contractHash: any): Promise<any>;
    static transfer(network: any, contractHash: any, to: any, amount: any, wif: any): Promise<any>;
    static transferFrom(network: any, contractHash: any, from: any, to: any, amount: any, wif: any): Promise<any>;
    static updateAdminAddress(network: any, contractHash: any, address: any, wif: any): Promise<any>;
}
