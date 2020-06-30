const SDK = require('../../dist')

test('Membership attribute allows descriptions', () => {
  const attrType = 'membership'
  const actual = SDK.AttributeContextHelper.isAllowDescriptions(attrType)
  expect(actual).toEqual(true)
})

test('Attribute title of extracurricular', () => {
  const attrType = 'extracurricular'
  const actual = SDK.AttributeContextHelper.getAttributeTitle(attrType)
  expect(actual).toEqual('Interest')
})

test('Property title of position.issuer_name', () => {
  const attrType = 'position'
  const propKey = 'issuer_name'
  const actual = SDK.AttributeContextHelper.getPropertyTitle(attrType, propKey)
  expect(actual).toEqual('Organization')
})
