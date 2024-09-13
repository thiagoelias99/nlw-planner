import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CircleCheckIcon, CircleDashedIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  activity: Activity,
  className?: ClassNameValue
}

export default function DayItem({activity, className} : Props) {
  const finished = true

  const date = new Date(activity.date)

  return (
    <Card className={cn('mt-2', className)}>
      <CardContent className='py-4 w-full flex flex-row justify-between items-center'>
        <div className='w-full flex flex-row justify-start items-center gap-2'>
          {finished ? (
            <CircleCheckIcon className='text-primary' />
          ) : (
            <CircleDashedIcon className='' />
          )}
          <h4>{activity.title}</h4>
        </div>
        <p className='text-muted-foreground'>{format(date, 'HH:mm')}</p>
      </CardContent>
    </Card>
  )
}
