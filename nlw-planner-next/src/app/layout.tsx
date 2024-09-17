import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import LoginHeader from '@/components/login-header'
import { auth } from '@/auth'
import Providers from './providers'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Planner',
  description: 'Planner',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <html lang="pt-BR" className='dark'>
      <SessionProvider session={session}>
        <Providers>
          <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}
          >
            <div>
              <LoginHeader session={session} />
              {children}
              <Toaster />
            </div>
          </body>
        </Providers>
      </SessionProvider>
    </html>
  )
}