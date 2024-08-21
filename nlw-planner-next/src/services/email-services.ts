import { CreateTripDto } from '@/dto/create-trip-dto'
import { sendUserLoginConfirmationTokenEmailAction } from './actions/mail-actions'


export interface IEmailServices {
  sendTripCreatedEmail(dto: CreateTripDto, tripId: string, confirmationToken: string): Promise<void>
  sendUserLoginConfirmationTokenEmail(user: User, confirmationToken: string): Promise<void>
  sendUserRegisterConfirmationTokenEmail(user: User, confirmationToken: string): Promise<void>
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

  //Send trip information email to the owner with confirmation token
  async sendTripCreatedEmail(dto: CreateTripDto, tripId: string, confirmationToken: string) {
    console.log('Sending trip created email:', dto.ownerEmail, tripId)

    await new Promise(resolve => setTimeout(resolve, 2000))
    //TODO: Implement this function
  }

  //Send user login confirmation token email
  async sendUserLoginConfirmationTokenEmail(user: User, confirmationToken: string) {
    // return sendUserLoginConfirmationTokenEmailAction(user, confirmationToken)

    await new Promise(resolve => setTimeout(resolve, 2000))
    return
  }

  //Send user register confirmation token email
  async sendUserRegisterConfirmationTokenEmail(user: User, confirmationToken: string) {
    console.log('Sending user confirmation token email:', user.email, confirmationToken)

    await new Promise(resolve => setTimeout(resolve, 2000))
    //TODO: Implement this function
  }
}