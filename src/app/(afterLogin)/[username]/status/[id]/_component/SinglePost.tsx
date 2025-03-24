"user client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post as IPost} from "@/model/Post";
import { getSinglePost } from "../_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";

type Props ={
    id:string;
    noImage?: boolean;
}

export default function SinglePost({id, noImage}:Props) {
    const {data:post, error, isLoading} = useQuery<IPost, object, IPost, [_1: string, _2:string]>({
        queryKey:['posts', id]
        , queryFn: getSinglePost
        , staleTime: 60 *1000 //fresh > stale, 기준은 5분 ( fresh상태에선 데이터를 가져오지 않음)
        , gcTime: 30*1000 // garbage collection, 5분이 지나면 데이터를 삭제
    });
    if (error) {
        return (
            <div style={{
                height: 100,
                alignItems: 'center',
                fontSize: 31,
                fontWeight: 'bold',
                justifyContent: 'center',
                display: 'flex'
              }}>게시글을 찾을 수 없습니다.</div>
        );
    }
    if (!post) {
        return null;
    }
    return <Post key={post.postId} post={post} noImage={noImage} />;
}