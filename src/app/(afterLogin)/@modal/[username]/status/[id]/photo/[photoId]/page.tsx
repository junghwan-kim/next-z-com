import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import style from './photoModal.module.css';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import ImageZone from "./_component/ImageZone";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";

type Props = {
    params: Promise<{ id: string }>;
  }

export default async function Default(props: Props){

    const {id} = await props.params;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['posts', id], queryFn: getSinglePost});
    await queryClient.prefetchQuery({queryKey:['posts', id, 'comments'], queryFn: getComments});
    const dehydratedState = dehydrate(queryClient);

    return (
        <div className={style.container}>
            <HydrationBoundary state={dehydratedState}>
                <PhotoModalCloseButton />
                <ImageZone id={id} />
                <div className={style.commentZone}>
                    <SinglePost id={id} noImage />
                    <CommentForm id={id} />
                    <Comments id={id} />
                </div>
            </HydrationBoundary>
        </div>
    );
}