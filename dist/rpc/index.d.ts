import { AsteroidUserRpc } from './user';
declare const rpc: {
    invoke: (rpcUrl: string, method: string, params: object, id: string, methodVersion: number, onUploadProgress?: any) => Promise<any>;
    user: typeof AsteroidUserRpc;
};
export { rpc };
