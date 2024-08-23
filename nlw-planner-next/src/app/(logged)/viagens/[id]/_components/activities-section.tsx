import Header1 from '@/components/header1'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import DaySection from './day-section'

export default function ActivitiesSection() {
  return (
    <section className='mt-4'>
      <div className='w-full flex justify-between items-center'>
        <Header1>Atividades</Header1>
        <Button>
          <PlusIcon size={16} />
          <span>Cadastrar atividade</span>
        </Button>
      </div>

      <DaySection />
    </section>
  )
}
