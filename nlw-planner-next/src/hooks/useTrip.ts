import { registerActivityAction } from '@/actions/activity/register-activity-action'
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

  //Register new link
  const { mutateAsync: registerLink, isPending: isRegisteringLink } = useMutation({
    mutationKey: ['registerLink', tripId],
    mutationFn: async (data: {
      title: string,
      url: string
    }) => {
      await registerLinkAction({ ...data, tripId })

      await queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
    }
  })

  //Register new activity
  const { mutateAsync: registerActivity, isPending: isRegisteringActivity } = useMutation({
    mutationKey: ['registerActivity', tripId],
    mutationFn: async (data: {
      title: string,
      dateTime: Date
    }) => {
      await registerActivityAction({ ...data, tripId })

      await queryClient.invalidateQueries({ queryKey: ['trip', tripId] })
    }
  })

  return { trip, registerLink, isRegisteringLink, registerActivity, isRegisteringActivity }
}

export { useTrip }