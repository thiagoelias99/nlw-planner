'use server'

import prisma from '@/infra/prisma'
import { Activity } from '@/types/types'

export async function updateActivityAction(data: Activity) {
  return await prisma.activity.update({
    where: {
      id: data.id
    },
    data: {
      title: data.title,
      date: data.date
    }
  })
}