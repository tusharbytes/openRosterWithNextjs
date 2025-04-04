import { NextResponse } from 'next/server'

export function middleware(request) {
  try {
    const token = request.cookies.get('access_token')?.value

    const privateRoutes = [
      '/dashboard/settings',
      '/dashboard/editprofile',
      '/dashboard/subscription',
      '/dashboard'
    ]

    if (!token && privateRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard'
  ],
}
