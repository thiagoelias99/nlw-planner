'use server'

import { getMailClient } from '@/infra/mailer'

export async function sendUserLoginConfirmationTokenEmailAction(user: User, confirmationToken: string) {
  const mail = await getMailClient()

  await mail.sendMail({
    from: {
      name: 'Equipe planner',
      address: process.env.EMAIL_FROM as string
    },
    to: {
      name: user.name,
      address: user.email
    },
    subject: 'Confirme seu email',
    html: `
      <h1>Obrigado por acessar o Planner</h1>
      <p>Use o código abaixo para fazer login ou clique no link</p>
      <p>${confirmationToken}<p>
      <a href="${process.env.APPLICATION_URL}/verificar-token?id=${user.id}&token=${confirmationToken}">Clique aqui para confirmar o login</a>
  `
  })
}