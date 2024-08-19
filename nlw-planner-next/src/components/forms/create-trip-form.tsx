'use client'


import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from 'postcss'
import DestinationAndDateInputs from '../form-fields/destination-and-date-inputs'
import { Button } from '@/components/ui/button'
import { z } from '@/lib/pt-zod'


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


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DestinationAndDateInputs
          form={form}
          destinationInputName="destination"
          startAtInputName="startAt"
          endsAtInputName="endsAt"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
