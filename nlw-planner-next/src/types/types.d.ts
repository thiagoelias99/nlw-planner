declare type User = {
  id: string
  firstName: string
  lastName: string
  name: string
  email: string
  isEmailVerified: boolean
  confirmationToken: string
}

declare type Trip = {
  id: string
  owner: User
  destination: string
  startDate: Date
  endDate: Date
  guests: User[]
  isTripVerified: boolean
  createdAt: Date
}

declare type TripInvite = {
  id: string
  trip?: Trip
  invitedUser?: User
  inviteStatus: InviteStatus
}

declare enum InviteStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  EXCLUDED = 'EXCLUDED',
  PENDING = 'PENDING',
  NOT_SENT = 'NOT_SENT'
}

declare type Link = {
  id: string
  title: string
  url: string
  userName: string
}