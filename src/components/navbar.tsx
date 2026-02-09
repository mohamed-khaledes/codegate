import Link from 'next/link'
import { CodeIcon } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import DashboardBtn from './dashboard-btn'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

function Navbar() {
  return (
    <nav className='border-b'>
      <div className='flex h-16 items-center justify-between px-4 container mx-auto'>
        {/* LEFT SIDE -LOGO */}
        <Link
          href='/'
          className='flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity'
        >
          <CodeIcon className='size-8 text-blue-500' />
          <span className='bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent'>
            CodeGate
          </span>
        </Link>
        <div>
          {/* RIGHT SIDE - ACTIONS */}
          <SignedIn>
            <div className='flex items-center space-x-4 ml-auto'>
              <DashboardBtn />
              <ModeToggle />
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className='gap-2 font-medium mx-2' size={'sm'}>
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className='gap-2 font-medium' size={'sm'}>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
