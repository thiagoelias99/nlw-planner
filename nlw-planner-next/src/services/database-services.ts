import { CreateTripDto } from '@/dto/create-trip-dto'
import { getUserByEmail, getUserById, saveTripAction, updateUserConfirmationToken } from './actions/database/save-trip-action'


export interface IDatabaseServices {
  saveTrip(dto: CreateTripDto, confirmationToken: string): Promise<string>
  getUserByEmail(email: string): Promise<User | null>
  getUserById(id: string): Promise<User | null>
  updateUserConfirmationToken(id: string, confirmationToken: string): Promise<void>
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

  async saveTrip(dto: CreateTripDto, confirmationToken: string) {
    const createdTrip = await saveTripAction(dto, confirmationToken)
    return createdTrip.id
  }

  async getUserByEmail(email: string) {
    const userFromDb = await getUserByEmail(email)

    if (!userFromDb) {
      return null
    }

    return {
      id: userFromDb.id,
      firstName: userFromDb.firstName,
      lastName: userFromDb.lastName,
      email: userFromDb.email,
      isEmailVerified: userFromDb.isEmailVerified,
      ownedTrips: [],
      invites: []
    }
  }

  async getUserById(id: string) {
    const userFromDb = await getUserById(id)

    if (!userFromDb) {
      return null
    }

    return {
      id: userFromDb.id,
      firstName: userFromDb.firstName,
      lastName: userFromDb.lastName,
      email: userFromDb.email,
      isEmailVerified: userFromDb.isEmailVerified,
      ownedTrips: [],
      invites: []
    }
  }

  async updateUserConfirmationToken(id: string, confirmationToken: string) {
    await updateUserConfirmationToken(id, confirmationToken)

    return
  }
}