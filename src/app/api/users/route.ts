// src/app/api/users/route.js
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';
import { getMemberUsers, getTeamUsers, getUserData } from '@/utils/data';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    console.log('category is: ', category)
    try {
        let users: Record<string, any>[] = [];
        if (category === "team")
            users = await getTeamUsers();
        else if (category === "member")
            users = await getMemberUsers();
        else
            users = await getUserData();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}