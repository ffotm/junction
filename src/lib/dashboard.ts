import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = createClient();
        const { data: stats, error } = await supabase
            .from('dashboard_stats_view')
            .select('*')
            .single();

        if (error) throw error;

        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        );
    }
}