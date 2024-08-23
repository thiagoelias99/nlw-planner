import { cn } from '@/lib/utils'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: ClassNameValue
}

export default function Header1({ children, className }: Props) {
  return (
    <h1
      className={cn('text-2xl font-bold', className)}
    >{children}
    </h1>
  )
}
