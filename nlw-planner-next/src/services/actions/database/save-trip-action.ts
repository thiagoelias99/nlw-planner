'use server'

import { CreateLinkDto } from '@/dto/create-link-dto'
import { CreateTripDto } from '@/dto/create-trip-dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function saveTripAction(dto: CreateTripDto, confirmationToken: string) {
  return prisma.trip.create({
    data: {
      destination: dto.destination,
      endDate: dto.endDate,
      startDate: dto.startDate,
      confirmationToken,
      User: {
        connectOrCreate: {
          where: { email: dto.ownerEmail },
          create: {
            email: dto.ownerEmail
          }
        }
      },
      Invites: {
        create: dto.guestsEmails.map(invite => {
          return {
            User: {
              connectOrCreate: {
                where: {
                  email: invite.email
                },
                create: {
                  email: invite.email,
                  firstName: invite.name,
                }
              }
            }
          }
        })
      }
    }
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    },
    include: {
      Trips: {
        include: {
          Invites: {
            include: {
              User: true
            }
          }
        }
      }
    }
  })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id
    },
    include: {
      Trips: {
        include: {
          Invites: true
        }
      }
    }
  })
}

export async function updateUserConfirmationToken(id: string, confirmationToken: string) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      confirmationToken
    }
  })
}
export async function saveUserAction(dto: CreateUserDto, confirmationToken: string) {
  return prisma.user.upsert({
    where: {
      email: dto.email
    },
    update: {
      firstName: dto.firstName,
      lastName: dto.lastName,
      confirmationToken
    },
    create: {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      confirmationToken
    },
    include: {
      Trips: {
        include: {
          Invites: true
        }
      }
    }
  })
}

export async function updateUserEmailVerifiedAction(id: string, isEmailVerified: boolean) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      isEmailVerified
    },
    include: {
      Trips: {
        include: {
          Invites: true
        }
      }
    }
  })
}

export async function saveLinkAction(data: CreateLinkDto) {
  return prisma.links.create({
    data: {
      title: data.title,
      url: data.url,
      tripId: data.tripId,
      userId: data.userId
    }
  })
}