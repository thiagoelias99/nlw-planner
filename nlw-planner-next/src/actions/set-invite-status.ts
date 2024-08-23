'use server'

import prisma from '@/infra/prisma'
import { InviteStatus } from '@prisma/client'

export async function setInviteStatus(inviteId: string, inviteStatus: InviteStatus) {
  await prisma.invites.update({
    where: {
      id: inviteId
    },
    data: {
      inviteStatus
    }
  })
}