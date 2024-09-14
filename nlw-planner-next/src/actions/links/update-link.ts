'use server'

import prisma from '@/infra/prisma'
import { Links } from '@prisma/client'

export async function updateLinksAction(data: Links) {
  return await prisma.links.update({
    where: {
      id: data.id
    },
    data: {
      title: data.title,
      url: data.url
    }
  })
}