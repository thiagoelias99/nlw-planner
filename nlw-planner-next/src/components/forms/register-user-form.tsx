'use client'

import { z } from '@/lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import InputWithLeadingIcon from '../form-fields/Input-with-leading-icon'
import { MailIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { UserServices } from '@/services/user-services'

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
})

export default function RegisterUserForm() {
  const usersServices = UserServices.getInstance()

  const searchParams = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: searchParams.get('email') ?? '',
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const userId = await usersServices.createUser(values)

      form.reset()
      form.setValue('email', '')

      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Verifique seu email para continuar',
      })
      setIsSubmitting(false)
      router.push('/verificar-token?id=' + userId)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao cadastrar',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 bg-card p-4 rounded-xl shadow-shape">
          <div className='contents md:flex gap-4'>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithLeadingIcon
                      {...field}
                      Icon={UserIcon}
                      placeholder="Primeiro Nome"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithLeadingIcon
                      {...field}
                      placeholder="Sobrenome"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLeadingIcon
                    {...field}
                    Icon={MailIcon}
                    placeholder="Email"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
          >Confirmar</Button>
        </form>
      </Form>
    </div>
  )
}
