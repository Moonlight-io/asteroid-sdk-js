import { AsteroidUserRpc } from './user';
declare const rpc: {
    invoke: (rpcUrl: string, method: string, params: object, id: string, methodVersion: number, config?: import("axios").AxiosRequestConfig | undefined) => Promise<any>;
    user: typeof AsteroidUserRpc;
};
export { rpc };
