import { Image, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Input } from '@/components/input'
import { MapPinIcon, CalendarIcon, Settings2Icon } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'


export default function Index() {
  return (
    <View className='flex-1 justify-center items-center px-5'>
      <Image
        source={require('@/assets/logo.png')}
        className='h-8'
        resizeMode='contain'
      />

      <Text className='text-zinc-400 font-regular text-center text-lg mt-3'
      >Convide seus amigos e planeje sua{"\n"}próxima viagem</Text>

      <View className='w-full bg-zinc-900 p-4 rounded-xl my-8 border border-zinc-800'>
        <Input>
          <MapPinIcon color={colors.zinc[400]} size={20} />
          <Input.Field placeholder='Para onde?' />
        </Input>

        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field placeholder='Quando?' />
        </Input>

        <View className="border-b py-3 border-zinc-800">
          <Button
            variant="primary"
          // onPress={() => setStepForm(StepForm.TRIP_DETAILS)}
          >
            <Button.Title>Alterar local/data</Button.Title>
            <Settings2Icon color={colors.lime[950]} size={20} />
          </Button>
        </View>
      </View>
    </View>
  )
}