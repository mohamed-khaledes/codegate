'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CodeIcon, UsersIcon } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Cookies from 'js-cookie'

export default function SelectRolePage() {
  const { user } = useUser()
  const [selected, setSelected] = useState<'interviewer' | 'candidate' | null>(null)
  const [loading, setLoading] = useState(false)
  const updateRole = useMutation(api.users.updateUserRole)
  const handleConfirm = async () => {
    if (!selected || !user) return
    setLoading(true)
    try {
      await user.update({ unsafeMetadata: { role: selected } })
      await updateRole({ clerkId: user.id, role: selected })

      // Save role to cookie so middleware can read it
      Cookies.set('user-role', selected, { expires: 365 })

      window.location.href = '/'
    } catch (error) {
      console.error('Error updating role:', error)
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='w-full max-w-md px-6'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-2'>What's your role?</h1>
          <p className='text-muted-foreground'>
            This helps us personalize your experience on CodeGate.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-6'>
          <button
            onClick={() => setSelected('interviewer')}
            className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${
              selected === 'interviewer'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-border hover:border-blue-500/40 hover:bg-muted/50'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selected === 'interviewer' ? 'bg-blue-500/20' : 'bg-muted'
              }`}
            >
              <UsersIcon
                className={`w-6 h-6 ${selected === 'interviewer' ? 'text-blue-500' : 'text-muted-foreground'}`}
              />
            </div>
            <div className='text-center'>
              <p className='font-semibold'>Interviewer</p>
              <p className='text-xs text-muted-foreground mt-1'>
                I conduct interviews and evaluate candidates
              </p>
            </div>
          </button>

          <button
            onClick={() => setSelected('candidate')}
            className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${
              selected === 'candidate'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-border hover:border-blue-500/40 hover:bg-muted/50'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selected === 'candidate' ? 'bg-blue-500/20' : 'bg-muted'
              }`}
            >
              <CodeIcon
                className={`w-6 h-6 ${selected === 'candidate' ? 'text-blue-500' : 'text-muted-foreground'}`}
              />
            </div>
            <div className='text-center'>
              <p className='font-semibold'>Candidate</p>
              <p className='text-xs text-muted-foreground mt-1'>
                I'm here to practice and attend interviews
              </p>
            </div>
          </button>
        </div>

        <Button className='w-full h-11' disabled={!selected || loading} onClick={handleConfirm}>
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}
