import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const getSinglePostServer = async ({ queryKey }: { queryKey: [string, string ]}) => {
    const [_1, id] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,{
        next:{
            tags: ['posts', id]
        },
        credentials: 'include',
        headers:{Cookie: (await cookies()).toString()} //서버에서 브라우져에 쿠키를 전달하기 위해
    });

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}