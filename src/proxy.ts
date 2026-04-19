import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/select-role'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const role = req.cookies.get('user-role')?.value

  // Signed in but no role yet → redirect to select-role
  if (userId && !role) {
    if (req.nextUrl.pathname !== '/select-role') {
      return NextResponse.redirect(new URL('/select-role', req.url))
    }
  }

  // Signed in with role but on select-role → redirect to home
  if (userId && role) {
    if (req.nextUrl.pathname === '/select-role') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Not signed in and trying to access a protected route → protect it
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
