import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import DashboardBtn from './dashboard-btn'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

function Navbar() {
  return (
    <nav className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
      <div className='flex h-16 items-center justify-between px-4 container mx-auto'>
        {/* LOGO */}
        <Link
          href='/'
          className='flex items-center gap-2 font-semibold text-2xl font-mono hover:opacity-80 transition-opacity'
        >
          {/* <CodeIcon className='size-8 text-blue-500' />
          <span className='bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent'>
            CodeGate
          </span> */}
          <img src='/logo-bg.png' alt='codegate' className='w-28 lg:w-36' loading='lazy' />
        </Link>

        {/* RIGHT SIDE */}
        <div className='flex items-center gap-3'>
          <ModeToggle />

          <SignedIn>
            <DashboardBtn />
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode='modal'>
              <Button variant='outline' size='sm' className='font-medium'>
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button size='sm' className='font-medium'>
                Get started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
