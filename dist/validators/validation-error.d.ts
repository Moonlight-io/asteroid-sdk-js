import { PropertyValidationRules } from '../interfaces';
export declare class ValidationError extends Error {
    propertyKey: string | undefined;
    validationRules: PropertyValidationRules | undefined;
    ruleKey: string | undefined;
    constructor(propertyKey: string | undefined, message: string | undefined, validationRules?: PropertyValidationRules, ruleKey?: string);
}
