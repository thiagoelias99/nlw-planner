import { Card, CardContent } from '@/components/ui/card'
import { CircleCheckIcon, CircleDashedIcon } from 'lucide-react'

export default function DayItem() {
  const finished = true

  return (
    <Card className='mt-2'>
      <CardContent className='py-4 w-full flex flex-row justify-between items-center'>
        <div className='w-full flex flex-row justify-start items-center gap-2'>
          {finished ? (
            <CircleCheckIcon className='text-primary' />
          ) : (
            <CircleDashedIcon className='' />
          )}
          <h4>Academia em grupo</h4>
        </div>
        <p className='text-muted-foreground'>14:00h</p>
      </CardContent>
    </Card>
  )
}
