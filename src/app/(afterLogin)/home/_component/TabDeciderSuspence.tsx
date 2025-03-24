import { Suspense } from "react";
import TabDecider from "./TabDecider";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default async function TabDeciderSuspence(){
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey:['posts', 'recommends']
        , queryFn: getPostRecommends
        , initialPageParam: 0
    });
    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydratedState}>
            <TabDecider />
        </HydrationBoundary>
    );
}