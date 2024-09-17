import { Image, ImageBackground, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input } from '@/components/input'
import { MapPinIcon, CalendarIcon, Settings2Icon, UserRoundPlusIcon, ArrowRightIcon } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

export default function Index() {
  // LOADING
  const [isCreatingTrip, setIsCreatingTrip] = useState(false)
  const [isGettingTrip, setIsGettingTrip] = useState(true)

  // DATA
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS)
  // const [selectedDates, setSelectedDates] = useState({} as DatesSelected)
  const [destination, setDestination] = useState("")
  const [emailToInvite, setEmailToInvite] = useState("")
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  // MODAL
  const [showModal, setShowModal] = useState(MODAL.NONE)

  function handleNextStepForm() {
    setStepForm(StepForm.ADD_EMAIL)
  }



  return (
    <View className='flex-1 justify-center items-center px-5'>
      <Image
        source={require('@/assets/logo.png')}
        className='h-8'
        resizeMode='contain'
      />

      <Image
        source={require('@/assets/bg.png')}
        className='absolute'
      />

      <Text className='text-zinc-400 font-regular text-center text-lg mt-3'
      >Convide seus amigos e planeje sua{"\n"}próxima viagem</Text>

      <View className='w-full bg-zinc-900 p-4 rounded-xl my-8 border border-zinc-800'>
        <Input>
          <MapPinIcon color={colors.zinc[400]} size={20} />
          <Input.Field
            editable={stepForm === StepForm.TRIP_DETAILS}
            placeholder='Para onde?' />
        </Input>

        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field
            editable={stepForm === StepForm.TRIP_DETAILS}
            placeholder='Quando?' />
        </Input>

        {stepForm === StepForm.ADD_EMAIL && (
          <>
            <View className="border-b py-3 border-zinc-800">
              <Button
                variant="secondary"
                onPress={() => setStepForm(StepForm.TRIP_DETAILS)}
              >
                <Button.Title>Alterar local/data</Button.Title>
                <Settings2Icon color={colors.lime[950]} size={20} />
              </Button>
            </View>

            <Input>
              <UserRoundPlusIcon color={colors.zinc[400]} size={20} />
              <Input.Field placeholder='Quem estará na viagem?' />
            </Input>
          </>
        )}

        <Button
          variant="primary"
          onPress={handleNextStepForm}
        >
          <Button.Title>
            {stepForm === StepForm.TRIP_DETAILS ? "Continuar" : "Confirmar viagem"}
          </Button.Title>
          <ArrowRightIcon color={colors.lime[950]} size={20} />
        </Button>
      </View>

      <Text className="text-zinc-500 font-regular text-center text-base">
        Ao planejar sua viagem pela plann.er você automaticamente concorda com
        nossos{" "}
        <Text className="text-zinc-300 underline">
          termos de uso e políticas de privacidade.
        </Text>
      </Text>
    </View>
  )
}