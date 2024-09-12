'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { z } from '@/lib/pt-zod'
import { Link2Icon, PlusIcon, TagIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form'
import InputWithLeadingIcon from '@/components/form-fields/Input-with-leading-icon'
import CustomFormItem from '@/components/ui/custom-form-item'


export default function LinksSection() {
  const formSchema = z.object({
    title: z.string().min(2).max(50),
    url: z.string().url(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }


  return (
    <section className='w-full space-y-2'>
      <h2 className='text-xl font-bold'>Links Importantes</h2>
      <ul className='w-full space-y-2'>
        <li className='w-full flex flex-row justify-between'>
          <div>
            <h3 className='text-base font-semibold'>Reserva do Airbnb</h3>
            <p className='text-xs text-muted-foreground'>asdasdasdasdasasas</p>
          </div>
          <Link2Icon />
        </li>
        <li className='w-full flex flex-row justify-between'>
          <div>
            <h3 className='text-base font-semibold'>Reserva do Airbnb</h3>
            <p className='text-xs text-muted-foreground'>asdasdasdasdasasas</p>
          </div>
          <Link2Icon />
        </li>
        <li className='w-full flex flex-row justify-between'>
          <div>
            <h3 className='text-base font-semibold'>Reserva do Airbnb</h3>
            <p className='text-xs text-muted-foreground'>asdasdasdasdasasas</p>
          </div>
          <Link2Icon />
        </li>
      </ul>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='secondary'
            className='w-full'
          >
            <PlusIcon />
            Cadastrar novo link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar link</DialogTitle>
            <DialogDescription>
              Todos convidados podem visualizar os links importantes.
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
                        placeholder='Título do link' {...field} />
                    </FormControl>
                    <FormMessage />
                  </CustomFormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <CustomFormItem>
                    <FormControl>
                      <InputWithLeadingIcon
                        Icon={Link2Icon}
                        placeholder='URL' {...field} />
                    </FormControl>
                    <FormMessage />
                  </CustomFormItem>
                )}
              />
              <Button className='w-full' type="submit">Salvar link</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
