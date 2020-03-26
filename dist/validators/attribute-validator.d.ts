import { UserAttribute, AttributeValidationRules, PropertyValidationRules } from '../interfaces';
export declare class AttributeValidator {
    static validatePayload(attr: UserAttribute): void;
    static getRulesByAttributeType(attributeType: string): AttributeValidationRules | undefined;
    static validProperty(propertyKey: string, propertyValue: any, rules: PropertyValidationRules): void;
    private static createError;
}
