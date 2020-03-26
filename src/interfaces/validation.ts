export interface AttributeValidationRules {
  [key: string]: PropertyValidationRules
}

export interface PropertyValidationRules {
  nullable: boolean
  type_of: 'string' | 'number' | 'boolean' | 'object' | 'undefined'
  min_length?: number
  max_length?: number
}