
import { dehydrate, HydrationBoundary, Query, QueryClient } from '@tanstack/react-query';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import style from './home.module.css';
import { getPostRecommends } from './_lib/getPostRecommends';

import { Suspense } from 'react';
import Loading from './loading';
import TabDeciderSuspence from './_component/TabDeciderSuspence';



export default async function Home(){

    
    return (
        <main className={style.main}>            
            <TabProvider>
                <Tab />
                <PostForm />
                <Suspense fallback={<Loading />}>
                    <TabDeciderSuspence />
                </Suspense>
            </TabProvider>    
        </main>
    )
}