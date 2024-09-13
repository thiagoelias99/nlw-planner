'use server'

import prisma from '@/infra/prisma'
import { z } from 'zod'

export interface RegisterActivityDto {
  title: string
  dateTime: Date
  tripId: string
}

export async function registerActivityAction(data: RegisterActivityDto) {

  console.log(data)

  const schema = z.object({
    title: z.string().min(1).max(100),
    dateTime: z.date(),
    tripId: z.string()
  })

  const parsedData = schema.parse(data)

  return await prisma.activity.create({
    data: {
      title: parsedData.title,
      date: parsedData.dateTime,
      tripId: parsedData.tripId
    }
  })
}