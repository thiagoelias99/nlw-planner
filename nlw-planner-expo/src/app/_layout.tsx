import { Slot } from 'expo-router';
import { View, StatusBar, Text, ActivityIndicator } from 'react-native';

import "@/styles/global.css";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from "@expo-google-fonts/inter"
import Loading from '@/components/loading';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <View className='flex-1 bg-zinc-950 text-zinc-400'>
      <StatusBar
        barStyle='default'
        backgroundColor='transparent'
        translucent
      />
      <Slot />
    </View>
  )
}