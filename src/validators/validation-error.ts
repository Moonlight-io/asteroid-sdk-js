import { PropertyValidationRules } from '../interfaces'

export class ValidationError extends Error {
  propertyKey: string | undefined
  validationRules: PropertyValidationRules | undefined
  ruleKey: string | undefined

  constructor(propertyKey: string | undefined, message: string | undefined, validationRules?: PropertyValidationRules, ruleKey?: string) {
    super(message)
    this.name = 'ValidationError'
    this.propertyKey = propertyKey
    this.validationRules = validationRules
    this.ruleKey = ruleKey
  }
}
