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
    attributeTypes: {
        email: string;
        address: string;
        preferences: string;
        name: string;
        telephone: string;
        auth: string;
        statement: string;
        overview: string;
        avatar: string;
        position: string;
        description: string;
        skill: string;
        academic: string;
        accomplishment: string;
        membership: string;
        extracurricular: string;
        alias: string;
        title: string;
    };
};
export { constants };
