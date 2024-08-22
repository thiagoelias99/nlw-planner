'use client'

import { Session } from 'next-auth'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface AsideMenuProps {
  session: Session | null
}

export default function AsideMenu({ session }: AsideMenuProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const linkClassName = cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-end')

  return (
    <aside>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>{session?.user.name}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Olá {session?.user.name}</SheetTitle>
            <SheetDescription>
              {session?.user.email}
            </SheetDescription>
          </SheetHeader>
          <nav className='w-full mt-6 flex flex-col justify-end items-end gap-4'>
            <Link
              href='/'
              className={linkClassName}
              onClick={() => setIsSheetOpen(false)}
            >Nova viagem</Link>
            <Link
              href='/viagens'
              className={linkClassName}
              onClick={() => setIsSheetOpen(false)}
            >Minhas Viagens</Link>
            <Button
              onClick={() => {
                setIsSheetOpen(false)
                signOut({ callbackUrl: '/' })
              }}
              variant='ghost'
              className='w-full justify-end'
            >
              Sair
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </aside>
  )
}
