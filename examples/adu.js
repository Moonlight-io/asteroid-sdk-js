const AsteroidDomainUser = require('../dist').AsteroidDomainUser

// -- Implementation

;(async () => {
  console.log('== Example - AsteroidDomainUser ==')

  const adu = new AsteroidDomainUser()
  res = await adu.registerEmail('travis+test_qwerty@moonlight.io')
  console.log(res)

  console.log()
  console.log('== THE END ==')
})()
