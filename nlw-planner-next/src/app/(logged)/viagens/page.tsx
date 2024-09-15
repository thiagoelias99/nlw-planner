'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { describeDateRange } from '@/lib/utils'
import { InviteStatus } from '@prisma/client'
import { CalendarIcon, CheckIcon, Loader2Icon, LucideIcon, MapPinIcon, UserCheck2Icon, Users2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TripDropDown from './_components/trip-dropdown'
import InviteDropDown from './_components/invite-dropdown'
import Link from 'next/link'
import Header1 from '@/components/header1'
import { useSession } from 'next-auth/react'
import { useTrips } from '@/hooks/useTrips'

export default function Viagens() {

  const { data: session } = useSession()
  const { trips, isLoadingTrips } = useTrips(session?.user.email)

  if (!session?.user) {
    redirect('/registro')
  }

  return (
    <main className='p-4'>
      <Header1 className='text-2xl font-bold'>Minhas Viagens</Header1>

      {isLoadingTrips ? (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <Loader2Icon className='animate-spin text-primary size-12' />
        </div>
      ) : (
        <div className='w-full mt-4 flex flex-col gap-4 max-w-screen-sm mx-auto'>
          {trips?.map(trip => {
            return (
              <Link
                key={trip.id}
                href={trip.isTripVerified ? `/viagens/${trip.id}` : ''}
                className={!trip.isTripVerified && trip.User.email !== session.user.email ? 'hidden' : ''}
              >
                <Card
                  className='hover:opacity-70 cursor-pointer'
                >
                  <CardHeader className='w-full pt-0.5 pb-3'>
                    <div className='w-full flex justify-between items-start'>

                      {!trip.isTripVerified && (
                        <div className='w-full text-red-600 flex justify-start items-baseline gap-0.5'>
                          <p className='text-sm'>Aguardando confirmação da viagem</p>
                        </div>
                      )}

                      {trip.isTripVerified && trip.User.email === session.user.email && (
                        <div className='w-full text-green-600 flex justify-start items-baseline gap-0.5'>
                          <CheckIcon className='h-6' />
                          <p className='text-sm'>Viagem Confirmada</p>
                        </div>
                      )}

                      {trip.User.email !== session.user.email && (
                        <div className='w-full flex justify-start items-baseline gap-0.5'>
                          <p className='text-sm'>{trip.Invites.find(invite => invite.guestEmail === session.user.email)?.inviteStatus === InviteStatus.ACCEPTED ? 'Presença confirmada' : 'Aguardando confirmação de presença'}</p>
                        </div>
                      )}

                      {trip.User.email === session.user.email ? (
                        <TripDropDown
                          tripId={trip.id}
                          tripIsConfirmed={trip.isTripVerified}
                        />
                      ) : (
                        <InviteDropDown
                          inviteId={trip.Invites.find(invite => invite.guestEmail === session.user.email)?.id}
                        />
                      )}
                    </div>

                    <div className='flex flex-row items-baseline justify-start gap-2'>
                      <MapPinIcon className='h-full' />
                      <CardTitle className='p-0 m-0'>{trip.destination}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className='flex flex-col justify-start items-start gap-1 pb-2'>
                    <CardItem
                      Icon={CalendarIcon}
                      value={describeDateRange(trip.startDate, trip.endDate)}
                    />
                    <CardItem
                      Icon={UserCheck2Icon}
                      label='Criado por'
                      value={`${trip.User.firstName} ${trip.User.lastName}`}
                    />
                    <CardItem
                      Icon={Users2Icon}
                      value={`${trip.Invites.length} convidados - ${trip.Invites.filter(invite => invite.inviteStatus === InviteStatus.ACCEPTED).length} confirmados`}
                    />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}

function CardItem({ Icon, label, value }: {
  Icon?: LucideIcon,
  label?: string,
  value: string
}) {
  return (
    <div className='flex justify-start items-baseline gap-2 text-muted-foreground'>
      {Icon && <Icon className='h-5' />}
      {label && <p>{label}</p>}
      <p>{value}</p>
    </div>
  )
}