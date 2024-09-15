'use server'

import prisma from '@/infra/prisma'

export async function getTripFromUser(userEmail: string) {
  return await prisma.trip.findMany({
    where: {
      OR: [
        {
          ownerEmail: userEmail
        },
        {
          Invites: {
            some: {
              guestEmail: userEmail
            }
          }
        }
      ]
    },
    select: {
      id: true,
      destination: true,
      startDate: true,
      endDate: true,
      isTripVerified: true,
      createdAt: true,
      User: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      },
      Invites: {
        select: {
          id: true,
          guestEmail: true,
          inviteStatus: true,
        }
      }

    },
    orderBy: {
      startDate: 'asc'
    }
  })
}