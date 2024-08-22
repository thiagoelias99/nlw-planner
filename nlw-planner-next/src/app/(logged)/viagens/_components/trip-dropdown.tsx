'use client'

import { confirmTrip } from '@/actions/confirm-trip'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { EllipsisVerticalIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface TripDropDownProps {
  tripId: string
  tripIsConfirmed: boolean
}

export default function TripDropDown({ tripId, tripIsConfirmed }: TripDropDownProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleConfirmButton() {
    setIsSubmitting(true)
    try {
      await confirmTrip(tripId)
      toast({
        title: 'Viagem confirmada',
        description: 'Seus convidados foram notificados',
      })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao confirmar viagem',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isSubmitting ? (
          <Button
            variant='ghost'
            size='icon'
            disabled
          >
            <Loader2Icon className='animate-spin' />
          </Button>
        ) : (
          <Button
            variant='ghost'
            size='icon'
          >
            <EllipsisVerticalIcon />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!tripIsConfirmed && (
          <DropdownMenuItem
            onClick={handleConfirmButton}
          >Confirmar</DropdownMenuItem>
        )}
        <DropdownMenuItem
        >Apagar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
