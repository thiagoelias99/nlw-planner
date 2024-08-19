'use client'

import { CircleUserIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function LoginHeader() {
  const router = useRouter()

  return (
    <div className='w-full p-2 flex justify-end items-center gap-1'>
      <CircleUserIcon />
      <Button
        onClick={() => router.push('/entrar')}
        variant='ghost'
      >Entrar
      </Button>
    </div>
  )
}
