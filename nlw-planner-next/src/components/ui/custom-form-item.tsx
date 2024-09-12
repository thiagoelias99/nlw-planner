import React, { PropsWithChildren } from 'react'
import { FormItem } from './form'

export default function CustomFormItem({ children }: PropsWithChildren) {
  return (
    <FormItem
      className='bg-zinc-950 w-full min-h-14 flex flex-col justify-start items-center px-4 py-2.5 rounded-lg shadow-shape'
    >
      {children}
    </FormItem>
  )
}
