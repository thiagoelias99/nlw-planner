import Header2 from '@/components/header2'
import React from 'react'
import DayItem from './day-item'

export default function DaySection() {
  const inThePast = true

  return (
    <div className={`${inThePast && 'opacity-60'}`}>
      <div className='w-full flex justify-start items-baseline gap-2'>
        <Header2>Dia 17</Header2>
        <h3 className='text-xs md:text-base text-muted-foreground'>Sábado</h3>
      </div>
      <DayItem />
    </div>
  )
}
