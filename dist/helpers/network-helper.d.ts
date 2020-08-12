import { ConnectionNetworkType, NetworkItem } from '../interfaces';
export declare class NetworkHelper {
    static getAsteroidDomainUserBaseUrl(networkType: ConnectionNetworkType): string;
    static getAsteroidDomainWorkerBaseUrl(networkType: ConnectionNetworkType): string;
    static getNeo2Network(networkType: ConnectionNetworkType): NetworkItem;
}
