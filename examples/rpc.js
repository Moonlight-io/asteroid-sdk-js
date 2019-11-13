const rpc = require('../dist').rpc

// -- Implementation

;(async () => {
  console.log('== Example - RPC ==')

  const url = 'https://stage-user.asteroid.moonlight.io/rpc'
  const params = {
    email: 'travis+test_123@moonlight.io',
  }

  const res = await rpc.user.registerEmail(url, params)
  console.log('res:', res)

  console.log()
  console.log('== THE END ==')
})()
