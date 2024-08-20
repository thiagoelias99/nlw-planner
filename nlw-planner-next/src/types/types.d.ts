declare type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  isEmailVerified: boolean
  ownedTrips: Trip[]
  invites: TripInvite[]
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
  trip: Trip
  invitedUser: User
  isInviteVerified: boolean
  inviteStatus: InviteStatus
}

declare enum InviteStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  EXCLUDED = 'EXCLUDED',
  PENDING = 'PENDING',
}