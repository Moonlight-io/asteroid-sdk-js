import { isNull, isUndefined } from 'lodash'
import attributesValidationRules from '../../data/attribute-validation-rules.json'
import { UserAttribute, AttributeValidationRules, PropertyValidationRules } from '../interfaces'

export class AttributeValidator {
  static validatePayload(attr: UserAttribute) {
    if (!attr.type) {
      throw new Error('Missing attribute type.')
    }
    if (!attr.payload) {
      throw new Error('Missing attribute payload.')
    }

    const attributeRules = AttributeValidator.getRulesByAttributeType(attr.type)
    if (!attributeRules) {
      /**
       * Validation logic completes without error when
       * no attribute validation rules found.
       */
      return
    }

    const propertyNames = Object.keys(attributeRules)
    for (const propertyName of propertyNames) {
      const propertyValue = (attr.payload as any)[propertyName]
      const propertyRules = attributeRules[propertyName]
      AttributeValidator.validProperty(propertyName, propertyValue, propertyRules)
    }
  }

  static getRulesByAttributeType(attributeType: string): AttributeValidationRules | undefined {
    if (attributeType in attributesValidationRules) {
      return attributesValidationRules[attributeType]
    }
    return undefined
  }

  static validProperty(propertyKey: string, propertyValue: any, rules: PropertyValidationRules) {
    // Null checker
    if (isNull(propertyValue) || isUndefined(propertyValue)) {
      if (rules.nullable) {
        return
      } else {
        throw new Error(`Missing required property [${propertyKey}].`)
      }
    }

    // Type checker
    if (typeof propertyValue !== rules.type_of) {
      throw new Error(`Invalid data type for property [${propertyKey}].`)
    }

    if (rules.min_length) {
      if ((propertyValue as string).length < rules.min_length) {
        throw new Error(`[${propertyKey}] must be longer than ${rules.max_length} characters.`)
      }
    }
    if (rules.max_length) {
      if ((propertyValue as string).length > rules.max_length) {
        throw new Error(`[${propertyKey}] must be shorter than ${rules.max_length} characters.`)
      }
    }
    if (rules.min_number) {
      if ((propertyValue as number) < rules.min_number) {
        throw new Error(`[${propertyKey}] must not be less than ${rules.min_number}.`)
      }
    }
    if (rules.max_number) {
      if ((propertyValue as number) < rules.max_number) {
        throw new Error(`[${propertyKey}] must not be greater than ${rules.max_number}.`)
      }
    }
  }
}
