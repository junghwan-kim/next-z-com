"use client";


import { useRouter } from 'next/navigation';
import style from './post.module.css';
import { Post } from '@/model/Post';

type Props = {
    children: React.ReactNode;
    post:Post;
};

export default function PostArticle({children, post}: Props) {
    const router = useRouter();
    let target = post;
    if(post.Original){
        target = post.Original;
    }
    const onClick=()=>{
        router.push(`/${target.User.id}/status/${target.postId}`);
    };
    return (
        <article onClick={onClick} className={style.post}>{children}</article>
    );
}