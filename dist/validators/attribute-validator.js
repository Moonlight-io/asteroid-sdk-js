"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var attribute_validation_rules_json_1 = __importDefault(require("../../data/attribute-validation-rules.json"));
var validation_error_1 = require("./validation-error");
var AttributeValidator = /** @class */ (function () {
    function AttributeValidator() {
    }
    AttributeValidator.validatePayload = function (attr) {
        if (!attr.type) {
            throw new Error('Missing attribute type.');
        }
        if (!attr.payload) {
            throw new Error('Missing attribute payload.');
        }
        var attributeRules = AttributeValidator.getRulesByAttributeType(attr.type);
        if (!attributeRules) {
            /**
             * Validation logic completes without error when
             * no attribute validation rules found.
             */
            return;
        }
        var propertyNames = Object.keys(attributeRules);
        for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
            var propertyName = propertyNames_1[_i];
            var propertyValue = attr.payload[propertyName];
            var propertyRules = attributeRules[propertyName];
            AttributeValidator.validProperty(propertyName, propertyValue, propertyRules);
        }
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
                throw AttributeValidator.createError(propertyKey, "Missing required property [" + propertyKey + "].");
            }
        }
        // Type checker
        if (typeof propertyValue !== rules.type_of) {
            throw AttributeValidator.createError(propertyKey, "Invalid data type for property [" + propertyKey + "].");
        }
        if (rules.min_length) {
            if (propertyValue.length < rules.min_length) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] must be longer than " + rules.min_length + " characters.");
            }
        }
        if (rules.max_length) {
            if (propertyValue.length > rules.max_length) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] must be shorter than " + rules.max_length + " characters.");
            }
        }
        if (rules.min_number) {
            if (propertyValue < rules.min_number) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] must not be less than " + rules.min_number + ".");
            }
        }
        if (rules.max_number) {
            if (propertyValue < rules.max_number) {
                throw AttributeValidator.createError(propertyKey, "[" + propertyKey + "] must not be greater than " + rules.max_number + ".");
            }
        }
    };
    AttributeValidator.createError = function (propertyKey, message) {
        return new validation_error_1.ValidationError(propertyKey, message);
    };
    return AttributeValidator;
}());
exports.AttributeValidator = AttributeValidator;
//# sourceMappingURL=attribute-validator.js.map