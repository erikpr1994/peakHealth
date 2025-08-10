import { NextRequest, NextResponse } from 'next/server';

import { assignProgram } from '../../../../../features/client-management/services/clientService';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const programData = await request.json();
    await assignProgram(programData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error assigning program:', error);
    return NextResponse.json(
      { error: 'Failed to assign program' },
      { status: 500 }
    );
  }
}
