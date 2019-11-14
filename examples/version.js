const AsteroidDomainUser = require('../dist').AsteroidDomainUser

// -- Implementation

;(async () => {
  console.log('== Example - Version ==')

  const adu = new AsteroidDomainUser({
    networkType: 'stage',
    accessToken: 'PLACEHOLDER',
    autoUpdateTokens: false,
  })
  versionRes = await adu.getVersionInfo()
  console.log('versionRes:', versionRes)

  console.log()
  console.log('== THE END ==')
})()
