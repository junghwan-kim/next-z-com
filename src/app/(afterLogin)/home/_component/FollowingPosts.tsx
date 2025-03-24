"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { Post as IPost} from "@/model/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";

export default function FollowingPosts() {
    const {data, isPending } = useSuspenseQuery<IPost[]>({
        queryKey:['posts', 'followings']
        , queryFn: getFollowingPosts
        , staleTime: 60 *1000 //fresh > stale, 기준은 5분 ( fresh상태에선 데이터를 가져오지 않음)
        , gcTime: 30*1000 // garbage collection, 5분이 지나면 데이터를 삭제
    });

    return data?.map((post) => (
        <Post key={post.postId} post={post} />
    ))
}