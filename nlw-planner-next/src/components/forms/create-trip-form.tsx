'use client'

import DestinationAndDateInputs, { DestinationAndDateInputsFormValues } from '../form-fields/destination-and-date-inputs'
import { useState } from 'react'
import GuestsEmailsInput, { GuestEmailsInputFormValues } from '../form-fields/guests-emails-input'
import { CreateTripDto } from '@/dto/create-trip-dto'
import OwnerEmailInput, { OwnerEmailInputFormValues } from '../form-fields/owner-email-input'

export default function CreateTripForm() {
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

  function step1Submit(data: DestinationAndDateInputsFormValues) {
    setCreateTripDto((prev) => ({
      ...prev,
      destination: data.destination,
      startDate: data.startAt,
      endDate: data.endsAt,
    }))

    console.log('step1Submit')
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
    console.log(completeData)

    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)

    console.log('emailSubmit')
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <DestinationAndDateInputs
        onSubmit={step1Submit}
        disabled={formStep === 'second'}
        onBack={() => {
          setFormStep('first')
          console.log(formStep)
          console.log('back')
        }}
      />
      {formStep === 'second' && (
        <GuestsEmailsInput
          onSubmit={step2Submit}
          guestsEmails={createTripDto.guestsEmails}
          confirmAction={() => setOpenOwnerEmailInput(true)}
        />
      )}
      <OwnerEmailInput
        open={openOwnerEmailInput}
        onOpenChange={setOpenOwnerEmailInput}
        onSubmit={emailSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}