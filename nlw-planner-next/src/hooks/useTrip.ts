import { registerLinkAction } from '@/actions/links/register-link-action'
import { getTrip } from '@/actions/trip/get-trip'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useTrip = (tripId: string) => {

  const queryClient = useQueryClient()

  const { data: trip } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => {
      return getTrip(tripId)
    }
  })

  const { mutateAsync: registerLink, isPending: isRegisteringLink } = useMutation({
    mutationKey: ['updateTrip', tripId],
    mutationFn: async (data: {
      title: string,
      url: string
    }) => {
      await registerLinkAction({ ...data, tripId })

      await queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
    }
  })

  return { trip, registerLink, isRegisteringLink }
}

export { useTrip }