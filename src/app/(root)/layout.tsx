import StreamClientProvider from '@/components/providers/stream-client-provider'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return <StreamClientProvider>{children}</StreamClientProvider>
}

export default Layout
