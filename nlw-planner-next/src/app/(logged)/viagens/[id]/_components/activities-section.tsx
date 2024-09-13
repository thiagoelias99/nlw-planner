import Header1 from '@/components/header1'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ClockIcon, PlusIcon, TagIcon } from 'lucide-react'
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
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import CustomFormItem from '@/components/ui/custom-form-item'
import InputWithLeadingIcon from '@/components/form-fields/Input-with-leading-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'

export default function ActivitiesSection() {
  const formSchema = z.object({
    title: z.string().min(1).max(50),
    date: z.date(),
    time: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: undefined,
      time: ''
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <section className='mt-4 w-full'>
      <Dialog>
        <div className='w-full flex justify-between items-center'>
          <Header1>Atividades</Header1>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon size={16} />
              <span>Cadastrar atividade</span>
            </Button>
          </DialogTrigger>
        </div>
        <DaySection />

        <DialogContent className='w-full px-2'>
          <DialogHeader>
            <DialogTitle>Cadastrar atividade</DialogTitle>
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
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
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
              <Button className='w-full' type="submit">Salvar atividade</Button>
            </form>
          </Form>


        </DialogContent>
      </Dialog>
    </section>
  )
}
