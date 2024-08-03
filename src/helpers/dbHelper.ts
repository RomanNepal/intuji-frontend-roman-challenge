import { db } from '@/lib/firebase';
import { query, orderByChild, equalTo, get, ref, set } from 'firebase/database';

const allContactList = [
    {
        id: 1,
        name: "21 Industries",
        image_url: "https://sriit.ac.in/tool/plugins/images/users/4.jpg",
        status: "offline",
        last_active: "2024-08-1 03:14:07.499999",
        category: "team",
    },
    {
        id: 2,
        name: "Darcy Patterson",
        image_url: "https://sriit.ac.in/tool/plugins/images/users/8.jpg",
        status: "online",
        last_active: "2024-08-01 03:14:07.499999",
        category: "member",
    },
    {
        id: 3,
        name: "Alex Hamilton",
        image_url: "https://sriit.ac.in/tool/plugins/images/users/1.jpg",
        status: "away",
        last_active: "2024-7-28 03:14:07.499999",
        category: "member",
    },
    {
        id: 4,
        name: "Bowen Group",
        image_url: "https://sriit.ac.in/tool/plugins/images/users/3.jpg",
        status: "offline",
        last_active: "2024-7-1 03:14:07.499999",
        category: "team",
    },
    {
        id: 5,
        name: "Tailor Smith",
        image_url: "https://sriit.ac.in/tool/plugins/images/users/5.jpg",
        status: "online",
        last_active: "2024-8-1 11:14:07.499999",
        category: "member",
    },
];

//this function is run only for uploading static data above
export const uploadData = async () => {
    try {
        const dataRef = ref(db, 'users');
        await set(dataRef, allContactList);
        console.log('Data uploaded successfully');
    } catch (error) {
        console.error('Error uploading data:', error);
    }
};

export const getUserData = async () => {
    try {
        const dataRef = ref(db, 'users');
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            return userData;
        } else {
            console.log('No data available');
            return null;
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

export const getTeamUsers = async () => {
    try {
        const usersRef = ref(db, 'users');
        const teamusersQuery = query(
            usersRef,
            orderByChild('category'),
            equalTo('team')
        );

        const snapshot = await get(teamusersQuery);
        if (snapshot.exists()) {
            const teamUsers: Record<string, any>[] = [];
            snapshot.forEach((childSnapshot) => {
                teamUsers.push(childSnapshot.val());
            });
            return teamUsers;
        } else {
            console.log('No team users found');
            return [];
        }
    } catch (error) {
        console.error('Error getting team users:', error);
        return [];
    }
};

export const getMemberUsers = async () => {
    try {
        const usersRef = ref(db, 'users');
        const memberUserQuery = query(
            usersRef,
            orderByChild('category'),
            equalTo('member')
        );

        const snapshot = await get(memberUserQuery);
        if (snapshot.exists()) {
            const memberUsers: Record<string, any>[] = [];
            snapshot.forEach((childSnapshot) => {
                memberUsers.push(childSnapshot.val());
            });
            return memberUsers;
        } else {
            console.log('No member users found');
            return [];
        }
    } catch (error) {
        console.error('Error getting member users:', error);
        return [];
    }
};
