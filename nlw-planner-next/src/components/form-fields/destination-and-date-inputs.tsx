'use client'

import { FormField, FormItem, FormControl, FormMessage, Form } from '../ui/form'
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
import { z } from '@/lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  destination: z.string().min(1),
  startAt: z.union([
    z.string().date().transform((data) => new Date(data)),
    z.string().datetime().transform((data) => new Date(data)),
    z.date(),
  ]),
  endsAt: z.union([
    z.string({ required_error: 'Data de término é obrigatória' }).date().transform((data) => new Date(data)),
    z.string({ required_error: 'Data de término é obrigatória' }).datetime().transform((data) => new Date(data)),
    z.date({ required_error: 'Data de término é obrigatória' }),
  ]),
})

export type DestinationAndDateInputsFormValues = z.infer<typeof formSchema>

interface DestinationAndDateInputsProps {
  disabled?: boolean
  onSubmit: (values: DestinationAndDateInputsFormValues) => void
  onBack?: () => void
  defaultValues?: Partial<DestinationAndDateInputsFormValues>
  buttonLabel?: string
  isLoading?: boolean
}

export default function DestinationAndDateInputs({ disabled, onSubmit, onBack, defaultValues, buttonLabel = 'Continuar', isLoading }: DestinationAndDateInputsProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: defaultValues?.startAt ? new Date(defaultValues.startAt) : undefined,
    to: defaultValues?.endsAt ? new Date(defaultValues.endsAt) : undefined,
  })

  const form = useForm<DestinationAndDateInputsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: defaultValues?.destination || undefined,
      startAt: defaultValues?.startAt || undefined,
      endsAt: defaultValues?.endsAt || undefined,
    },
  })

  useEffect(() => {
    if (date?.from && date?.to) {
      form.setValue('startAt', date.from)
      form.setValue('endsAt', date.to)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  return (
    <div className='bg-card w-full pl-6 pr-4 py-5 flex flex-col md:flex-row md:justify-around gap-4 rounded-xl shadow-shape'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
          <FormField
            control={form.control}
            name='destination'
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
            name='endsAt'
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={disabled}
                        className={cn(
                          'w-full flex flex-row justify-start items-center px-0 gap-4 text-foreground bg-transparent hover:bg-transparent text-lg disabled:opacity-100 disabled:cursor-not-allowed font-normal',)}
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
          {!disabled ? (
            <Button
              type='submit'
              isLoading={isLoading}
              className='w-full md:w-auto space-x-2'
            >
              <span>{buttonLabel}</span>
              <ArrowRightIcon size={18} />
            </Button>
          ) : (
            <Button
              type='button'
              variant='secondary'
              className='w-full md:w-auto space-x-2'
              onClick={e => {
                e.preventDefault()
                onBack && onBack()
              }}
            >
              <span>Alterar local/data</span>
              <Settings2Icon size={18} />
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}