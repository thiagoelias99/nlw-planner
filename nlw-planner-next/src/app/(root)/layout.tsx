import { PropsWithChildren } from 'react'
import Footer from './_components/footer'
import Header from './_components/header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='w-full max-w-screen-md mx-auto h-screen p-4 flex flex-col justify-center items-center bg-pattern bg-no-repeat bg-center'>
      <Header />
      <main className='w-full py-10'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
