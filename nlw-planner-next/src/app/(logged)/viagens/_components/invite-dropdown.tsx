'use client'

import { confirmTrip } from '@/actions/confirm-trip'
import { setInviteStatus } from '@/actions/set-invite-status'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { Invites, InviteStatus } from '@prisma/client'
import { EllipsisVerticalIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface TripDropDownProps {
  invite: Invites
}

export default function InviteDropDown({ invite }: TripDropDownProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleConfirmButton() {
    setIsSubmitting(true)
    try {
      await setInviteStatus(invite.id, InviteStatus.ACCEPTED)
      toast({
        title: 'Presença confirmada',
      })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao confirmar presença',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRejectButton() {
    setIsSubmitting(true)
    try {
      await setInviteStatus(invite.id, InviteStatus.REJECTED)
      toast({
        title: 'Convite rejeitado',
      })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao rejeitar convite',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleExcludeButton() {
    setIsSubmitting(true)
    try {
      await setInviteStatus(invite.id, InviteStatus.EXCLUDED)
      toast({
        title: 'Convite excluído',
      })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao excluir convite',
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
        <DropdownMenuItem
          onClick={handleConfirmButton}
        >Confirmar</DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleRejectButton}
        >Rejeitar</DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleExcludeButton}
        >Apagar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
