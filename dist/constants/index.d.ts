/// <reference types="node" />
declare const constants: {
    claimEncryptionModes: {
        [key: string]: number;
    };
    urls: {
        asteroidDomainUser: {
            baseUrl: {
                dev: string;
                docker: string;
                production: string;
                stage: string;
            };
        };
        asteroidDomainWorker: {
            baseUrl: {
                dev: string;
                docker: string;
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
        socialLink: string;
        s_oauth: string;
    };
    bip32MasterSeeds: {
        [key: string]: Buffer;
    };
    bip32Purposes: {
        [key: string]: number;
    };
    bip32Coins: {
        [key: string]: number;
    };
    bip32Accounts: {
        [key: string]: number;
    };
    curves: {
        [key: string]: any;
    };
};
export { constants };
