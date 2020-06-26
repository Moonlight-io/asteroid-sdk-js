import { UserAttribute, AttributeValidationItem, PropertyValidationRules, AttributeValidationRules } from '../interfaces';
export declare class AttributeValidator {
    static validate(attr: UserAttribute): void;
    static validateAttributeCore(attr: UserAttribute, attributesValidationRules: AttributeValidationRules): void;
    static getRulesByAttributeType(attributeType: string): AttributeValidationItem | undefined;
    static validProperty(propertyKey: string, propertyValue: any, rules: PropertyValidationRules): void;
    private static createError;
}
