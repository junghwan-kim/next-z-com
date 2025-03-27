import { cookies } from "next/headers";


export const getUserServer = async ({queryKey}: { queryKey: [string, string] }) => {
    const [_1, username] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,{
        next:{
            tags: ['users', username]
        },
        credentials: 'include',
        headers:{Cookie: (await cookies()).toString()} //서버에서 브라우져에 쿠키를 전달하기 위해
    });

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}