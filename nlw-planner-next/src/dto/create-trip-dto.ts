export type CreateTripDto = {
  ownerEmail: string
  destination: string
  startDate: Date
  endDate: Date
  guestsEmails: {
    name: string
    email: string
  }[]
}