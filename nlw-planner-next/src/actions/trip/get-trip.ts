'use server'

import prisma from '@/infra/prisma'

export async function getTrip(tripId: string) {
  return prisma.trip.findUnique({
    where: {
      id: tripId
    },
    include: {
      Links: true,
      Invites: true
    }
  })
}