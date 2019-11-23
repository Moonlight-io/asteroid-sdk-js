const SDK = require('../dist')

process.on('unhandledRejection', (reason, p) => {
  console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

// -- Implementation
;(async () => {
  console.log('== Example - Ping ==')

  const email = 'tyler@moonlight.io'
  const password = 'password'
  const secret = 'RUSdRxQtPmGXdRpivAUQWFHFZVh48T5O'
  const ast = new SDK.Asteroid({ networkType: 'stage' })

  const dynamicToken = await ast.registerEmailWithSecret(email, secret)
  console.log('dynamicToken:', dynamicToken)
  await ast.updatePassword(password, dynamicToken, 'NewAccount')
  console.log('Update password complete.')

  const user = await ast.loginEmail(email, password)
  console.log('user', user)

  const profileId = await user.createProfile('new-profile')
  console.log('profileId', profileId)

  console.log()
  console.log('== THE END ==')
})()
