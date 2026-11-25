import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  type NotificationPreferences,
} from '@/lib/email-templates';

export async function GET() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { preferences: DEFAULT_NOTIFICATION_PREFERENCES },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('notification_preferences')
    .eq('id', userData.user.id)
    .maybeSingle();

  return NextResponse.json(
    {
      preferences: {
        ...DEFAULT_NOTIFICATION_PREFERENCES,
        ...((profile?.notification_preferences as Partial<NotificationPreferences> | null) ?? {}),
      },
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function PATCH(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase is not configured in this environment.' },
      { status: 400 }
    );
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const preferences: NotificationPreferences = {
    welcome: typeof raw.welcome === 'boolean' ? raw.welcome : true,
    completion: typeof raw.completion === 'boolean' ? raw.completion : true,
    weeklyStreak: typeof raw.weeklyStreak === 'boolean' ? raw.weeklyStreak : true,
  };

  const { error } = await supabase
    .from('profiles')
    .update({
      notification_preferences: preferences,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    return NextResponse.json(
      { error: 'Could not save notification preferences.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { preferences },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}
