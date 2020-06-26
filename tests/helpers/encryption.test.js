const crypto = require('crypto')
const sdk = require('../../dist')

test('AES256 Encryption', async () => {
  const iv = Buffer.from('5938ff2c59e08436cfdaa271b7b57c76', 'hex')
  const secret = Buffer.from('mySecret')
  const hash = crypto.createHash('sha512').update(secret).digest()
  const key = hash.slice(0, 32)

  const payload = Buffer.from('my secret payload', 'utf8')

  let cipher = sdk.Encryption.aes256CbcEncrypt(iv, key, payload)
  expect(cipher.toString('hex')).toEqual('5f7ea53616095cba348f43b1fc3437d8093e8602dab3b179dd0581453bbe7bc1')

  const res = sdk.Encryption.aes256CbcDecrypt(Buffer.from(iv, 'hex'), key, cipher)
  expect(res).toEqual(payload)
})
