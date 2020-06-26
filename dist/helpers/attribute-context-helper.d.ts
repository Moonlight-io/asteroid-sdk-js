import { AttributePropertyItem } from '../interfaces/';
export declare class AttributeContextHelper {
    static getAttributeTitle(attributeType: string): string | undefined;
    static isAllowDescriptions(attributeType: string): boolean | undefined;
    static getPropertyTitle(attributeType: string, propertyKey: string): string | undefined;
    static getPropertyItem(attributeType: string, propertyKey: string): AttributePropertyItem | undefined;
    private static getAttributeContextItem;
    private static getAttributeContexts;
}
