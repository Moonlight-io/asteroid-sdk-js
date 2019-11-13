const Asteroid = require('../dist').Asteroid

// -- Implementation

;(async () => {
  console.log('== Example - Version ==')

  const api = new Asteroid()
  res = await api.getAsteroidUserVersion()
  console.log('version:', res)

  console.log()
  console.log('== THE END ==')
})()
