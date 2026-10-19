import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isMaintenanceMode, MAINTENANCE_PATH } from './lib/maintenance'

const RETRY_AFTER_SECONDS = '86400'

function maintenanceResponse(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Scheduled jobs are secret-protected and handle DB failures themselves
  if (pathname.startsWith('/api/cron')) return null

  if (pathname.startsWith('/api')) {
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503, headers: { 'Retry-After': RETRY_AFTER_SECONDS } }
    )
  }

  const url = request.nextUrl.clone()
  url.pathname = MAINTENANCE_PATH
  return NextResponse.rewrite(url, {
    status: 503,
    headers: { 'Retry-After': RETRY_AFTER_SECONDS },
  })
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isMaintenanceMode()) {
    const response = maintenanceResponse(request)
    if (response) return response
  } else if (pathname === MAINTENANCE_PATH) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Only admin routes need the session check below
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — IMPORTANT: do not remove this
  const { data: { user } } = await supabase.auth.getUser()

  // Protect /api/admin/* routes — return JSON 401 (no redirect)
  if (pathname.startsWith('/api/admin')) {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // Protect all /admin/* routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!user) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }
  }

  // If already logged in, redirect away from login page
  if (pathname === '/admin/login' && user) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/admin'
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}

export const config = {
  // Everything except build assets and static files in /public
  matcher: ['/((?!_next/static|_next/image|robots.txt|.*\\.(?:png|jpe?g|gif|svg|webp|ico|mp3|woff2?)$).*)'],
}
