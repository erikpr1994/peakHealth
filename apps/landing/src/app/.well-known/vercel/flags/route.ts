import { type NextRequest, NextResponse } from 'next/server';
import { verifyAccess, type ApiData } from '@vercel/flags';
import { getProviderData } from '@flags-sdk/hypertune';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const access = await verifyAccess(request.headers.get('Authorization'));
  if (!access) {
    return NextResponse.json(null, { status: 401 });
  }

  const token = process.env.HYPERTUNE_ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json(null, { status: 500 });
  }

  const data = await getProviderData({
    token,
  });
  return NextResponse.json<ApiData>(data);
}
