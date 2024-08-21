'use client'

import { CircleUserIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

export default function LoginHeader({ session }: { session: Session | null }) {
  const router = useRouter()

  return (
    <div className='w-full p-2 flex justify-end items-center gap-1'>
      <CircleUserIcon />
      {session ? (
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          variant='ghost'
        >{session.user.name}
        </Button>
      ) : (<Button
        onClick={() => router.push('/entrar')}
        variant='ghost'
      >Entrar
      </Button>)}
    </div>
  )
}