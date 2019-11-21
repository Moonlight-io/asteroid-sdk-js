export const urls = {
  asteroidDomainUser: {
    baseUrl: {
      dev: 'http://localhost:8000/rpc',
      production: 'https://user.asteroid.moonlight.io',
      stage: 'https://stage-user.asteroid.moonlight.io',
    },
  },
  asteroidDomainWorker: {
    baseUrl: {
      dev: 'http://localhost:8001/rpc',
      production: 'https://worker.asteroid.moonlight.io',
      stage: 'https://stage-worker.asteroid.moonlight.io',
    },
  },
}
