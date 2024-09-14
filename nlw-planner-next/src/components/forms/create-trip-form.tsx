'use client'

import DestinationAndDateInputs, { DestinationAndDateInputsFormValues } from '../form-fields/destination-and-date-inputs'
import { useState } from 'react'
import GuestsEmailsInput, { GuestEmailsInputFormValues } from '../form-fields/guests-emails-input'
import { CreateTripDto } from '@/dto/create-trip-dto'
import OwnerEmailInput, { OwnerEmailInputFormValues } from '../form-fields/owner-email-input'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { TripServices } from '@/services/trip-services'
import { useSession } from 'next-auth/react'

export default function CreateTripForm() {
  const tripServices = TripServices.getInstance()
  const { data: session } = useSession()

  const [createTripDto, setCreateTripDto] = useState<CreateTripDto>({
    ownerEmail: '',
    destination: '',
    startDate: new Date(),
    endDate: new Date(),
    guestsEmails: [],
  })
  const [formStep, setFormStep] = useState<'first' | 'second'>('first')
  const [openOwnerEmailInput, setOpenOwnerEmailInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  function step1Submit(data: DestinationAndDateInputsFormValues) {
    setCreateTripDto((prev) => ({
      ...prev,
      destination: data.destination,
      startDate: data.startAt,
      endDate: data.endsAt,
    }))

    setFormStep('second')
  }

  function step2Submit(data: GuestEmailsInputFormValues[]) {
    setCreateTripDto((prev) => ({
      ...prev,
      guestsEmails: data,
    }))
  }

  async function emailSubmit(data: OwnerEmailInputFormValues) {
    const completeData = {
      ...createTripDto,
      ownerEmail: data.email,
    }
    setCreateTripDto(completeData)
    setIsSubmitting(true)

    const { isEmailVerified } = await tripServices.createTrip(completeData)

    setIsSubmitting(false)
    setOpenOwnerEmailInput(false)

    if (!isEmailVerified) {
      router.push('/registro?email=' + data.email)
    } else {
      toast({
        title: 'Viagem criada com sucesso!',
        description: 'Verifique seu email para continuar',
      })
      router.push('/entrar?email=' + data.email)
    }
  }

  async function handleConfirm() {
    if (session?.user.email) {

      const completeData = {
        ...createTripDto,
        ownerEmail: session?.user.email,
      }

      setCreateTripDto(completeData)

      setIsSubmitting(true)

      await tripServices.createTrip(completeData)

      toast({
        title: 'Viagem criada com sucesso!',
        description: 'Verifique seu email para continuar',
      })

      router.push('/viagens')
  
      setIsSubmitting(false)
    } else {
      setOpenOwnerEmailInput(true)
    }
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <DestinationAndDateInputs
        onSubmit={step1Submit}
        disabled={formStep === 'second'}
        onBack={() => { setFormStep('first') }}
      />
      {formStep === 'second' && (
        <GuestsEmailsInput
          onSubmit={step2Submit}
          guestsEmails={createTripDto.guestsEmails}
          confirmAction={handleConfirm}
          isSubmitting={isSubmitting}
        />
      )}
      <OwnerEmailInput
        open={openOwnerEmailInput}
        onOpenChange={setOpenOwnerEmailInput}
        onSubmit={emailSubmit}
        isSubmitting={isSubmitting}
        destination={createTripDto.destination}
      />
    </div>
  )
}