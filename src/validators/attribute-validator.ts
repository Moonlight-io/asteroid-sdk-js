import { isNull, isUndefined, includes } from 'lodash'
import attributesValidationRules from '../../data/attribute-validation-rules.json'
import { UserAttribute, AttributeValidationItem, PropertyValidationRules, AttributeCoreRules } from '../interfaces'
import { ValidationError } from './validation-error'

export class AttributeValidator {
  static validate(attr: UserAttribute) {
    if (!attr.type) {
      throw new Error('Missing attribute type.')
    }
    if (!attr.payload) {
      throw new Error('Missing attribute payload.')
    }

    const attributeValidationItem = AttributeValidator.getRulesByAttributeType(attr.type)
    if (!attributeValidationItem) {
      /**
       * Validation logic completes without error when
       * no attribute validation rules found.
       */
      return
    }

    // Validate attribute core rules
    AttributeValidator.validateCoreRules(attr, attributeValidationItem.rules)

    // Validating properties
    const propertyNames = Object.keys(attributeValidationItem.properties)
    for (const propertyName of propertyNames) {
      const propertyValue = (attr.payload as any)[propertyName]
      const propertyRules = attributeValidationItem.properties[propertyName]
      AttributeValidator.validProperty(propertyName, propertyValue, propertyRules)
    }
  }

  static validateCoreRules(attr: UserAttribute, attributesCoreRules: AttributeCoreRules) {
    if (attributesCoreRules.date_range_order) {
      const fromYear = (attr.payload as any)?.year_from
      const fromMonth = (attr.payload as any)?.month_from
      const toYear = (attr.payload as any)?.year_to
      const toMonth = (attr.payload as any)?.month_to
      const status = (attr.payload as any)?.status

      this.validateDateRangeOrder(fromYear, fromMonth, toYear, toMonth, status)
    }
  }

  static getRulesByAttributeType(attributeType: string): AttributeValidationItem | undefined {
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
        throw AttributeValidator.createError(propertyKey, `Missing required property [${propertyKey}].`, rules, 'nullable')
      }
    }

    // Type checker
    if (typeof propertyValue !== rules.type_of) {
      throw AttributeValidator.createError(propertyKey, `Invalid data type for property [${propertyKey}].`, rules, 'type_of')
    }

    if (rules.min_length) {
      if ((propertyValue as string).length < rules.min_length) {
        throw AttributeValidator.createError(propertyKey, `[${propertyKey}] must be longer than ${rules.min_length} characters.`, rules, 'min_length')
      }
    }
    if (rules.max_length) {
      if ((propertyValue as string).length > rules.max_length) {
        throw AttributeValidator.createError(propertyKey, `[${propertyKey}] must be shorter than ${rules.max_length} characters.`, rules, 'max_length')
      }
    }
    if (rules.min_number) {
      if ((propertyValue as number) < rules.min_number) {
        throw AttributeValidator.createError(propertyKey, `[${propertyKey}] must not be less than ${rules.min_number}.`, rules, 'min_number')
      }
    }
    if (rules.max_number) {
      if ((propertyValue as number) > rules.max_number) {
        throw AttributeValidator.createError(propertyKey, `[${propertyKey}] must not be greater than ${rules.max_number}.`, rules, 'max_number')
      }
    }
    if (rules.inclusion) {
      if (!includes(rules.inclusion, propertyValue)) {
        throw AttributeValidator.createError(propertyKey, `[${propertyKey}] does not contain a valid value.`, rules, 'inclusion')
      }
    }
    if (rules.value_format) {
      const re = new RegExp(rules.value_format)
      if (!propertyValue.match(re)) {
        throw AttributeValidator.createError(propertyKey, `[${propertyKey}] does not match required format.`, rules, 'value_format')
      }
    }
  }

  private static createError(propertyKey: string | undefined, message: string | undefined, validationRules?: PropertyValidationRules, ruleKey?: string): Error {
    return new ValidationError(propertyKey, message, validationRules, ruleKey)
  }

  private static validateDateRangeOrder(fromYear?: number, fromMonth?: number, toYear?: number, toMonth?: number, status?: string) {
    if (!fromYear) {
      return
    }
    if (status === 'current') {
      return
    }
    if (!!toYear && fromYear > toYear) {
      throw AttributeValidator.createError(undefined, `'From Date' cannot be greater than 'To Date'.`, undefined, 'date_range_order')
    }
    if (fromYear === toYear) {
      if (!!fromMonth && !!toMonth && fromMonth > toMonth) {
        throw AttributeValidator.createError(undefined, `'From Date' cannot be greater than 'To Date'.`, undefined, 'date_range_order')
      }
    }
  }
}
