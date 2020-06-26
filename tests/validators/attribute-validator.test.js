const SDK = require('../../dist')

test('Attribute validation with a valid email', async () => {
  const attr = {
    type: 'email',
    payload: {
      email: 'user@moonlight.io',
    },
  }
  SDK.AttributeValidator.validate(attr)
})
