'use server'

import prisma from '@/infra/prisma'

export async function deleteActivityAction(data: { activityId: string }) {
  return await prisma.activity.delete({
    where: {
      id: data.activityId
    }
  })
}