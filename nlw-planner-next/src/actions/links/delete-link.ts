'use server'

import prisma from '@/infra/prisma'

export async function deleteLinkAction(data: { linkId: string }) {
  return await prisma.links.delete({
    where: {
      id: data.linkId
    }
  })
}