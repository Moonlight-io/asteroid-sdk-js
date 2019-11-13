declare const invoke: (rpcUrl: string, method: string, params: object, id: string, methodVersion: number, onUploadProgress?: any) => Promise<any>;
export { invoke };
