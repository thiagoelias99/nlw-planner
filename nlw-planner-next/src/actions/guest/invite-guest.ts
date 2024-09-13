'use server'

import prisma from '@/infra/prisma'
import { getMailClient } from '@/infra/mailer'
import { InviteStatus } from '@prisma/client'

interface InviteGuestAction {
  tripId: string
  guestEmail: string
  guestName: string
}

export async function inviteGuestAction(data: InviteGuestAction) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: data.tripId
    },
    include: {
      User: true
    }
  })

  const invite = await prisma.invites.create({
    data: {
      Trip: {
        connect: {
          id: data.tripId
        }
      },
      User: {
        connectOrCreate: {
          where: { email: data.guestEmail },
          create: {
            email: data.guestEmail,
            firstName: data.guestName
          }
        }
      }
    }
  })

  const mailer = await getMailClient()

  await mailer.sendMail({
    from: {
      name: 'Equipe planner',
      address: process.env.EMAIL_FROM as string
    },
    to: {
      name: data.guestName,
      address: data.guestEmail
    },
    subject: 'Convite para Viajar',
    html: `
      <h1>${trip?.User.firstName} te convidou para viajar</h1>
      <p>Use o link abaixo para confirmar presença</p>
      <a href="${process.env.APPLICATION_URL}/viagens">Clique aqui para confirmar presença</a>
  `
  })

  await prisma.invites.update({
    where: {
      id: invite.id
    },
    data: {
      inviteStatus: InviteStatus.PENDING
    }
  })

  return invite
}