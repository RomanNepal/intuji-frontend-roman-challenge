import { NextRequest, NextResponse } from 'next/server';
import { getMemberUsers, getTeamUsers, getUserData } from '@/helpers/dbHelper';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    try {
        let users: Record<string, any>[] = [];

        if (category === "team") {
            users = await getTeamUsers();
        } else if (category === "member") {
            users = await getMemberUsers();
        } else {
            users = await getUserData();
        }

        return NextResponse.json(users);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}