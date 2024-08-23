'use server'

import prisma from '@/infra/prisma'
import { Trip } from '@prisma/client'

export async function updateTrip(tripId: string, data: Partial<Trip>) {
  await prisma.trip.update({
    where: {
      id: tripId
    },
    data
  })
}