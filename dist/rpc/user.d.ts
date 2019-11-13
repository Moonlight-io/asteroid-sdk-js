import { RegisterEmailRequest, RegisterEmailResponse } from '../interfaces';
export declare class AsteroidUserRpc {
    static registerEmail(rpcUrl: string, params: RegisterEmailRequest, id?: string, methodVersion?: number): Promise<RegisterEmailResponse>;
}
