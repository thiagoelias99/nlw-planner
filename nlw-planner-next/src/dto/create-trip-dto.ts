export interface CreateTripDto {
  ownerEmail: string
  destination: string
  startDate: Date
  endDate: string
  guestsEmails: string[]
}