const SDK = require('../../dist')

process.on('unhandledRejection', (reason, p) => {
  console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

// -- Implementation
;(async () => {
  console.log('== Example - Change User Group ==')

  const email = 'worker@moonlight.io'
  const password = 'password'
  const secret = 'RUSdRxQtPmGXdRpivAUQWFHFZVh48T5O'

  const asteroid = new SDK.Asteroid({ networkType: 'stage' })
  const dynamicToken = await asteroid.registerEmailWithSecret(email, secret)
  console.log('dynamicToken:', dynamicToken)
  await asteroid.updatePassword(password, dynamicToken, 'NewAccount')
  console.log('Update password complete.')

  const user = await asteroid.loginEmail(email, password)
  console.log('access token:', user.currentAccessToken)

  const privRes = await user.setUserGroupByEmail(email, 'worker', secret)
  console.log('privRes', privRes)

  console.log()
  console.log('== THE END ==')
})()
