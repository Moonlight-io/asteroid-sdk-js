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
      email: 'foo@bar.com',
    },
  }

  try {
    SDK.AttributeValidator.validatePayload(attr)
    console.log('Attribute validation success.')
  } catch (err) {
    console.log('Attribute validation failed. message =>')
    console.log(err.message)
  }

  console.log()
  console.log('== THE END ==')
})()
