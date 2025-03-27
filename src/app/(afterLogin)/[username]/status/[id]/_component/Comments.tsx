"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post as IPost} from "@/model/Post";
import { getSinglePost } from "../_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";
import { getComments } from "../_lib/getComments";

type Props ={
    id:string;
}

export default function Comments({id}:Props) {
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData(['posts', id]);
    const {data, error, isLoading} = useQuery<IPost[], object, IPost[], [_1: string, _2:string, _3:string]>({
        queryKey:['posts', id, 'comments']
        , queryFn: getComments
        , staleTime: 60 *1000 //fresh > stale, 기준은 5분 ( fresh상태에선 데이터를 가져오지 않음)
        , gcTime: 30*1000 // garbage collection, 5분이 지나면 데이터를 삭제
        ,  enabled: !!post,
    });
    if (post) {
        return data?.map((post) => <Post post={post} key={post.postId} />)
    }
    return null;
}