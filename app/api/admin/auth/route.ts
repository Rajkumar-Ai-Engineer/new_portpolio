import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken, verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth/adminAuth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    let isValid = false;
    let authUserEmail = email.toLowerCase().trim();

    // 1. Authoritative Admin Governance Credential check (instant execution)
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || 'admin@rajkumar-ai.com').toLowerCase().trim();
    const configuredAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (authUserEmail === configuredAdminEmail && password === configuredAdminPassword) {
      isValid = true;
    }

    // 2. If not matched, try Supabase Auth with a 4-second safety timeout
    if (!isValid && supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        });

        const authPromise = supabase.auth.signInWithPassword({
          email: authUserEmail,
          password,
        });

        const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) =>
          setTimeout(() => resolve({ data: null, error: { message: 'Supabase auth timed out' } }), 4000)
        );

        const result: any = await Promise.race([authPromise, timeoutPromise]);
        if (result?.data?.session) {
          isValid = true;
          authUserEmail = result.data.user.email || authUserEmail;
        }
      } catch (err) {
        console.warn('Supabase auth attempt error:', err);
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid administrator email or password.' },
        { status: 401 }
      );
    }

    // Generate authenticated session token
    const token = createAdminToken(authUserEmail);

    const response = NextResponse.json({
      success: true,
      user: { email: authUserEmail, role: 'admin' },
      message: 'Authentication successful.',
    });

    const isHttps = req.nextUrl.protocol === 'https:';

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Authentication failed.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully.',
  });

  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifyAdminToken(token);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: { email: session.email, role: session.role },
  });
}
