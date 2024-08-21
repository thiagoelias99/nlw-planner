import { CreateTripDto } from '@/dto/create-trip-dto'
import { IUserServices, UserServices } from './user-services'
import { DatabaseServices, IDatabaseServices } from './database-services'
import { createConfirmationToken } from '@/lib/utils'

export interface ITripServices {
  createTrip(dto: CreateTripDto): Promise<{
    tripId: string
    isEmailVerified: boolean
  }>
}

export class TripServices {
  constructor(
    private readonly userServices: IUserServices,
    private readonly databaseServices: IDatabaseServices
  ) { }

  private static instance: TripServices | null = null

  public static getInstance(): TripServices {
    if (!TripServices.instance) {
      TripServices.instance = new TripServices(
        UserServices.getInstance(),
        DatabaseServices.getInstance()
      )
    }
    return TripServices.instance
  }

  async createTrip(dto: CreateTripDto): Promise<{
    tripId: string
    isEmailVerified: boolean
  }> {
    const confirmationToken = createConfirmationToken()

    const tripId = await this.databaseServices.saveTrip(dto, confirmationToken)
    const isEmailVerified = await this.userServices.checkIfEmailIsVerified(dto.ownerEmail)

    return { tripId, isEmailVerified }
  }
}