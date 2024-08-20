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