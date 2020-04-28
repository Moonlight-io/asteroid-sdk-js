const sdk = require('../dist')

process.on('unhandledRejection', (reason, p) => {
  console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

// -- Implementation
;(async () => {
  console.log('== Example - Re-import of neon-js ==')

  // console.log('SDK:', SDK)
  // console.log('SDK.NeonJs:', SDK.NeonJs)
  console.log('sdk.NeonJs.wallet:', sdk.NeonJs.wallet)

  console.log()
  console.log('== THE END ==')
})()
