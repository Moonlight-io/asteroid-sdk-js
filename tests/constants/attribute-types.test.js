const SDK = require('../../dist')

test('Verify attribute types constant', async () => {
  const attributeTypes = SDK.constants.attributeTypes

  expect(Object.keys(attributeTypes).length).toBeGreaterThan(5)
  expect(attributeTypes.title).toEqual('title')
})
