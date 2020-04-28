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

test('generate a new wif', async () => {
  const derivationPath = "m/44'/888'/0'/0/0"
  const mnemonic = 'online ramp onion faculty trap clerk near rabbit busy gravity prize employ exit horse found slogan effort dash siren buzz sport pig coconut element'
  const keychain = new sdk.Keychain()

  keychain.importMnemonic(mnemonic)
  const key = keychain.generateChildKey('neo', derivationPath)
  expect(key.getWIF()).toEqual('KxGtKtYTsxCW997F762Zn62C2e72gQ9XMPkkL2231Rc4GuvSCuba')
})
