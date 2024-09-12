'use server'

import prisma from '@/infra/prisma'
import { z } from 'zod'

export interface RegisterLinkDto {
  title: string
  url: string
  tripId: string
}

export async function registerLinkAction(data: RegisterLinkDto) {

  const schema = z.object({
    title: z.string().min(1).max(100),
    url: z.string().url(),
    tripId: z.string()
  })

  const parsedData = schema.parse(data)

  return await prisma.links.create({
    data: {
      title: parsedData.title,
      url: parsedData.url,
      tripId: parsedData.tripId
    }
  })
}