import Image from 'next/image'

export default function Header() {
  return (
    <header className='w-full flex flex-col justify-center items-center gap-3.5'>
      <Image src='/Logo.png' width={172} height={0} alt='Planner Logo' />
      <span className='text-lg'>Convide seus amigos e planeje sua próxima viagem!</span>
    </header>
  )
}
