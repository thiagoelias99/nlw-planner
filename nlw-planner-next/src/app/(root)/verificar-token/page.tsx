import React, { Suspense } from 'react'
import ConfirmEmailPageContents from './_contents'
import { Loader2Icon } from 'lucide-react'


export default function ConfirmEmailPage() {
  return (
    <div>
      <Suspense fallback={<Loader2Icon size='64' className='animate-spin' />}>
        <ConfirmEmailPageContents />
      </Suspense>
    </div>
  )
}
