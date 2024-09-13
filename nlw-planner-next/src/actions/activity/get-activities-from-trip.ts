'use server'

import prisma from '@/infra/prisma'
import { getDatesBetween } from '@/lib/utils'
import { isSameDay } from 'date-fns'

export async function getActivitiesFromTripAction(tripId: string) {
  const activities = await prisma.activity.findMany({
    where: {
      tripId
    },
    include: {
      Trip: {
        select: {
          startDate: true,
          endDate: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
  })

  if (!activities || activities.length === 0) {
    return []
  }

  const dates = getDatesBetween(activities[0].Trip.startDate, activities[0].Trip.endDate)

  //Create a list of activities for each day
  const result = dates.map(date => {
    const dayActivities = activities.filter(activity => {
      return isSameDay(activity.date, date)
    })

    return {
      date,
      activities: dayActivities.map(activity => {
        return {
          id: activity.id,
          title: activity.title,
          date: activity.date,
        }
      })
    }
  })

  return result
}