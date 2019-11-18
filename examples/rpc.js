const rpc = require('../dist').rpc
const rest = require('../dist').rest

// -- Implementation

const aduVersion = async () => {
  console.log('aduVersion triggered.')

  const baseUrl = 'https://stage-user.asteroid.moonlight.io'
  const res = await rest.user.getVersion(baseUrl)
  console.log('res:', res)

  console.log()
}

const aduRegisterEmail = async () => {
  console.log('aduRegisterEmail triggered.')

  const rpcUrl = 'https://stage-user.asteroid.moonlight.io/rpc'
  params = {
    email: 'travis+test_123@moonlight.io',
  }
  const res = await rpc.user.registerEmail(rpcUrl, params)
  console.log('res:', res)

  console.log()
}

const adwVersion = async () => {
  console.log('adwVersion triggered.')

  const baseUrl = 'https://stage-worker.asteroid.moonlight.io'
  const res = await rest.user.getVersion(baseUrl)
  console.log('res:', res)

  console.log()
}

;(async () => {
  console.log('== Example - RPC ==')

  // ADU
  await aduVersion()
  await aduRegisterEmail()

  // ADW
  await adwVersion()

  console.log()
  console.log('== THE END ==')
})()
