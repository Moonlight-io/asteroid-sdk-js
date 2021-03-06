"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValidator = void 0;
var lodash_1 = require("lodash");
var attribute_validation_rules_json_1 = __importDefault(require("../../data/attribute-validation-rules.json"));
var validation_error_1 = require("./validation-error");
var helpers_1 = require("../helpers");
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
        var attributeValidationItem = AttributeValidator.getAttributeValidationItem(attr.type);
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
            AttributeValidator.validProperty(attr.type, propertyName, propertyValue, propertyRules);
        }
    };
    AttributeValidator.validateCoreRules = function (attr, attributesCoreRules) {
        var _a, _b, _c, _d, _e;
        if (attributesCoreRules.date_range_order) {
            var fromYear = (_a = attr.payload) === null || _a === void 0 ? void 0 : _a.year_from;
            var fromMonth = (_b = attr.payload) === null || _b === void 0 ? void 0 : _b.month_from;
            var toYear = (_c = attr.payload) === null || _c === void 0 ? void 0 : _c.year_to;
            var toMonth = (_d = attr.payload) === null || _d === void 0 ? void 0 : _d.month_to;
            var status_1 = (_e = attr.payload) === null || _e === void 0 ? void 0 : _e.status;
            this.validateDateRangeOrder(fromYear, fromMonth, toYear, toMonth, status_1);
        }
    };
    AttributeValidator.getAttributeValidationItem = function (attributeType) {
        var rules = AttributeValidator.getAttributesValidationRules();
        if (attributeType in rules) {
            return rules[attributeType];
        }
        return undefined;
    };
    AttributeValidator.validProperty = function (attributeType, propertyKey, propertyValue, rules) {
        var propertyTitle = helpers_1.AttributeContextHelper.getPropertyTitle(attributeType, propertyKey) || "" + propertyKey;
        // Null checker
        if (lodash_1.isNull(propertyValue) || lodash_1.isUndefined(propertyValue)) {
            if (rules.nullable) {
                return;
            }
            else {
                var msg = "Missing required '" + propertyTitle + "'.";
                throw AttributeValidator.createError(propertyKey, msg, rules, 'nullable');
            }
        }
        // Type checker
        if (typeof propertyValue !== rules.type_of) {
            var msg = "Invalid data type for '" + propertyTitle + "'.";
            throw AttributeValidator.createError(propertyKey, msg, rules, 'type_of');
        }
        if (rules.min_length) {
            if (propertyValue.length < rules.min_length) {
                var msg = "'" + propertyTitle + "' must be longer than " + rules.min_length + " characters.";
                throw AttributeValidator.createError(propertyKey, msg, rules, 'min_length');
            }
        }
        if (rules.max_length) {
            if (propertyValue.length > rules.max_length) {
                var msg = "'" + propertyTitle + "' must be shorter than " + rules.max_length + " characters.";
                throw AttributeValidator.createError(propertyKey, msg, rules, 'max_length');
            }
        }
        if (rules.min_number) {
            if (propertyValue < rules.min_number) {
                var msg = "'" + propertyTitle + "' must not be less than " + rules.min_number + ".";
                throw AttributeValidator.createError(propertyKey, msg, rules, 'min_number');
            }
        }
        if (rules.max_number) {
            if (propertyValue > rules.max_number) {
                var msg = "'" + propertyTitle + "' must not be greater than " + rules.max_number + ".";
                throw AttributeValidator.createError(propertyKey, msg, rules, 'max_number');
            }
        }
        if (rules.inclusion) {
            if (!lodash_1.includes(rules.inclusion, propertyValue)) {
                var msg = "Value of '" + propertyTitle + "' is invalid.";
                throw AttributeValidator.createError(propertyKey, msg, rules, 'inclusion');
            }
        }
        if (rules.value_format) {
            var re = new RegExp(rules.value_format);
            if (!propertyValue.match(re)) {
                var msg = "'" + propertyTitle + "' does not match its required format.";
                throw AttributeValidator.createError(propertyKey, msg, rules, 'value_format');
            }
        }
    };
    AttributeValidator.createError = function (propertyKey, message, validationRules, ruleKey) {
        return new validation_error_1.ValidationError(propertyKey, message, validationRules, ruleKey);
    };
    AttributeValidator.validateDateRangeOrder = function (fromYear, fromMonth, toYear, toMonth, status) {
        if (!fromYear) {
            return;
        }
        if (status === 'current') {
            return;
        }
        if (!!toYear && fromYear > toYear) {
            throw AttributeValidator.createError(undefined, "'From Date' cannot be greater than 'To Date'.", undefined, 'date_range_order');
        }
        if (fromYear === toYear) {
            if (!!fromMonth && !!toMonth && fromMonth > toMonth) {
                throw AttributeValidator.createError(undefined, "'From Date' cannot be greater than 'To Date'.", undefined, 'date_range_order');
            }
        }
    };
    AttributeValidator.getAttributesValidationRules = function () {
        return attribute_validation_rules_json_1.default;
    };
    return AttributeValidator;
}());
exports.AttributeValidator = AttributeValidator;
//# sourceMappingURL=attribute-validator.js.map