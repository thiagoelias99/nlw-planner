'use server'

import prisma from '@/infra/prisma'

export async function checkActivityAction(data: { activityId: string, value: boolean }) {
  return await prisma.activity.update({
    where: {
      id: data.activityId
    },
    data: {
      checked: data.value
    }
  })
}