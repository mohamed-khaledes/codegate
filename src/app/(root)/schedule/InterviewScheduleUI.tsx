'use client'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useMutation, useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import UserInfo from '@/components/user-info'
import { Loader2Icon, XIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { TIME_SLOTS } from '@/constants'
import MeetingCard from '@/components/meeting-card'

function InterviewScheduleUI() {
  const client = useStreamVideoClient()
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const interviews = useQuery(api.interviews.getAllInterviews) ?? []
  const users = useQuery(api.users.getUsers) ?? []
  const createInterview = useMutation(api.interviews.createInterview)

  const candidates = users?.filter(u => u.role === 'candidate') || []
  const interviewers = users?.filter(u => u.role === 'interviewer') || []

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: null as Date | null,
    time: '09:00',
    candidateId: '',
    interviewerIds: [] as string[]
  })
  useEffect(() => {
    if (user?.id) {
      setFormData(prev => ({
        ...prev,
        interviewerIds: prev.interviewerIds.includes(user.id)
          ? prev.interviewerIds
          : [user.id, ...prev.interviewerIds]
      }))
    }
  }, [user?.id])
  const scheduleMeeting = async () => {
    if (!client || !user) return
    if (!formData.candidateId || formData.interviewerIds.length === 0) {
      toast.error('Please select both candidate and at least one interviewer')
      return
    }
    if (!formData.date) {
      toast.error('Please select a date')
      return
    }

    setIsCreating(true)

    try {
      const { title, description, date, time, candidateId, interviewerIds } = formData
      const [hours, minutes] = time.split(':')
      const meetingDate = new Date(date)
      meetingDate.setHours(parseInt(hours), parseInt(minutes), 0)

      const id = crypto.randomUUID()
      const call = client.call('default', id)

      await call.getOrCreate({
        data: {
          starts_at: meetingDate.toISOString(),
          custom: {
            description: title,
            additionalDetails: description
          }
        }
      })

      await createInterview({
        title,
        description,
        startTime: meetingDate.getTime(),
        status: 'upcoming',
        streamCallId: id,
        candidateId,
        interviewerIds
      })

      setOpen(false)
      toast.success('Meeting scheduled successfully!')

      setFormData({
        title: '',
        description: '',
        date: null,
        time: '09:00',
        candidateId: '',
        interviewerIds: user?.id ? [user.id] : []
      })
    } catch (error) {
      console.error(error)
      toast.error('Failed to schedule meeting. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const addInterviewer = (interviewerId: string) => {
    if (!formData.interviewerIds.includes(interviewerId)) {
      setFormData(prev => ({
        ...prev,
        interviewerIds: [...prev.interviewerIds, interviewerId]
      }))
    }
  }

  const removeInterviewer = (interviewerId: string) => {
    if (interviewerId === user?.id) return
    setFormData(prev => ({
      ...prev,
      interviewerIds: prev.interviewerIds.filter(id => id !== interviewerId)
    }))
  }

  const selectedInterviewers = interviewers.filter(i => formData.interviewerIds.includes(i.clerkId))
  const availableInterviewers = interviewers.filter(
    i => !formData.interviewerIds.includes(i.clerkId)
  )

  return (
    <div className='container max-w-7xl mx-auto p-6 space-y-8'>
      <div className='flex items-center justify-between'>
        {/* HEADER INFO */}
        <div>
          <h1 className='text-3xl font-bold'>Interviews</h1>
          <p className='text-muted-foreground mt-1'>Schedule and manage interviews</p>
        </div>

        {/* DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size='lg'>Schedule Interview</Button>
          </DialogTrigger>

          <DialogContent className='w-full sm:max-w-[600px] flex flex-col max-h-[85vh] p-0 gap-0'>
            {/* HEADER */}
            <DialogHeader className='px-6 py-4 border-b'>
              <DialogTitle className='text-lg font-semibold'>Schedule Interview</DialogTitle>
            </DialogHeader>

            {/* SCROLLABLE BODY */}
            <div className='flex-1 overflow-y-auto px-6 py-4 space-y-5'>
              {/* TITLE */}
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Title</label>
                <Input
                  placeholder='e.g. Frontend Engineer – Round 1'
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* DESCRIPTION */}
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Description</label>
                <Textarea
                  placeholder='What will be covered in this interview?'
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className='resize-none'
                />
              </div>

              {/* CANDIDATE */}
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Candidate</label>
                <Select
                  value={formData.candidateId}
                  onValueChange={candidateId => setFormData({ ...formData, candidateId })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select candidate' />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates?.map(candidate => (
                      <SelectItem key={candidate.clerkId} value={candidate.clerkId}>
                        <UserInfo user={candidate} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* INTERVIEWERS */}
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-foreground'>Interviewers</label>

                {selectedInterviewers?.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {selectedInterviewers?.map(interviewer => (
                      <div
                        key={interviewer.clerkId}
                        className='inline-flex items-center gap-2 bg-secondary border border-border rounded-md px-2.5 py-1 text-sm'
                      >
                        <UserInfo user={interviewer} />
                        {interviewer.clerkId !== user?.id && (
                          <button
                            onClick={() => removeInterviewer(interviewer.clerkId)}
                            className='hover:text-destructive transition-colors ml-1'
                          >
                            <XIcon className='h-3.5 w-3.5' />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {availableInterviewers?.length > 0 && (
                  <Select onValueChange={addInterviewer}>
                    <SelectTrigger>
                      <SelectValue placeholder='Add interviewer' />
                    </SelectTrigger>
                    <SelectContent>
                      {availableInterviewers?.map(interviewer => (
                        <SelectItem key={interviewer.clerkId} value={interviewer.clerkId}>
                          <UserInfo user={interviewer} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* DATE & TIME */}
              <div className='grid grid-cols-[1fr_auto] gap-4 items-start'>
                {/* CALENDAR */}
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-foreground'>Date</label>
                  <Calendar
                    mode='single'
                    selected={formData.date ?? undefined}
                    onSelect={date => date && setFormData({ ...formData, date })}
                    disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className='rounded-md border'
                  />
                </div>

                {/* TIME */}
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-foreground'>Time</label>
                  <Select
                    value={formData.time}
                    onValueChange={time => setFormData({ ...formData, time })}
                  >
                    <SelectTrigger className='w-[130px]'>
                      <SelectValue placeholder='Select time' />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* STICKY FOOTER */}
            <div className='px-6 py-4 border-t bg-background flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={scheduleMeeting} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2Icon className='mr-2 size-4 animate-spin' />
                    Scheduling...
                  </>
                ) : (
                  'Schedule Interview'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LOADING STATE & MEETING CARDS */}
      {!interviews ? (
        <div className='flex justify-center py-12'>
          <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
        </div>
      ) : interviews.length > 0 ? (
        <div className='space-y-4'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {interviews.map(interview => (
              <MeetingCard key={interview._id} interview={interview} />
            ))}
          </div>
        </div>
      ) : (
        <div className='text-center py-12 text-muted-foreground'>No interviews scheduled</div>
      )}
    </div>
  )
}

export default InterviewScheduleUI
