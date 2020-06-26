const SDK = require('../../dist')

test('Attribute validation with a valid email', () => {
  const attr = {
    type: 'email',
    payload: {
      email: 'user@moonlight.io',
    },
  }
  SDK.AttributeValidator.validate(attr)
})

test('Attribute validation with a valid position', () => {
  const attr = {
    type: 'position',
    payload: {
      issuer_name: 'The AB Group Global',
      role_name: 'Director of Business Development',
      role_type: 'Full time',
      city: 'Sydney',
      country: 'AU',
      month_from: 7,
      year_from: 2017,
      status: 'current',
    },
  }
  SDK.AttributeValidator.validate(attr)
})

test('Attribute validation with invalid date range of a position', () => {
  const attr = {
    type: 'position',
    payload: {
      issuer_name: 'The AB Group Global',
      role_name: 'Director of Business Development',
      role_type: 'Full time',
      city: 'Sydney',
      country: 'AU',
      month_from: 7,
      year_from: 2017,
      month_to: 8,
      year_to: 2016,
    },
  }
  expect(() => {
    SDK.AttributeValidator.validate(attr)
  }).toThrow()
})
