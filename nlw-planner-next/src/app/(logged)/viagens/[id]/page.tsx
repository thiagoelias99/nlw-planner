import React from 'react'
import TripDetailsContents from './_components/contents'
import { notFound } from 'next/navigation'
import prisma from '@/infra/prisma'
import { Trip } from '@prisma/client'

interface Props {
  params: {
    id?: string
  }
}

export default async function TripDetails({ params }: Props) {
  if (!params.id) {
    return notFound()
  }

  const trip = await prisma.trip.findUnique({
    where: {
      id: params.id
    }
  })

  return (
    <TripDetailsContents
      trip={trip as Trip}
    />
  )
}
