import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/infra/prisma'
import { describeDateRange, mapInviteStatus } from '@/lib/utils'
import { InviteStatus } from '@prisma/client'
import { CalendarIcon, CheckIcon, LucideIcon, MapPinIcon, UserCheck2Icon, Users2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TripDropDown from './_components/trip-dropdown'
import InviteDropDown from './_components/invite-dropdown'
import Link from 'next/link'

export default async function Viagens() {
  const session = await auth()

  if (!session?.user) {
    redirect('/registro')
  }

  const ownedTrips = await prisma.trip.findMany({
    where: {
      ownerEmail: session?.user.email || ''
    },
    include: {
      Invites: true
    }
  })

  const invitedTrips = await prisma.invites.findMany({
    where: {
      guestEmail: session?.user.email || '',
      inviteStatus: {
        not: InviteStatus.EXCLUDED
      }
    },
    include: {
      Trip: {
        include: {
          User: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      }
    }
  })

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold'>Minhas Viagens</h1>

      <div className='w-full mt-4 flex flex-col gap-4'>
        {ownedTrips.map(trip => {
          return (
            <Link
              key={trip.id}
              href={`/viagens/${trip.id}`}
            >
              <Card
                className='hover:opacity-70 cursor-pointer'
              >
                <CardHeader className='w-full pt-0.5 pb-3'>
                  <div className='w-full flex justify-between items-start'>
                    {trip.isTripVerified ? (
                      <div className='w-full text-green-600 flex justify-start items-baseline gap-0.5'>
                        <CheckIcon className='h-6' />
                        <p className='text-sm'>Confirmado</p>
                      </div>) : (
                      <div className='w-full text-red-600 flex justify-start items-baseline gap-0.5'>
                        <p className='text-sm'>Pendente</p>
                      </div>)}
                    <TripDropDown
                      tripId={trip.id}
                      tripIsConfirmed={trip.isTripVerified}
                    />
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
                    value={session.user.name || ''}
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
        {invitedTrips.map(invite => {
          return (
            <Card key={invite.Trip.id}>
              <CardHeader className='w-full pt-0.5 pb-3'>
                <div className='w-full flex justify-between items-start'>
                  <div className='w-full flex justify-start items-baseline gap-0.5'>
                    <p className='text-sm'>{mapInviteStatus(invite.inviteStatus)}</p>
                  </div>
                  <InviteDropDown
                    invite={invite}
                  />
                </div>

                <div className='flex flex-row items-baseline justify-start gap-2'>
                  <MapPinIcon className='h-full' />
                  <CardTitle className='p-0 m-0'>{invite.Trip.destination}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='flex flex-col justify-start items-start gap-1 pb-2'>
                <CardItem
                  Icon={CalendarIcon}
                  value={describeDateRange(invite.Trip.startDate, invite.Trip.endDate)}
                />
                <CardItem
                  Icon={UserCheck2Icon}
                  label='Criado por'
                  value={`${invite.Trip.User.firstName} ${invite.Trip.User.lastName}` || ''}
                />
              </CardContent>
            </Card>
          )
        })}
      </div>
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