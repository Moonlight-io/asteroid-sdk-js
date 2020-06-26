import { UserAttribute, AttributeValidationItem, PropertyValidationRules, AttributeCoreRules } from '../interfaces';
export declare class AttributeValidator {
    static validate(attr: UserAttribute): void;
    static validateCoreRules(attr: UserAttribute, attributesCoreRules: AttributeCoreRules): void;
    static getRulesByAttributeType(attributeType: string): AttributeValidationItem | undefined;
    static validProperty(propertyKey: string, propertyValue: any, rules: PropertyValidationRules): void;
    private static createError;
    private static validateDateRangeOrder;
}
