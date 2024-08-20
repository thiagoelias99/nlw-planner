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
import { MailIcon } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { UserServices } from '@/services/user-services'

const formSchema = z.object({
  email: z.string().email()
})

export default function LoginForm() {
  const usersServices = UserServices.getInstance()

  const searchParams = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const user = await usersServices.getUserByEmail(values.email)

      if (!user || !user?.isEmailVerified) {
        router.push('/registro?email=' + values.email)
        return
      }

      await usersServices.sendEmailVerification(user.email)

      form.setValue('email', '')

      toast({
        title: 'Email enviado',
        description: 'Verifique sua caixa de entrada',
      })

      setIsSubmitting(false)
      router.push('/verificar-token?id=' + user.id)

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
