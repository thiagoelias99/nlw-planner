import { CreateTripDto } from '@/dto/create-trip-dto'

export interface IEmailServices {
  sendTripCreatedEmail(dto: CreateTripDto, tripId: string): Promise<void>
}

export class EmailServices implements IEmailServices{
  private constructor() { }
  private static instance: EmailServices | null = null
  public static getInstance(): EmailServices {
    if (!EmailServices.instance) {
      EmailServices.instance = new EmailServices()
    }
    return EmailServices.instance
  }

  async sendTripCreatedEmail(dto: CreateTripDto, tripId: string) {
    console.log('Sending trip created email:', dto.ownerEmail, tripId)

    await new Promise(resolve => setTimeout(resolve, 2000))
    //TODO: Implement this function
  }
}