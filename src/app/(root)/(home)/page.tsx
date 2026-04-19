'use client'

import ActionCard from '@/components/action-card'
import { QUICK_ACTIONS } from '@/constants'
import { useUserRole } from '@/hooks/useUserRole'
import { useQuery } from 'convex/react'
import { useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { useRouter } from 'next/navigation'
import MeetingModal from '@/components/meeting-modal'
import LoaderUI from '@/components/loader'
import { Loader2Icon, VideoIcon, ShieldCheckIcon, CalendarIcon, UsersIcon } from 'lucide-react'
import MeetingCard from '@/components/meeting-card'
import { useUser } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const FEATURES = [
  {
    icon: VideoIcon,
    title: 'HD Video Interviews',
    description: 'Crystal-clear video calls with real-time collaboration tools built in.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure & Private',
    description: 'End-to-end encrypted sessions. Your interviews stay confidential.'
  },
  {
    icon: CalendarIcon,
    title: 'Smart Scheduling',
    description: 'Schedule and manage interviews effortlessly across time zones.'
  },
  {
    icon: UsersIcon,
    title: 'Multi-Interviewer',
    description: 'Invite multiple interviewers to join and collaborate in real time.'
  }
]

function LandingPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* HERO */}
      <div className='relative overflow-hidden'>
        {/* background grid pattern */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* blue glow */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none' />

        <div className='relative container max-w-5xl mx-auto px-6 pt-24 pb-20 text-center'>
          <div className='inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-blue-500/20'>
            <span className='w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse' />
            Technical Interview Platform
          </div>

          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]'>
            Interview smarter,
            <span className='block bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent'>
              hire better.
            </span>
          </h1>

          <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed'>
            A streamlined platform for conducting live technical interviews with built-in video,
            collaborative code editing, and seamless scheduling.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <SignInButton mode='modal'>
              <Button size='lg' className='w-full sm:w-auto px-8 h-12 text-base'>
                Get started free
              </Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button size='lg' variant='outline' className='w-full sm:w-auto px-8 h-12 text-base'>
                Sign in
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className='container max-w-5xl mx-auto px-6 py-20'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-3'>Everything you need</h2>
          <p className='text-muted-foreground'>
            Built for engineering teams that take hiring seriously.
          </p>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className='rounded-xl border bg-card p-6 flex flex-col gap-3 hover:border-blue-500/40 hover:shadow-sm transition-all duration-200'
            >
              <div className='w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center'>
                <Icon className='w-5 h-5 text-blue-500' />
              </div>
              <h3 className='font-semibold text-base'>{title}</h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA STRIP */}
      <div className='border-t'>
        <div className='container max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6'>
          <div>
            <h3 className='text-2xl font-bold'>Ready to run better interviews?</h3>
            <p className='text-muted-foreground mt-1'>Join in seconds. No credit card required.</p>
          </div>
          <SignInButton mode='modal'>
            <Button size='lg' className='px-8 h-12 text-base shrink-0'>
              Start for free
            </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const { isInterviewer, isCandidate, isLoading } = useUserRole()
  const interviews = useQuery(api.interviews.getMyInterviews)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'start' | 'join'>()

  const handleQuickAction = (title: string) => {
    switch (title) {
      case 'New Call':
        setModalType('start')
        setShowModal(true)
        break
      case 'Join Interview':
        setModalType('join')
        setShowModal(true)
        break
      default:
        router.push(`/${title.toLowerCase()}`)
    }
  }

  // Clerk hasn't resolved yet
  if (!isLoaded) return <LoaderUI />

  // Not signed in — show landing page
  if (!user) return <LandingPage />

  // Role still loading
  if (isLoading) return <LoaderUI />

  return (
    <div className='container max-w-7xl mx-auto p-6'>
      {/* WELCOME SECTION */}
      <div className='rounded-lg bg-card p-6 border shadow-sm mb-10'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent'>
          Welcome back{user.firstName ? `, ${user.firstName}` : ''}!
        </h1>
        <p className='text-muted-foreground mt-2'>
          {isInterviewer
            ? 'Manage your interviews and review candidates effectively'
            : isCandidate
              ? 'Access your upcoming interviews and preparations'
              : ''}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {QUICK_ACTIONS.map(action => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === 'join' ? 'Join Meeting' : 'Start Meeting'}
            isJoinMeeting={modalType === 'join'}
          />
        </>
      ) : (
        <>
          <div>
            <h1 className='text-3xl font-bold'>Your Interviews</h1>
            <p className='text-muted-foreground mt-1'>View and join your scheduled interviews</p>
          </div>

          <div className='mt-8'>
            {interviews === undefined ? (
              <div className='flex justify-center py-12'>
                <Loader2Icon className='h-8 w-8 animate-spin text-muted-foreground' />
              </div>
            ) : interviews.length > 0 ? (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {interviews.map(interview => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className='text-center py-12 text-muted-foreground'>
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
