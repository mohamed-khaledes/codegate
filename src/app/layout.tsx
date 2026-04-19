import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import './globals.css'
import ConvexClerkProvider from '@/components/providers/convex-clerk-provider'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'react-hot-toast'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

const BASE_URL = 'https://codegate-indol.vercel.app/'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'CodeGate — Technical Interview Platform',
    template: '%s | CodeGate'
  },

  description:
    'CodeGate is a full-stack technical interview platform with live HD video calls, real-time collaborative code editing, and smart interview scheduling for engineering teams.',

  keywords: [
    'technical interview platform',
    'live coding interview',
    'collaborative code editor',
    'video interview',
    'hire engineers',
    'coding interview tool',
    'remote interview platform'
  ],

  authors: [{ name: 'CodeGate' }],
  creator: 'CodeGate',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'CodeGate',
    title: 'CodeGate — Technical Interview Platform',
    description:
      'Run live technical interviews with HD video, collaborative code editing, and smart scheduling. Built for modern engineering teams.',
    images: [
      {
        url: '/og-image.png', // 1200x630px image in /public
        width: 1200,
        height: 630,
        alt: 'CodeGate — Technical Interview Platform'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: 'CodeGate — Technical Interview Platform',
    description:
      'Run live technical interviews with HD video, collaborative code editing, and smart scheduling.',
    images: ['/og-image.png'],
    creator: '@m7md5aled22' // 🔁 replace with your Twitter handle
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg' }]
  },

  manifest: '/site.webmanifest',

  alternates: {
    canonical: BASE_URL
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className='min-h-screen'>
              <Navbar />
              <main className='px-4 sm:px-6 lg:px-8'>{children}</main>
            </div>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  )
}
