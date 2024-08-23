import { cn } from '@/lib/utils'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: ClassNameValue
}

export default function Header2({ children, className }: Props) {
  return (
    <h2
      className={cn('text-lg font-bold', className)}
    >{children}
    </h2>
  )
}
