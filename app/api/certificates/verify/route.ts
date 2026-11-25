import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isValidVerificationCode } from '@/lib/security';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')?.trim() ?? '';

  if (!code || !isValidVerificationCode(code)) {
    return NextResponse.json(
      { error: 'Please provide a valid credential verification ID.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { configured: false, found: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const { data, error } = await supabase.rpc('verify_certificate_by_code', {
    p_code: code,
  });

  if (error) {
    return NextResponse.json(
      { configured: true, found: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    return NextResponse.json(
      { configured: true, found: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json(
    {
      configured: true,
      found: true,
      certificate: {
        courseId: row.course_id,
        courseTitle: row.course_title ?? row.capstone_title,
        track: row.track ?? 'Apex Academy Track',
        verificationCode: row.verification_code,
        learnerName: row.learner_name,
        capstoneTitle: row.capstone_title,
        capstoneSummary: row.capstone_summary,
        artifactUrl: row.artifact_url ?? '',
        rubricScore: row.rubric_score,
        rubricBreakdown: [],
        skillsVerified: Array.isArray(row.skills_verified) ? row.skills_verified : [],
        instructorName: row.instructor_name ?? undefined,
        instructorRole: row.instructor_role ?? undefined,
        instructorOrg: row.instructor_org ?? undefined,
        issuedAt: row.issued_at,
      },
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}
