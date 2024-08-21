import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { UserServices } from './services/user-services'
import { EmailNotVerifiedError, InvalidToken, UserNotFoundError } from './lib/errors'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userId: {},
        token: {}
      },

      authorize: async ({ userId, token }) => {
        let user: User | null = null

        const usersService = UserServices.getInstance()
        user = await usersService.getUserById(userId as string)

        if (!user) {
          throw new UserNotFoundError(userId as string)
        }

        if (user.confirmationToken !== token) {
          throw new InvalidToken(user.email as string)
        }

        await usersService.setEmailVerified(userId as string, true)

        console.log(user)

        return user
      },
    })
  ],
  secret: process.env.AUTH_SECRET
})