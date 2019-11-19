declare const constants: {
    urls: {
        asteroidDomainUser: {
            baseUrl: {
                production: string;
                stage: string;
            };
        };
        asteroidDomainWorker: {
            baseUrl: {
                production: string;
                stage: string;
            };
        };
    };
    rpcErrorCodes: {
        ErrorSink: number;
        MethodInDev: number;
        InvalidEmail: number;
        EmailAlreadyRegistered: number;
        InvalidProviderToken: number;
        InvalidCredentials: number;
        MissingPayloadAttr: number;
        InvalidPayloadAttr: number;
        InvalidDynamicToken: number;
        InvalidSessionId: number;
        InvalidJwtToken: number;
        RegistrationDisabled: number;
    };
    rpcDefaults: {
        id: string;
        methodVersion: number;
    };
};
export { constants };
