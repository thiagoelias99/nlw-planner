'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { UserServices } from '@/services/user-services'
// import { confirmToken } from '@/actions/confirm_token';
// import { getUser } from '@/actions/get_user';
import { Loader2Icon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { signIn } from 'next-auth/react'

export default function ConfirmEmailPageContents() {
  const userService = UserServices.getInstance()
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const token = searchParams.get('token') || ''

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(token)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function getUser() {
      if (userId) {
        const user = await userService.getUserById(userId)
        if (user) {
          setEmail(user.email)
        }
        setLoading(false)
      } else {
        toast({
          title: 'Usuário não encontrado',
        })
        router.push('/')
      }
    }

    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  async function handleConfirmToken() {
    setIsSubmitting(true)
    try {
      if (userId && otp) {
        const user = await userService.getUserById(userId)

        if (user?.confirmationToken === otp) {
          await signIn('credentials', { userId, token: otp, callbackUrl: '/viagens' })
        } else {
          toast({
            title: 'Token inválido',
            variant: 'destructive',
          })
        }
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao confirmar token',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center bg-card p-4 rounded-lg max-w-screen-sm shadow-shape text-card-foreground'>
      {loading ? (
        <Loader2Icon size='64' className='animate-spin' />
      ) : (
        <div className='w-full flex flex-col justify-start items-start gap-4'>
          <h1 className='text-lg text-justify'>Entre com o código de 6 digitos enviado para {email}</h1>
          <div className='self-center'>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className=''>-</span>}
              renderInput={(props) =>
                <div
                  className='flex flex-col items-center p-4 bg-foreground text-background text-2xl rounded-lg shadow-md'
                >
                  <input
                    {...props}
                    disabled={isSubmitting}
                    className='outline-none bg-transparent'
                  />
                </div>
              }
            />
          </div>
          <Button
            onClick={handleConfirmToken}
            className='w-full p-2 mt-2 rounded-lg'
            isLoading={isSubmitting}
          >
            Confirmar
          </Button>
        </div>
      )}
    </div>
  )
}
