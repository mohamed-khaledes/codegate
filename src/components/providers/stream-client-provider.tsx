'use client'
import { ReactNode, useEffect, useState } from 'react'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import LoaderUI from '../loader'
import { streamTokenProvider } from '@/actions/stream.actions'

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient>()
  const { user, isLoaded } = useUser()
  useEffect(() => {
    if (!isLoaded || !user) return
    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_key!,
      user: {
        id: user?.id,
        name: user?.firstName || '' + user?.lastName || '' || user?.id,
        image: user?.imageUrl
      },
      tokenProvider: streamTokenProvider
    })
    setStreamVideoClient(client)
  }, [user, isLoaded])

  // Clerk hasn't loaded yet — show loader
  if (!isLoaded) return <LoaderUI />

  // User is not signed in — render children directly (Clerk will redirect)
  if (!user) return <>{children}</>

  // Stream client not ready yet
  if (!streamVideoClient) return <LoaderUI />
  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>
}

export default StreamClientProvider

// const StreamClientProvider = ({ children }: { children: ReactNode }) => {
//   const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient>()
//   const { user, isLoaded } = useUser()

//   useEffect(() => {
//     if (!isLoaded || !user) return

//     const client = new StreamVideoClient({
//       apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
//       user: {
//         id: user.id,
//         name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.id,
//         image: user.imageUrl,
//       },
//       tokenProvider: streamTokenProvider
//     })

//     setStreamVideoClient(client)

//     return () => {
//       client.disconnectUser()
//       setStreamVideoClient(undefined)
//     }
//   }, [user, isLoaded])

//   // Clerk hasn't loaded yet — show loader
//   if (!isLoaded) return <LoaderUI />

//   // User is not signed in — render children directly (Clerk will redirect)
//   if (!user) return <>{children}</>

//   // Stream client not ready yet
//   if (!streamVideoClient) return <LoaderUI />

//   return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>
// }
