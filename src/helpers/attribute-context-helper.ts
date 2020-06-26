import attributeContexts from '../../data/attribute-contexts.json'
import { AttributeContextItem, AttributeContexts, AttributePropertyItem } from '../interfaces/'

export class AttributeContextHelper {
  static getAttributeTitle(attributeType: string): string | undefined {
    const item = AttributeContextHelper.getAttributeContextItem(attributeType)
    if (!item) {
      return undefined
    }
    return item.title
  }

  static isAllowDescriptions(attributeType: string): boolean | undefined {
    const item = AttributeContextHelper.getAttributeContextItem(attributeType)
    if (!item) {
      return undefined
    }
    return item.allow_descriptions
  }

  static getPropertyTitle(attributeType: string, propertyKey: string): string | undefined {
    const propertyItem = AttributeContextHelper.getPropertyItem(attributeType, propertyKey)
    if (!propertyItem) {
      return undefined
    }
    return propertyItem.title
  }

  static getPropertyItem(attributeType: string, propertyKey: string): AttributePropertyItem | undefined {
    const attributeItem = AttributeContextHelper.getAttributeContextItem(attributeType)
    if (!attributeItem) {
      return undefined
    }
    if (propertyKey in attributeItem.properties) {
      return attributeItem.properties[propertyKey]
    }
    return undefined
  }

  private static getAttributeContextItem(attributeType: string): AttributeContextItem | undefined {
    const ctx = AttributeContextHelper.getAttributeContexts()
    if (attributeType in ctx) {
      return ctx[attributeType]
    }
    return undefined
  }

  private static getAttributeContexts(): AttributeContexts {
    return attributeContexts
  }
}
