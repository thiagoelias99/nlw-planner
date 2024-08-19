'use client'

import { FormField, FormItem, FormControl, FormMessage } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import InputWithLeadingIcon from './Input-with-leading-icon'
import { ArrowRightIcon, CalendarIcon, MapPinIcon, Settings2Icon } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { Card } from '../ui/card'


interface DestinationAndDateInputsProps {
  form: UseFormReturn<any>
  destinationInputName: string
  startAtInputName: string
  endsAtInputName: string
  disabled?: boolean
}

export default function DestinationAndDateInputs({ form, destinationInputName, startAtInputName, endsAtInputName, disabled }: DestinationAndDateInputsProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const showPart2 = false

  useEffect(() => {
    if (date?.from && date?.to) {
      form.setValue(startAtInputName, date.from)
      form.setValue(endsAtInputName, date.to)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  return (
    <div className='bg-card w-full pl-6 pr-4 py-5 flex flex-col gap-2 rounded-xl'>
      <FormField
        control={form.control}
        name={destinationInputName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputWithLeadingIcon
                disabled={disabled}
                Icon={MapPinIcon}
                placeholder='Para onde você vai?'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={endsAtInputName}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={disabled}
                    className={cn(
                      'w-full flex flex-row justify-start items-center px-0 gap-4 text-foreground bg-transparent hover:bg-transparent text-lg disabled:opacity-100 disabled:cursor-not-allowed',)}
                  >
                    <CalendarIcon className="text-muted-foreground" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'dd \'de\' LLL y', { locale: ptBR })} a{' '}
                          {format(date.to, 'dd \'de\' LLL y', { locale: ptBR })}
                        </>
                      ) : (
                        format(date.from, 'dd \'de\' LLL y')
                      )
                    ) : (
                      <span className='font-normal text-muted-foreground'>Quando?</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  locale={ptBR}
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  fromDate={new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      {!showPart2 ? (
        <Button
          type='button'
          className='w-full space-x-2'
        // onClick={() => setShowPart2(true)}
        >
          <span>Continuar</span>
          <ArrowRightIcon size={18} />
        </Button>
      ) : (
        <Button
          type='button'
          variant='secondary'
        // onClick={() => setShowPart2(false)}
        >
          <span>Alterar local/data</span>
          <Settings2Icon size={18} />
        </Button>
      )}
    </div>
  )
}
