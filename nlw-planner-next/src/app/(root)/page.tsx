import Header from './_components/header'
import CreateTripForm from '@/components/forms/create-trip-form'
import Footer from './_components/footer'

export default function Home() {
  return (
    <div className='w-full max-w-screen-md mx-auto h-screen p-4 flex flex-col justify-center items-center bg-pattern bg-no-repeat bg-center'>
      <Header />
      <main className='w-full py-10'>
        <CreateTripForm />
      </main>
      <Footer />
    </div>
  )
}
