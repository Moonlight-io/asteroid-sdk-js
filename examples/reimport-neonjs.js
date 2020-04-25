const SDK = require('../dist')

process.on('unhandledRejection', (reason, p) => {
  console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

// -- Implementation
;(async () => {
  console.log('== Example - Re-import of neon-js ==')

  // console.log('SDK:', SDK)
  // console.log('SDK.NeonJs:', SDK.NeonJs)
  console.log('SDK.NeonJs.wallet:', SDK.NeonJs.wallet)

  console.log()
  console.log('== THE END ==')
})()
