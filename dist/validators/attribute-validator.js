"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValidator = void 0;
var lodash_1 = require("lodash");
var attribute_validation_rules_json_1 = __importDefault(require("../../data/attribute-validation-rules.json"));
var validation_error_1 = require("./validation-error");
var AttributeValidator = /** @class */ (function () {
    function AttributeValidator() {
    }
    AttributeValidator.validate = function (attr) {
        if (!attr.type) {
            throw new Error('Missing attribute type.');
        }
        if (!attr.payload) {
            throw new Error('Missing attribute payload.');
        }
        var attributeValidationItem = AttributeValidator.getRulesByAttributeType(attr.type);
        if (!attributeValidationItem) {
            /**
             * Validation logic completes without error when
             * no attribute validation rules found.
             */
            return;
        }
        // Validate attribute core rules
        AttributeValidator.validateCoreRules(attr, attributeValidationItem.rules);
        // Validating properties
        var propertyNames = Object.keys(attributeValidationItem.properties);
        for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
            var propertyName = propertyNames_1[_i];
            var propertyValue = attr.payload[propertyName];
            var propertyRules = attributeValidationItem.properties[propertyName];
            AttributeValidator.validProperty(propertyName, propertyValue, propertyRules);
        }
    };
    AttributeValidator.validateCoreRules = function (attr, attributesCoreRules) {
        // Do nothing
    };
    AttributeValidator.getRulesByAttributeType = function (attributeType) {
        if (attributeType in attribute_validation_rules_json_1.default) {
            return attribute_validation_rules_json_1.default[attributeType];
        }
        return undefined;
    };
    AttributeValidator.validProperty = function (propertyKey, propertyValue, rules) {
        // Null checker
        if (lodash_1.isNull(propertyValue) || lodash_1.isUndefined(propertyValue)) {
            if (rules.nullable) {
                return;
            }
            else {
                throw AttributeValidator.createError(propertyKey, "Missing required property [" + propertyKey + "].", rules, 'nullable');
            }
        }
        // Type checker
        if (typeof propertyValue !== rules.type_of) {
            throw AttributeValidator.createError(propertyKey, "Invalid data type for property [" + propertyKey + "].", rules, 'type_of');
        }
        if (rules.min_length) {
            if (propertyValue.length < rules.min_length) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] must be longer than " + rules.min_length + " characters.", rules, 'min_length');
            }
        }
        if (rules.max_length) {
            if (propertyValue.length > rules.max_length) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] must be shorter than " + rules.max_length + " characters.", rules, 'max_length');
            }
        }
        if (rules.min_number) {
            if (propertyValue < rules.min_number) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] must not be less than " + rules.min_number + ".", rules, 'min_number');
            }
        }
        if (rules.max_number) {
            if (propertyValue > rules.max_number) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] must not be greater than " + rules.max_number + ".", rules, 'max_number');
            }
        }
        if (rules.inclusion) {
            if (!lodash_1.includes(rules.inclusion, propertyValue)) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] does not contain a valid value.", rules, 'inclusion');
            }
        }
        if (rules.value_format) {
            var re = new RegExp(rules.value_format);
            if (!propertyValue.match(re)) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] does not match required format.", rules, 'value_format');
            }
        }
    };
    AttributeValidator.createError = function (propertyKey, message, validationRules, ruleKey) {
        return new validation_error_1.ValidationError(propertyKey, message, validationRules, ruleKey);
    };
    return AttributeValidator;
}());
exports.AttributeValidator = AttributeValidator;
//# sourceMappingURL=attribute-validator.js.map