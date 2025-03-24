"use client";


import style from '@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/photoModal.module.css';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import { Post as IPost} from "@/model/Post";
import { useQuery } from "@tanstack/react-query";

type Props ={
    id:string;
}

export default function ImageZone({id}:Props) {

    const {data:post, error, isLoading} = useQuery<IPost, object, IPost, [_1: string, _2:string]>({
        queryKey:['posts', id]
        , queryFn: getSinglePost
        , staleTime: 60 *1000 //fresh > stale, 기준은 5분 ( fresh상태에선 데이터를 가져오지 않음)
        , gcTime: 30*1000 // garbage collection, 5분이 지나면 데이터를 삭제
    });

    if (!post?.Images[0]) {
        return null;
    }

    return (
    <div className={style.imageZone}>
        <img src={post.Images[0].link} alt={post.content}/>
        <div className={style.image} style={{backgroundImage: `url(${post.Images[0].link})`}}/>
        <div className={style.buttonZone}>
        <div className={style.buttonInner}>
            <ActionButtons white />
        </div>
        </div>
    </div>
    );
}