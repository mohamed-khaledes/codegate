import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useMeetingActions = () => {
  const router = useRouter()
  const client = useStreamVideoClient()
  const [loading, setLoading] = useState(false)
  const createInstantMeeting = async () => {
    if (!client) return
    try {
      setLoading(true)
      const id = crypto.randomUUID()
      const call = client.call('default', id)
      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: 'instant meeting'
          }
        }
      })
      router.push(`/meeting/${call.id}`)
      toast.success('Meeting created')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
      toast.error('Failed to create a meeting')
    } finally {
      setLoading(false)
    }
  }
  const joinMeeting = (callId: string) => {
    if (!client) return toast.error('Failed to join meeting. Please try again.')
    router.push(`/meeting/${callId}`)
  }

  return { createInstantMeeting, joinMeeting, loading }
}

export default useMeetingActions
