'use client'

import { updateTrip } from '@/actions/update-trip'
import DestinationAndDateInputs, { DestinationAndDateInputsFormValues } from '@/components/form-fields/destination-and-date-inputs'
import { useToast } from '@/components/ui/use-toast'
import { Trip as PrismaTrip } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface Props {
  trip?: PrismaTrip
}

export default function TripDetailsContents({ trip }: Props) {
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(data: DestinationAndDateInputsFormValues) {
    try {
      await updateTrip(trip?.id || '', { destination: data.destination, startDate: data.startAt, endDate: data.endsAt })
      router.refresh()
      toast({
        title: 'Viagem atualizada',
      })
    } catch (error) {

    }
  }

  return (
    <div>
      <h1>{trip?.destination}</h1>
      <DestinationAndDateInputs
        defaultValues={{
          destination: trip?.destination,
          startAt: trip?.startDate,
          endsAt: trip?.endDate,
        }}
        onSubmit={onSubmit}
      />
    </div>
  )
}
