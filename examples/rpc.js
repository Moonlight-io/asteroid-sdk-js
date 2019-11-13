const rpc = require('../dist').rpc

// -- Implementation

;(async () => {
  console.log('== Example - RPC ==')

  const res = rpc.user.greet()
  console.log('res:', res)

  console.log()
  console.log('== THE END ==')
})()
