'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { UserRoundPlusIcon, XIcon, AtSignIcon, PlusIcon, ArrowRightIcon } from 'lucide-react'
import Divider from '../ui/divider'
import { Button } from '../ui/button'
import { z } from '@/lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export type GuestEmailsInputFormValues = z.infer<typeof formSchema>

interface GuestEmailsInputProps {
  onSubmit: (values: GuestEmailsInputFormValues[]) => void
  guestsEmails: GuestEmailsInputFormValues[]
  confirmAction: () => void
}

export default function GuestsEmailsInput({ onSubmit: parentOnSubmit, guestsEmails, confirmAction }: GuestEmailsInputProps) {
  const [guestEmails, setGuestEmails] = useState<GuestEmailsInputFormValues[]>(guestsEmails)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  function onSubmit(data: GuestEmailsInputFormValues) {
    if (guestEmails.find((guest) => guest.email === data.email)) {
      return
    }

    const guestEmailsToSet = [...guestEmails, data]
    setGuestEmails(guestEmailsToSet)
    parentOnSubmit(guestEmailsToSet)
    form.reset()
  }

  function handleDeleteGuest(email: string) {
    const newGuestsEmails = guestEmails.filter((guest) => guest.email !== email)
    setGuestEmails(newGuestsEmails)
    parentOnSubmit(newGuestsEmails)
  }

  return (
    <div className='bg-card rounded-xl shadow-shape w-full pl-6 pr-4 py-5'>
      <Dialog>

        <div className='w-full flex flex-col md:flex-row gap-4'>
          <DialogTrigger asChild>
            <Button className='w-full bg-transparent hover:bg-transparent text-muted-foreground text-lg flex flex-row justify-start items-center gap-4 font-normal px-1'>
              <UserRoundPlusIcon size={18} />
              {guestEmails.length === 0 ? (
                <span>Quem estará na viagem?</span>) : (
                <span>{guestEmails.length} pessoa(s) convidada(s)</span>
              )}
            </Button>
          </DialogTrigger>
          <Button
            type='button'
            onClick={confirmAction}
          >
            <span>Confirmar Viagem</span>
            <ArrowRightIcon size={18} />
          </Button>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar convidados</DialogTitle>
            <DialogDescription>
              Os convidados irão receber e-mails para confirmar a participação na viagem.
            </DialogDescription>
          </DialogHeader>
          <div className='w-full flex justify-start items-center flex-wrap gap-2'>
            {guestEmails.map((guest, index) => (
              <div key={index} className='bg-popover text-popover-foreground flex px-2.5 py-1.5 justify-start items-center gap-2.5 rounded-md'>
                <p>{guest.email}</p>
                <XIcon
                  className='h-4 w-4 text-zinc-400 cursor-pointer'
                  onClick={() => handleDeleteGuest(guest.email)}
                />
              </div>
            ))}
          </div>

          <Divider />

          <div className='w-full flex flex-col justify-start items-center gap-5 pl-6 pr-4 py-4 bg-black rounded-xl shadow-shape'>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='w-full flex flex-1 justify-start items-center gap-2'>
                          <UserRoundPlusIcon className='h-5 w-5 text-zinc-400' />
                          <Input
                            {...field}
                            className='bg-transparent placeholder:text-zinc-400 outline-none border-0'
                            type="text"
                            placeholder="Digite o nome do convidado" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='w-full flex flex-1 justify-start items-center gap-2'>
                          <AtSignIcon className='h-5 w-5 text-zinc-400' />
                          <Input
                            {...field}
                            className='bg-transparent placeholder:text-zinc-400 outline-none border-0'

                            type="text"
                            placeholder="Digite o email do convidado" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='button'
                  className='w-full'
                >
                  <p>Convidar</p>
                  <PlusIcon className='h-5 w-5' />
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
