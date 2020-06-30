"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeContextHelper = void 0;
var attribute_contexts_json_1 = __importDefault(require("../../data/attribute-contexts.json"));
var AttributeContextHelper = /** @class */ (function () {
    function AttributeContextHelper() {
    }
    AttributeContextHelper.getAttributeTitle = function (attributeType) {
        var item = AttributeContextHelper.getAttributeContextItem(attributeType);
        if (!item) {
            return undefined;
        }
        return item.title;
    };
    AttributeContextHelper.isAllowDescriptions = function (attributeType) {
        var item = AttributeContextHelper.getAttributeContextItem(attributeType);
        if (!item) {
            return undefined;
        }
        return item.allow_descriptions;
    };
    AttributeContextHelper.getPropertyTitle = function (attributeType, propertyKey) {
        var propertyItem = AttributeContextHelper.getPropertyItem(attributeType, propertyKey);
        if (!propertyItem) {
            return undefined;
        }
        return propertyItem.title;
    };
    AttributeContextHelper.getPropertyItem = function (attributeType, propertyKey) {
        var attributeItem = AttributeContextHelper.getAttributeContextItem(attributeType);
        if (!attributeItem) {
            return undefined;
        }
        if (propertyKey in attributeItem.properties) {
            return attributeItem.properties[propertyKey];
        }
        return undefined;
    };
    AttributeContextHelper.getAttributeContextItem = function (attributeType) {
        var ctx = AttributeContextHelper.getAttributeContexts();
        if (attributeType in ctx) {
            return ctx[attributeType];
        }
        return undefined;
    };
    AttributeContextHelper.getAttributeContexts = function () {
        return attribute_contexts_json_1.default;
    };
    return AttributeContextHelper;
}());
exports.AttributeContextHelper = AttributeContextHelper;
//# sourceMappingURL=attribute-context-helper.js.map