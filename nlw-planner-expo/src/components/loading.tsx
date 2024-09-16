import { ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
    <ActivityIndicator
      size={42}
      className='flex-1 justify-center items-center bg-zinc-950 text-lime-300'
    />
  )
}
