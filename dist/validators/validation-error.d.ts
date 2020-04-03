export declare class ValidationError extends Error {
    propertyKey: string | undefined;
    constructor(propertyKey: string | undefined, message: string | undefined);
}
