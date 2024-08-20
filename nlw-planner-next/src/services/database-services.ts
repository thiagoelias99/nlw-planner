import { CreateTripDto } from '@/dto/create-trip-dto'
import { USER_MOCK } from '@/lib/mocks'


export interface IDatabaseServices {
  saveTrip(dto: CreateTripDto): Promise<string>
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

  async saveTrip(dto: CreateTripDto) {
    console.log('Saving trip to database:', dto)

    await new Promise(resolve => setTimeout(resolve, 2000))
    //TODO: Implement this function

    return 'created-trip-id'
  }

  async getUserByEmail(email: string) {
    console.log('Getting user by email:', email)

    await new Promise(resolve => setTimeout(resolve, 2000))

    return USER_MOCK
  }
}