const SDK = require('../dist')

process.on('unhandledRejection', (reason, p) => {
  console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

// -- Implementation
;(async () => {
  console.log('== Validate Attribute ==')

  const attr = {
    type: 'email',
    payload: {
      email: 'user@moonlight.io',
    },
  }

  try {
    SDK.AttributeValidator.validate(attr)
    console.log('Attribute validation success.')
  } catch (err) {
    console.log('Attribute validation failed.')
    console.log('err.name:', err.name)
    console.log('err.propertyKey:', err.propertyKey)
    console.log('err.message:', err.message)
  }

  console.log()
  console.log('== THE END ==')
})()
