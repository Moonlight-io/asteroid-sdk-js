import { isNull, isUndefined, includes } from 'lodash'
import attributesValidationRules from '../../data/attribute-validation-rules.json'
import { UserAttribute, AttributeValidationRules, AttributeValidationItem, PropertyValidationRules, AttributeCoreRules } from '../interfaces'
import { ValidationError } from './validation-error'
import { AttributeContextHelper } from '../helpers'

export class AttributeValidator {
  static validate(attr: UserAttribute) {
    if (!attr.type) {
      throw new Error('Missing attribute type.')
    }
    if (!attr.payload) {
      throw new Error('Missing attribute payload.')
    }

    const attributeValidationItem = AttributeValidator.getAttributeValidationItem(attr.type)
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
      AttributeValidator.validProperty(attr.type, propertyName, propertyValue, propertyRules)
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

  static getAttributeValidationItem(attributeType: string): AttributeValidationItem | undefined {
    const rules = AttributeValidator.getAttributesValidationRules()
    if (attributeType in rules) {
      return rules[attributeType]
    }
    return undefined
  }

  static validProperty(attributeType: string, propertyKey: string, propertyValue: any, rules: PropertyValidationRules) {
    const propertyTitle = AttributeContextHelper.getPropertyTitle(attributeType, propertyKey) || `${propertyKey}`

    // Null checker
    if (isNull(propertyValue) || isUndefined(propertyValue)) {
      if (rules.nullable) {
        return
      } else {
        const msg = `Missing required '${propertyTitle}'.`
        throw AttributeValidator.createError(propertyKey, msg, rules, 'nullable')
      }
    }

    // Type checker
    if (typeof propertyValue !== rules.type_of) {
      const msg = `Invalid data type for '${propertyTitle}'.`
      throw AttributeValidator.createError(propertyKey, msg, rules, 'type_of')
    }

    if (rules.min_length) {
      if ((propertyValue as string).length < rules.min_length) {
        const msg = `'${propertyTitle}' must be longer than ${rules.min_length} characters.`
        throw AttributeValidator.createError(propertyKey, msg, rules, 'min_length')
      }
    }
    if (rules.max_length) {
      if ((propertyValue as string).length > rules.max_length) {
        const msg = `'${propertyTitle}' must be shorter than ${rules.max_length} characters.`
        throw AttributeValidator.createError(propertyKey, msg, rules, 'max_length')
      }
    }
    if (rules.min_number) {
      if ((propertyValue as number) < rules.min_number) {
        const msg = `'${propertyTitle}' must not be less than ${rules.min_number}.`
        throw AttributeValidator.createError(propertyKey, msg, rules, 'min_number')
      }
    }
    if (rules.max_number) {
      if ((propertyValue as number) > rules.max_number) {
        const msg = `'${propertyTitle}' must not be greater than ${rules.max_number}.`
        throw AttributeValidator.createError(propertyKey, msg, rules, 'max_number')
      }
    }
    if (rules.inclusion) {
      if (!includes(rules.inclusion, propertyValue)) {
        const msg = `Value of '${propertyTitle}' is invalid.`
        throw AttributeValidator.createError(propertyKey, msg, rules, 'inclusion')
      }
    }
    if (rules.value_format) {
      const re = new RegExp(rules.value_format)
      if (!propertyValue.match(re)) {
        const msg = `'${propertyTitle}' does not match its required format.`
        throw AttributeValidator.createError(propertyKey, msg, rules, 'value_format')
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

  private static getAttributesValidationRules(): AttributeValidationRules {
    return attributesValidationRules
  }
}
