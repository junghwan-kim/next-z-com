import {QueryFunction} from "@tanstack/query-core";
import {Post} from "@/model/Post";

export const getSearchResult: QueryFunction<Post[], [_1: string, _2: string, searchParams: { q: string, pf?: string, f?: string }]>= async ({ queryKey }) => {
    const [_1, _2, searchParams] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search/${searchParams.q}?${searchParams.toString()}`,{
        next:{
            tags: ['posts', 'search', searchParams.q]
        },
    });

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}