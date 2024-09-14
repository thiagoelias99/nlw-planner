import Header1 from '@/components/header1'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ClockIcon, PlusIcon, TagIcon, Trash2Icon } from 'lucide-react'
import DaySection from './day-section'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { z } from '@/lib/pt-zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form'
import CustomFormItem from '@/components/ui/custom-form-item'
import InputWithLeadingIcon from '@/components/form-fields/Input-with-leading-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale'
import { useTrip } from '@/hooks/useTrip'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { Activity } from '@/types/types'

interface Props {
  tripId: string
  className?: ClassNameValue
}

export default function ActivitiesSection({ tripId, className }: Props) {
  const formSchema = z.object({
    title: z.string().min(1).max(50),
    date: z.date(),
    time: z.string(),
  })

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const { toast } = useToast()
  const { trip, activities, registerActivity, isRegisteringActivity, updateActivity, isUpdatingActivity, deleteActivity, isDeletingActivity } = useTrip(tripId)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: undefined,
      time: ''
    },
  })

  useEffect(() => {
    if (selectedActivity) {
      form.reset({
        title: selectedActivity.title,
        date: new Date(selectedActivity.date),
        time: format(new Date(selectedActivity.date), 'HH:mm')
      })
      setOpenDialog(true)
    } else {
      form.reset({
        title: '',
        date: undefined,
        time: ''
      })
    }
  }, [selectedActivity])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedActivity) {
      try {
        const date = format(values.date, 'yyyy-MM-dd')
        const dateTime = new Date(`${date}T${values.time}:00`)

        await updateActivity({
          id: selectedActivity.id,
          title: values.title,
          date: dateTime,
          checked: selectedActivity.checked
        })
        form.reset()
        setOpenDialog(false)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao cadastrar atividade',
          variant: 'destructive',
        })
      }
    } else {
      try {
        const date = format(values.date, 'yyyy-MM-dd')
        const dateTime = new Date(`${date}T${values.time}:00`)

        await registerActivity({ title: values.title, dateTime })
        form.reset()
        setOpenDialog(false)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao cadastrar atividade',
          variant: 'destructive',
        })
      }
    }
  }

  async function onDelete() {
    if (selectedActivity) {
      try {
        await deleteActivity({ activityId: selectedActivity.id })
        form.reset()
        setOpenDialog(false)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao deletar atividade',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className={cn('mt-4 w-full', className)}>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <div className='w-full flex justify-between items-center'>
          <Header1>Atividades</Header1>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setSelectedActivity(null)
              }}
            >
              <PlusIcon size={16} />
              <span>Cadastrar atividade</span>
            </Button>
          </DialogTrigger>
        </div>
        <div className='space-y-4'>
          {activities?.length === 0 && (
            <p className='text-muted-foreground'>Nenhuma atividade cadastrada.</p>
          )}
          {activities?.map((dayActivity) => (
            <DaySection
              key={dayActivity.date.toString()}
              dayActivity={dayActivity}
              tripId={tripId}
              setSelectedActivity={setSelectedActivity}
            />
          ))}
        </div>

        <DialogContent className='w-full px-2'>
          <DialogHeader>
            {selectedActivity && (
              <Button
                size='icon'
                variant='destructive'
                className='absolute top-2 left-2'
                onClick={onDelete}
                isLoading={isDeletingActivity}
              >
                <Trash2Icon />
              </Button>
            )}
            <DialogTitle>Atividade</DialogTitle>
            <DialogDescription>
              Todos convidados podem visualizar as atividades.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <CustomFormItem>
                    <FormControl>
                      <InputWithLeadingIcon
                        Icon={TagIcon}
                        placeholder='Qual a atividade?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </CustomFormItem>
                )}
              />
              <div className='w-full flex justify-between gap-3'>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <CustomFormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div className='flex w-full flex-row justify-start items-center'>
                              <CalendarIcon className='mt-2 mr-2 text-muted-foreground' />
                              <span
                                className='bg-transparent text-lg text-foreground border-0 outline-none disabled:text-foreground disabled:opacity-100'>
                                {field.value ? format(field.value, 'd MMMM', { locale: ptBR }) : 'Data'}
                              </span>
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            locale={ptBR}
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            fromDate={trip?.startDate ? new Date(trip.startDate) : new Date()}
                            toDate={trip?.endDate ? new Date(trip.endDate) : new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </CustomFormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <CustomFormItem className='flex-1'>
                      <FormControl>
                        <InputWithLeadingIcon
                          type='time'
                          Icon={ClockIcon}
                          placeholder='Horário' {...field} />
                      </FormControl>
                      <FormMessage />
                    </CustomFormItem>
                  )}
                />
              </div>
              <Button
                className='w-full'
                type="submit"
                isLoading={isRegisteringActivity || isUpdatingActivity || isDeletingActivity}
              >Salvar atividade</Button>
            </form>
          </Form>


        </DialogContent>
      </Dialog>
    </section>
  )
}
