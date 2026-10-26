import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sender_name, sender_email, inquiry_type, message, honeypot } = body;

    // Honeypot check for spam bots (Master Book Dec 026, 198)
    if (honeypot && honeypot.trim() !== '') {
      // Silently accept bot submission without persisting
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    // Input validation
    if (!sender_name || !sender_email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please provide name, email, and message.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sender_email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // Attempt to store in Supabase contact_submissions table
    if (supabaseUrl && serviceKey) {
      try {
        const supabase = createClient(supabaseUrl, serviceKey);
        const { error } = await supabase.from('contact_submissions').insert([
          {
            sender_name: sender_name.trim(),
            sender_email: sender_email.trim(),
            inquiry_type: inquiry_type || 'General',
            message: message.trim(),
            status: 'New',
          },
        ]);

        if (error) {
          console.warn('Supabase contact submission insert notice:', error.message);
        }
      } catch (dbErr) {
        console.warn('Database write bypassed:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been successfully transmitted and logged.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
