"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urls = void 0;
exports.urls = {
    asteroidDomainUser: {
        baseUrl: {
            dev: 'http://localhost:8000',
            docker: 'http://asteroid-domain-user:8000',
            production: 'https://user.asteroid.moonlight.io',
            stage: 'https://stage-user.asteroid.moonlight.io',
        },
    },
    asteroidDomainWorker: {
        baseUrl: {
            dev: 'http://localhost:8001',
            docker: 'http://asteroid-domain-worker:8001',
            production: 'https://worker.asteroid.moonlight.io',
            stage: 'https://stage-worker.asteroid.moonlight.io',
        },
    },
    blockchainNeo2: {
        baseURL: {
            production: {
                name: 'network',
                extra: {
                    neoscan: 'https://p1.neo.blockchain.moonlight.io:4001/api/main_net',
                    rpcServer: 'https://p1.neo.blockchain.moonlight.io:60333',
                },
            },
            stage: {
                name: 'network',
                extra: {
                    neoscan: 'https://privnet.moonlight.io:4001/api/main_net',
                    rpcServer: 'https://privnet.moonlight.io:60333',
                },
            },
        },
    },
};
//# sourceMappingURL=urls.js.map