import { CreateTripDto } from '@/dto/create-trip-dto'

export interface IEmailServices {
  sendTripCreatedEmail(dto: CreateTripDto, tripId: string, confirmationToken: string): Promise<void>
  sendUserConfirmationTokenEmail(user: User, confirmationToken: string): Promise<void>
}

export class EmailServices implements IEmailServices {
  private constructor() { }
  private static instance: EmailServices | null = null
  public static getInstance(): EmailServices {
    if (!EmailServices.instance) {
      EmailServices.instance = new EmailServices()
    }
    return EmailServices.instance
  }

  async sendTripCreatedEmail(dto: CreateTripDto, tripId: string, confirmationToken: string) {
    console.log('Sending trip created email:', dto.ownerEmail, tripId)

    await new Promise(resolve => setTimeout(resolve, 2000))
    //TODO: Implement this function
  }

  async sendUserConfirmationTokenEmail(user: User, confirmationToken: string) {
    console.log('Sending user confirmation token email:', user.email, confirmationToken)

    await new Promise(resolve => setTimeout(resolve, 2000))
    //TODO: Implement this function
  }
}