import { CreateTripDto } from '@/dto/create-trip-dto'
import { USER_MOCK } from '@/lib/mocks'
import { saveTripAction } from './actions/database/save-trip-action'


export interface IDatabaseServices {
  saveTrip(dto: CreateTripDto, confirmationToken: string): Promise<string>
  getUserByEmail(email: string): Promise<User>
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
    console.log('Getting user by email:', email)

    await new Promise(resolve => setTimeout(resolve, 2000))

    return USER_MOCK
  }
}