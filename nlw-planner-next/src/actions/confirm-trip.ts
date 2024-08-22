'use server'

import { getMailClient } from '@/infra/mailer'
import prisma from '@/infra/prisma'
import { InviteStatus } from '@prisma/client'

export async function confirmTrip(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId
    },
    include: {
      Invites: {
        include: {
          User: true
        }
      },
      User: true
    }
  })

  if (!trip) {
    throw new Error('Trip not found')
  }

  await prisma.trip.update({
    where: {
      id: tripId
    },
    data: {
      isTripVerified: true
    }
  })

  for (const invite of trip.Invites) {
    await prisma.invites.update({
      where: {
        id: invite.id
      },
      data: {
        inviteStatus: InviteStatus.PENDING
      }
    })

    const mailer = await getMailClient()

    await mailer.sendMail({
      from: {
        name: 'Equipe planner',
        address: process.env.EMAIL_FROM as string
      },
      to: {
        name: invite.User.firstName,
        address: invite.User.email
      },
      subject: 'Convite para Viajar',
      html: `
        <h1>${trip.User.firstName} te convidou para viajar</h1>
        <p>Use o link abaixo para confirmar presença</p>
        <a href="${process.env.APPLICATION_URL}/viagens">Clique aqui para confirmar presença</a>
    `
    })
  }

}