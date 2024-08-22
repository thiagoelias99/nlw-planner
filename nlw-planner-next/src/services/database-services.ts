import { CreateTripDto } from '@/dto/create-trip-dto'
import { getUserByEmail, getUserById, saveTripAction, saveUserAction, updateUserConfirmationToken, updateUserEmailVerifiedAction } from './actions/database/save-trip-action'
import { Prisma, User as PrismaUser, Trip as PrismaTrip } from '@prisma/client'


export interface IDatabaseServices {
  saveTrip(dto: CreateTripDto, confirmationToken: string): Promise<string>
  getUserByEmail(email: string): Promise<User | null>
  getUserById(id: string): Promise<User | null>
  updateUserConfirmationToken(id: string, confirmationToken: string): Promise<void>
  updateUserEmailVerified(userId: string, status: boolean): Promise<User>
  createUser(dto: CreateUserDto, confirmationToken: string): Promise<User>
}

export class DatabaseServices implements IDatabaseServices {
  private constructor() { }

  private static instance: DatabaseServices | null = null
  public static getInstance(): DatabaseServices {
    if (!DatabaseServices.instance) {
      DatabaseServices.instance = new DatabaseServices()
    }
    return DatabaseServices.instance
  }

  private databaseToUserDto(data: PrismaUser): User {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      isEmailVerified: data.isEmailVerified,
      confirmationToken: data.confirmationToken,
    }
  }

  async saveTrip(dto: CreateTripDto, confirmationToken: string) {
    const createdTrip = await saveTripAction(dto, confirmationToken)
    return createdTrip.id
  }

  async getUserByEmail(email: string) {
    const userFromDb = await getUserByEmail(email)

    if (!userFromDb) {
      return null
    }

    const test = this.databaseToUserDto(userFromDb)

    return test
  }

  async getUserById(id: string) {
    const userFromDb = await getUserById(id)

    if (!userFromDb) {
      return null
    }

    return this.databaseToUserDto(userFromDb)
  }

  async updateUserConfirmationToken(id: string, confirmationToken: string) {
    await updateUserConfirmationToken(id, confirmationToken)
    return
  }

  async createUser(dto: CreateUserDto, confirmationToken: string): Promise<User> {
    const createdUser = await saveUserAction(dto, confirmationToken)

    return this.databaseToUserDto(createdUser)
  }

  async updateUserEmailVerified(userId: string, status: boolean) {
    const updatedUser = await updateUserEmailVerifiedAction(userId, status)
    return this.databaseToUserDto(updatedUser)
  }
}