import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { ArrowRightIcon, LucideUser, LucideMail } from 'lucide-react'
import { FormField, FormItem, FormControl, FormMessage, Form } from '../ui/form'
import { Dispatch, SetStateAction, useState } from 'react'
import { z } from '@/lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import InputWithLeadingIcon from './Input-with-leading-icon'

const formSchema = z.object({
  email: z.string().email(),
})

export type OwnerEmailInputFormValues = z.infer<typeof formSchema>

interface OwnerEmailInputProps {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  onSubmit: (values: OwnerEmailInputFormValues) => void
  isSubmitting: boolean
}

export default function OwnerEmailInput({ open, onOpenChange, onSubmit, isSubmitting }: OwnerEmailInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='w-full'>
        <DialogHeader>
          <DialogTitle>Confirmar criação da viagem</DialogTitle>
          <DialogDescription>
            Para concluir a criação da viagem para <strong className='text-foreground'>Floripa</strong>, preencha seus dados abaixo:
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='w-full flex flex-1 flex-col justify-start items-start gap-2 bg-background text-foreground shadow-shape rounded-lg px-4 py-2.5'>
                  <FormControl>
                    <InputWithLeadingIcon
                      Icon={LucideMail}
                      placeholder='Seu email pessoal'
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full'
              isLoading={isSubmitting}
            >
              Confirmar criação da viagem
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
