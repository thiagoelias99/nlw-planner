'use client'

import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { useTrip } from '@/hooks/useTrip'
import { AtSignIcon, CircleCheckIcon, CircleDashedIcon, PlusIcon, UserIcon } from 'lucide-react'
import { InviteStatus } from '.prisma/client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
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
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'


interface Props {
  tripId: string
  className?: ClassNameValue
}

const formSchema = z.object({
  guestName: z.string().min(2).max(50),
  guestEmail: z.string().email()
})

export default function GuestsSection({ tripId, className }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const { toast } = useToast()
  const { trip, inviteGuest, isInvitingGuest } = useTrip(tripId)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestEmail: '',
      guestName: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await inviteGuest(values)
      form.reset()
      setOpenDialog(false)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao cadastrar link',
        variant: 'destructive',
      })
    }
  }

  return (
    <section className={cn('w-full space-y-2', className)}>


      <Dialog open={openDialog} onOpenChange={setOpenDialog}>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h2 className='text-xl font-bold'>Convidados ({trip?.Invites.length})</h2>
            </AccordionTrigger>
            <AccordionContent>
              {trip?.Invites.length === 0 && (
                <p className='text-muted-foreground'>Nenhum convidado adicionado.</p>
              )}
              <ul className='w-full space-y-2'>
                {trip?.Invites.map(invite => {
                  return (
                    <li className='w-full flex flex-row justify-between' key={invite.id}>
                      <div className='max-w-[80%]'>
                        <h3 className='text-base font-semibold capitalize'>{`${invite.User.firstName} ${invite.User.lastName}`}</h3>
                        <p className='text-xs text-muted-foreground line-clamp-1'>{invite.guestEmail}</p>
                      </div>
                      {invite.inviteStatus === InviteStatus.ACCEPTED ? (
                        <CircleCheckIcon className='text-primary' />
                      ) : (
                        <CircleDashedIcon className='' />
                      )}
                    </li>
                  )
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>



        <DialogTrigger asChild>
          <Button
            variant='secondary'
            className='w-full'
          >
            <PlusIcon />
            Convidar novo usuário
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convidar usuário</DialogTitle>
            <DialogDescription>
              Adicione um novo usuário à viagem.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="guestName"
                render={({ field }) => (
                  <CustomFormItem>
                    <FormControl>
                      <InputWithLeadingIcon
                        Icon={UserIcon}
                        placeholder='Nome' {...field} />
                    </FormControl>
                    <FormMessage />
                  </CustomFormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guestEmail"
                render={({ field }) => (
                  <CustomFormItem>
                    <FormControl>
                      <InputWithLeadingIcon
                        Icon={AtSignIcon}
                        placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </CustomFormItem>
                )}
              />
              <Button isLoading={isInvitingGuest} className='w-full' type="submit">Convidar</Button>
            </form>
          </Form>

        </DialogContent>
      </Dialog>
    </section>
  )
}