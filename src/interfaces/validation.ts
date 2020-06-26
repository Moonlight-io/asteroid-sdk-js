export interface AttributeValidationItem {
  rules: AttributeCoreRules
  properties: AttributeValidationProperties
}

export interface AttributeCoreRules {
  date_range_order?: boolean
}

export interface AttributeValidationProperties {
  [key: string]: PropertyValidationRules
}

export interface PropertyValidationRules {
  nullable: boolean
  type_of: 'string' | 'number' | 'boolean' | 'object' | 'undefined'
  min_length?: number
  max_length?: number
  min_number?: number
  max_number?: number
  inclusion?: any[]
  value_format?: string
}
