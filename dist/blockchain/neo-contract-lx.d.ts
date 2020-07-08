import { DoInvokeConfig } from '@cityofzion/neon-api/lib/funcs/types';
import { Address, NetworkItem, ScriptHash, WIF } from '../interfaces';
export declare class NeoContractLX {
    /**
     * Gets the transferFrom allowance of an address
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The base address to get the allowance against.
     * @param spender  The address who can spend from "address".
     */
    static allowance(network: NetworkItem, lxContractHash: ScriptHash, address: Address, spender: Address): Promise<any>;
    /**
     * Approve an amount to transfer on behalf of an address.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param spender  The address to grant a transfer allowance.
     * @param amount  The number of tokens to grant spender control over.
     * @param wif  The wif of the base account being spent from.
     */
    static approve(network: NetworkItem, lxContractHash: ScriptHash, spender: Address, amount: any, wif: WIF): Promise<any>;
    /**
     * Adds an address to a token sale group.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The address to add.
     * @param group  The group number.
     * @param wif  The contract admin WIF.
     */
    static addAddress(network: NetworkItem, lxContractHash: ScriptHash, address: Address, group: any, wif: WIF): Promise<any>;
    /**
     * Returns the token balance of an address
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The requested address to return the balance of.
     */
    static balanceOf(network: NetworkItem, lxContractHash: ScriptHash, address: Address): Promise<number | undefined>;
    /**
     *  Gets the amount of tokens on an account that are part of a vesting workflow.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The requested address to return the balance of.
     */
    static balanceOfVestedAddress(network: NetworkItem, lxContractHash: ScriptHash, address: Address): Promise<number | undefined>;
    /**
     * Returns the number of decimals used on token amounts.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    static decimals(network: NetworkItem, lxContractHash: ScriptHash): Promise<any>;
    /**
     * Enables Whitelisting of addresses for the transferFrom method.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param value  A value representing whether this feature is enabled or disabled.
     * @param wif  The contract admin wif.
     */
    static enableDEXWhiteListing(network: NetworkItem, lxContractHash: ScriptHash, value: any, wif: WIF): Promise<any>;
    /**
     * Returns the contract's name.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    static contractName(network: NetworkItem, lxContractHash: ScriptHash): Promise<string | undefined>;
    /**
     * Gets the unlock block for a token sale for a specific group.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param targetGroup  The target group.
     */
    static getGroupUnlockBlock(network: NetworkItem, lxContractHash: ScriptHash, targetGroup: any): Promise<number | undefined>;
    /**
     * Gets the token sale group number of an address.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The target address to request information about.
     */
    static getTokenSaleGroupNumber(network: NetworkItem, lxContractHash: ScriptHash, address: Address): Promise<number | undefined>;
    /**
     * Initialized the smart contract.  This is a mandatory step that must occur prior to using the contract for the first time.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param wif  The contract admin WIF.
     */
    static initSmartContract(network: NetworkItem, lxContractHash: ScriptHash, wif: WIF): Promise<any>;
    /**
     * Checks if presale allocations are locked.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    static isPresaleAllocationLocked(network: NetworkItem, lxContractHash: string): Promise<any>;
    /**
     * Mints tokens.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param neoAmount  The amount to mint.
     * @param wif  The contract admin WIF.
     */
    static mintTokens(network: NetworkItem, lxContractHash: ScriptHash, neoAmount: any, wif: WIF): Promise<DoInvokeConfig>;
    /**
     * Sets a group's unlock block to a token sale.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param group  The target group number.
     * @param block  The unlock block height.
     * @param wif  The contract admin wif.
     */
    static setGroupUnlockBlock(network: NetworkItem, lxContractHash: ScriptHash, group: any, block: any, wif: WIF): Promise<any>;
    /**
     * Gets the contract's token symbol.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    static symbol(network: NetworkItem, lxContractHash: string): Promise<string | undefined>;
    /**
     * Gets the token's total supply.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    static totalSupply(network: NetworkItem, lxContractHash: ScriptHash): Promise<number | undefined>;
    /**
     * Transfers tokens between two addresses if the spender has custody of enough tokens.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param toAddress  The address to transfer to.
     * @param amount  The amount of tokens to transfer.
     * @param wif  The token holder's WIF.
     */
    static transfer(network: NetworkItem, lxContractHash: ScriptHash, toAddress: Address, amount: any, wif: WIF): Promise<any>;
    /**
     * Transfers tokens on behalf of another user.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param fromAddress  The address to transfer from.
     * @param toAddress  The address to transfer to.
     * @param amount  The amount to transfer.
     * @param wif  The wif of the user wishing to initiate the transfer.
     */
    static transferFrom(network: NetworkItem, lxContractHash: ScriptHash, fromAddress: Address, toAddress: Address, amount: any, wif: WIF): Promise<any>;
    /**
     * Updates the contract admin.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The new contract admin.
     * @param wif  The contract admin WIF.
     */
    static updateAdminAddress(network: NetworkItem, lxContractHash: ScriptHash, address: Address, wif: WIF): Promise<any>;
    /**
     * Unlocks founder tokens.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The target founder address.
     * @param period  The vesting period to unlock.
     * @param wif  The contract admin wif.
     */
    static unlockFoundersTokens(network: NetworkItem, lxContractHash: ScriptHash, address: Address, period: number, wif: WIF): Promise<any>;
}
