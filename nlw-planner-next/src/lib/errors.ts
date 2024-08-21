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

export class InvalidToken extends Error {
  constructor(email: string) {
    super(`Invalid token for email ${email}`)
    this.name = 'InvalidToken'
  }
}