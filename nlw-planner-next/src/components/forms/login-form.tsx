'use client'

import { z } from '@/lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'

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

const formSchema = z.object({
  email: z.string().email()
})

export default function LoginForm() {
  const searchParams = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    form.setValue('email', '')

    console.log(values)

    const isRegisterSuccess = true
    if (isRegisterSuccess) {
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Verifique seu email para continuar',
      })
    } else {
      toast({
        title: 'Erro ao cadastrar',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
      })
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
