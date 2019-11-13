const Asteroid = require('../dist').Asteroid

// -- Implementation

;(async () => {
  console.log('== Example - Greet ==')

  const api = new Asteroid()
  res = api.greet()
  console.log(res)

  console.log()
  console.log('== THE END ==')
})()
