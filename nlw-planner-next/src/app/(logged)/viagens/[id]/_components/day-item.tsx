'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTrip } from '@/hooks/useTrip'
import { cn } from '@/lib/utils'
import { Activity } from '@/types/types'
import { format } from 'date-fns'
import { CircleCheckIcon, CircleDashedIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  activity: Activity,
  tripId: string,
  className?: ClassNameValue
}

export default function DayItem({ activity, tripId, className }: Props) {
  const { checkActivity } = useTrip(tripId)

  const date = new Date(activity.date)

  return (
    <Card className={cn('mt-2', className)}>
      <CardContent className='py-4 w-full flex flex-row justify-between items-center'>
        <div className='w-full flex flex-row justify-start items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-transparent'
            onClick={() => checkActivity({ activityId: activity.id, value: !activity.checked })}
          >
            {activity.checked ? (
              <CircleCheckIcon className='text-primary' />
            ) : (
              <CircleDashedIcon className='' />
            )}
          </Button>
          <h4>{activity.title}</h4>
        </div>
        <p className='text-muted-foreground'>{format(date, 'HH:mm')}</p>
      </CardContent>
    </Card>
  )
}
