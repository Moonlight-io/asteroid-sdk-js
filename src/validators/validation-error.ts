export class ValidationError extends Error {
  propertyKey: string | undefined

  constructor(propertyKey: string | undefined, message: string | undefined) {
    super(message)
    this.name = 'ValidationError'
    this.propertyKey = propertyKey
  }
}
