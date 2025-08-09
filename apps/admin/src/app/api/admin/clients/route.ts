import { NextRequest, NextResponse } from 'next/server';

import { getClients } from '../../../../features/client-management/api/clients';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const search = request.nextUrl?.searchParams.get('search') || undefined;
    const page = parseInt(request.nextUrl?.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(
      request.nextUrl?.searchParams.get('pageSize') || '10',
      10
    );

    const filters = { search };
    const response = await getClients(filters, page, pageSize);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}
