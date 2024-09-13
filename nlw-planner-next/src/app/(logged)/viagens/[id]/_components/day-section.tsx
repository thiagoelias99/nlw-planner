import Header2 from '@/components/header2'
import React from 'react'
import DayItem from './day-item'
import { ClassNameValue } from 'tailwind-merge'
import { format, isPast, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayActivity } from '@/types/types'

interface Props {
  tripId: string
  dayActivity: DayActivity
  className?: ClassNameValue
}

export default function DaySection({ dayActivity, className, tripId }: Props) {
  const date = new Date(dayActivity.date)

  const inThePast = isPast(date) && !isToday(date)

  return (
    <div className={`${inThePast && 'opacity-60'}`}>
      <div className='w-full flex justify-start items-baseline gap-2'>
        <Header2>Dia {format(date, 'd')}</Header2>
        <h3 className='text-xs md:text-base text-muted-foreground'>{format(date, 'EEEE', { locale: ptBR })}</h3>
      </div>
      {dayActivity.activities.length === 0 && (
        <p className='text-muted-foreground'>Nenhuma atividade cadastrada neste dia</p>
      )}
      {dayActivity.activities.map((activity) => (
        <DayItem key={activity.id} activity={activity} tripId={tripId} />
      ))}
    </div>
  )
}
