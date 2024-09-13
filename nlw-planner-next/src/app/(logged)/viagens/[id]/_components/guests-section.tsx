'use client'

import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { useTrip } from '@/hooks/useTrip'
import { CircleCheckIcon, CircleDashedIcon } from 'lucide-react'
import { InviteStatus } from '.prisma/client'

interface Props {
  tripId: string
  className?: ClassNameValue
}

export default function GuestsSection({ tripId, className }: Props) {
  const { trip } = useTrip(tripId)

  return (
    <section className={cn('w-full space-y-2', className)}>
      <h2 className='text-xl font-bold'>Convidados</h2>
      <ul className='w-full space-y-2'>
        {trip?.Invites.map(invite => {
          return (
            <li className='w-full flex flex-row justify-between' key={invite.id}>
              <div className='max-w-[80%]'>
                <h3 className='text-base font-semibold capitalize'>{`${invite.User.firstName} ${invite.User.lastName}`}</h3>
                <p className='text-xs text-muted-foreground line-clamp-1'>{invite.guestEmail}</p>
              </div>
              {invite.inviteStatus === InviteStatus.ACCEPTED ? (
                <CircleCheckIcon className='text-primary' />
              ) : (
                <CircleDashedIcon className='' />
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}