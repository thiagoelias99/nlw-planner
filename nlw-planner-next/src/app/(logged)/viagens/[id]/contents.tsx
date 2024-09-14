'use client'

import { updateTrip } from '@/actions/update-trip'
import DestinationAndDateInputs, { DestinationAndDateInputsFormValues } from '@/components/form-fields/destination-and-date-inputs'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import ActivitiesSection from './_components/activities-section'
import LinksSection from './_components/links-section'
import { useTrip } from '@/hooks/useTrip'
import GuestsSection from './_components/guests-section'
import { Loader2Icon } from 'lucide-react'

export default function TripDetailsContents({ tripId }: { tripId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const { trip, isLoadingTrip, isLoadingActivities } = useTrip(tripId)

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
    <div className='p-4 space-y-8'>
      {isLoadingTrip || isLoadingActivities ? (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <Loader2Icon className='animate-spin text-primary size-12' />
        </div>
      ) : (
        <>
          <DestinationAndDateInputs
            defaultValues={{
              destination: trip?.destination,
              startAt: trip?.startDate,
              endsAt: trip?.endDate,
            }}
            onSubmit={onSubmit}
          />
          <LinksSection tripId={tripId} />
          <GuestsSection tripId={tripId} />
          <ActivitiesSection tripId={tripId} />
        </>
      )}

    </div>
  )
}