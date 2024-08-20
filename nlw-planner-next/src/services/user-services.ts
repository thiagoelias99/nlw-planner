import { DatabaseServices } from './database-services'

export interface IUserServices {
  checkIfEmailIsVerified(email: string): Promise<boolean>
}

export class UserServices implements IUserServices {
  private static instance: UserServices | null = null
  private constructor(
    private readonly databaseServices: DatabaseServices,
  ) { }

  public static getInstance(): UserServices {
    if (!UserServices.instance) {
      UserServices.instance = new UserServices(
        DatabaseServices.getInstance()
      )
    }
    return UserServices.instance
  }

  async checkIfEmailIsVerified(email: string): Promise<boolean> {
    console.log('Checking if email are verified:', email)

    const user = await this.databaseServices.getUserByEmail(email)

    //TODO: Implement this function
    return user.isEmailVerified
  }
}