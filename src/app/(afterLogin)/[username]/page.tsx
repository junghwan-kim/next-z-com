import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import style from './profile.module.css';
import UserPosts from './_component/UserPosts';
import UserInfo from './_component/UserInfo';
import { getUserPosts } from './_lib/getUserPosts';
import { getUserServer } from './_lib/getUserServer';
import { auth } from '@/auth';
import { User } from 'next-auth';

type Props={
    params: Promise<{username: string}>
}

export async function generateMetadata({params}: Props){
    const {username} = await params;
    const user: User = await getUserServer({ queryKey: ["users", username] });
    return {
        title: `${user.name} (${user.id}) / Z`,
        description: `${user.name} (${user.id}) 프로필`,
    }
}

export default async function Profile(props: Props){
    const {username} = await props.params;
    const session = await auth();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey:['users', 'id'], queryFn: getUserServer});
    await queryClient.prefetchQuery({queryKey:['posts', 'users', username], queryFn: getUserPosts});
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className={style.main}>
            <HydrationBoundary state={dehydratedState}>
                <UserInfo username={username} session={session} />
                <div>
                    <UserPosts username={username} />
                </div>
            </HydrationBoundary>
        </main>
    );
}