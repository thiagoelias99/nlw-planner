'use client'

import { queryClient } from '@/infra/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
