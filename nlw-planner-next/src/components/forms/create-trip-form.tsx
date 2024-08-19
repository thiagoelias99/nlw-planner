'use client'

import DestinationAndDateInputs, { DestinationAndDateInputsFormValues } from '../form-fields/destination-and-date-inputs'
import { useState } from 'react'
import GuestsEmailsInput, { GuestEmailsInputFormValues } from '../form-fields/guests-emails-input'
import { CreateTripDto } from '@/dto/create-trip-dto'

export default function CreateTripForm() {
  const [createTripDto, setCreateTripDto] = useState<CreateTripDto>({
    ownerEmail: '',
    destination: '',
    startDate: new Date(),
    endDate: new Date(),
    guestsEmails: [],
  })
  const [formStep, setFormStep] = useState<'first' | 'second'>('first')

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
        />
      )}
    </div>
  )
}