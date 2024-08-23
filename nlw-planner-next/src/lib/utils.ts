import { InviteStatus } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Create a random confirmation token with 6 numeric digits
export function createConfirmationToken() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

//Describe date range
export function describeDateRange(startAt: Date, endsAt: Date, locale = ptBR) {
  return `${format(startAt, 'dd \'de\' LLL y', { locale: locale })} a ${format(endsAt, 'dd \'de\' LLL y', { locale: ptBR })}`
}

export function mapInviteStatus(inviteStatus: InviteStatus): string {
  switch (inviteStatus) {
    case InviteStatus.ACCEPTED:
      return 'Confirmado'
    case InviteStatus.REJECTED:
      return 'Rejeitado'
    case InviteStatus.PENDING:
    default:
      return 'Pendente'
  }
}