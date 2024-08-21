'use server'

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
      }
    }
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id
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
    }
  })
}