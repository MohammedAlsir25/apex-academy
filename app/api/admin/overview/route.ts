import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { COURSES } from '@/lib/curriculum';
import { isServerSupabaseConfigured } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const auth = await verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { error: 'Admin authentication required.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const totalLessons = COURSES.reduce((sum, c) => sum + c.modules.length, 0);
  const tracks = Array.from(new Set(COURSES.map((c) => c.track)));

  return NextResponse.json(
    {
      adminEmail: auth.email,
      authMethod: auth.method,
      supabaseConfigured: isServerSupabaseConfigured,
      catalogSummary: {
        totalCourses: COURSES.length,
        totalLessons,
        totalTracks: tracks.length,
        courses: COURSES.map((course) => ({
          id: course.id,
          title: course.title,
          track: course.track,
          level: course.level,
          lessons: course.modules.length,
          durationHours: course.durationHours,
          capstoneTitle: course.capstoneTitle,
          instructor: course.instructor.name,
        })),
      },
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}
