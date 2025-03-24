"user client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post as IPost} from "@/model/Post";
import { getUserPosts } from "../_lib/getUserPosts";
import Post from "../../_component/Post";

type Props ={
    username:string
}

export default function UserPosts({username}:Props) {
    const {data} = useQuery<IPost[], object, IPost[], [_1: string, _2:string, _3:string]>({
        queryKey:['posts', 'users', username]
        , queryFn: getUserPosts
        , staleTime: 60 *1000 //fresh > stale, 기준은 5분 ( fresh상태에선 데이터를 가져오지 않음)
        , gcTime: 30*1000 // garbage collection, 5분이 지나면 데이터를 삭제
    });

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['users', username]);
    
    if (user) {
        return data?.map((post) => (
            <Post key={post.postId} post={post} />
        ))
    }
    return null;
}