import React, { PropsWithChildren } from 'react'
import { FormItem } from './form'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: ClassNameValue
}

export default function CustomFormItem({ children, className }: Props) {
  return (
    <FormItem
      className={cn('bg-zinc-950 w-full min-h-14 flex flex-col justify-start items-center px-4 py-2.5 rounded-lg shadow-shape', className)}
    >
      {children}
    </FormItem>
  )
}
