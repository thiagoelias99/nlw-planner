export class UserNotFoundError extends Error {
  constructor(email: string) {
    super(`User with email ${email} not found`)
    this.name = 'UserNotFoundError'
  }
}

export class EmailNotVerifiedError extends Error {
  constructor(email: string) {
    super(`Email ${email} not verified`)
    this.name = 'EmailNotVerifiedError'
  }
}