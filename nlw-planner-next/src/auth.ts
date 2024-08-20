import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { UserServices } from './services/user-services'
import { EmailNotVerifiedError, UserNotFoundError } from './lib/errors'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {}
      },

      authorize: async (credentials) => {
        let user: User | null = null

        const usersService = UserServices.getInstance()
        user = await usersService.getUserByEmail(credentials.email as string)

        if (!user) {
          throw new UserNotFoundError(credentials.email as string)
        }

        if (!user.isEmailVerified) {
          throw new EmailNotVerifiedError(credentials.email as string)
        }

        return user
      },
    })
  ],
  secret: process.env.AUTH_SECRET
})