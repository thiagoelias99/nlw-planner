'use client'

import React, { ComponentProps } from 'react'
import { Input } from '../ui/input'
import { LucideIcon, MapPinIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'

interface Props extends ComponentProps<'input'> {
  Icon?: LucideIcon
  containerClassName?: ClassNameValue
}

export default function InputWithLeadingIcon({ Icon, containerClassName, ...rest }: Props) {
  return (
    <div className='flex w-full flex-row justify-start items-start'>
      {Icon ? <Icon className='mt-2 mr-2 text-muted-foreground' /> : <div className='mt-2 mr-8'></div>}
      <Input
        {...rest}
        className='bg-transparent text-lg text-foreground border-0 outline-none disabled:text-foreground disabled:opacity-100' />
    </div>
  )
}
