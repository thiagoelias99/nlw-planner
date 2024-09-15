import { getTripFromUser } from '@/actions/trip/get-trips-from-user'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useTrips = (userId?: string | null) => {
  const queryClient = useQueryClient()

  const { data: trips, isLoading: isLoadingTrips } = useQuery({
    queryKey: ['trips', userId],
    queryFn: async () => {
      return getTripFromUser(userId!)
    },
    enabled: !!userId,
  })

  return { trips, isLoadingTrips }
}

export { useTrips }