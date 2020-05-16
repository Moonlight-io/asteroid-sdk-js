const sdk = require('../../dist')

test('generate seeds effectively', async () => {
  const mnemonic = 'online ramp onion faculty trap clerk near rabbit busy gravity prize employ exit horse found slogan effort dash siren buzz sport pig coconut element'
  const keychain = new sdk.Keychain()

  keychain.importMnemonic(mnemonic)
  expect(keychain.seed.toString('hex')).toEqual('7c90a69bf5b7cfd6b47401b3577f3f1f3450d44292c6fb1d9589ea09f2ed713208b754c28e14abdb9420eb34559370ec4dccfc50d332da8c8e992ffb950c568e')

  let seed = keychain.generateSeed('test a')
  expect(seed.toString('hex')).toEqual('8407be26c2874e5ac156580c7e82a3eebc47f1cac041996b4a4c6228ee63ea4edf3fab26e304f4edbbf977da8b26932381518b8f1ac5d0fa1af78cb880c0a3cb')

  seed = keychain.generateSeed('a different secret')
  expect(seed.toString('hex')).toEqual('28fdeb8e03aa9869d272f97719f18cb5411688c384ba0b93594581988b8ecb288ba8862e05979f384de6ee4a8471d507a9d16fc79acb7bc65d5cd9fe14aeed26')
})

test('test seed import', async () => {
  let mnemonic = 'glass play danger heavy valve resist joy peanut silly across into pull empty push crawl unhappy rookie awake squirrel beauty aspect lounge thumb state'
  let seed = '5d4bc0d74112307002a5d0c81e3748a5842d4f9efeef86597c2355bd3cd56b7ff029430ad2a730f9f0e587c023377e7615ffcb00fd86a6254f5d058f45609d10'
  let profileID = 'PUDot-9ojW-IK3b'

  //this keychain uses a mnemonic derivation
  const keychain = new sdk.Keychain()
  keychain.importMnemonic(mnemonic)
  keychain.generateSeed(profileID)
  expect(seed).toEqual(keychain.seed.toString('hex'))

  //this keychain uses a seed derivation
  const keychain2 = new sdk.Keychain()
  keychain2.importSeed(seed)
  expect(keychain2.seed.toString('hex')).toEqual(keychain.seed.toString('hex'))

  let key = keychain.generateChildKey('neo', "m/44'/888'/0'/0/0")
  let key2 = keychain2.generateChildKey('neo', "m/44'/888'/0'/0/0")
  expect(key.getWIF()).toEqual(key2.getWIF())
})
