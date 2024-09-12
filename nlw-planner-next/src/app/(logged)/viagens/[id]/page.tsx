import React from 'react'
import TripDetailsContents from './contents'
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

  return (
    <TripDetailsContents tripId={params.id} />
  )
}
