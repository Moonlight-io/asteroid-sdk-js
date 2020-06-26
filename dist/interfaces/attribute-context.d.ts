export interface AttributeContexts {
    [key: string]: AttributeContextItem;
}
export interface AttributeContextItem {
    title: string;
    allow_descriptions: boolean;
    properties: AttributeProperties;
}
export interface AttributeProperties {
    [key: string]: AttributePropertyItem;
}
export interface AttributePropertyItem {
    title: string;
}
