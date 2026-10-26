import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'RajkumarV_Resume_Updated.pdf');

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Resume not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="RajkumarV_Resume_Updated.pdf"',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
