'use client'


import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import DestinationAndDateInputs from '../form-fields/destination-and-date-inputs'
import { Button } from '@/components/ui/button'
import { z } from '@/lib/pt-zod'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  ownerEmail: z.string().email(),
  destination: z.string().min(1),
  startAt: z.union([
    z.string().date().transform((data) => new Date(data)),
    z.string().datetime().transform((data) => new Date(data)),
    z.date(),
  ]),
  endsAt: z.union([
    z.string({ required_error: 'Data de término é obrigatória' }).date().transform((data) => new Date(data)),
    z.string({ required_error: 'Data de término é obrigatória' }).datetime().transform((data) => new Date(data)),
    z.date({ required_error: 'Data de término é obrigatória' }),
  ]),
  guestsEmails: z.array(z.object(
    {
      name: z.string().min(1),
      email: z.string().email(),
    })).optional(),
})


export default function CreateTripForm() {
  const [formStep, setFormStep] = useState<'first' | 'second'>('first')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: undefined,
      startAt: undefined,
      endsAt: undefined,
      ownerEmail: undefined,
      guestsEmails: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  function handleStep1Continue() {
    form.trigger()
  }

  function handleStep1Back() {
    setFormStep('first')
  }


  useEffect(() => {
    if (form.getValues('destination') && form.getValues('endsAt')) {
      setFormStep('second')
    }
  }, [form.getValues('destination'), form.getValues('endsAt')])


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <DestinationAndDateInputs
          form={form}
          destinationInputName="destination"
          startAtInputName="startAt"
          endsAtInputName="endsAt"
          disabled={formStep === 'second'}
          onContinue={handleStep1Continue}
          onBack={handleStep1Back}
        />
      </form>
    </Form>
  )
}
