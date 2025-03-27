"use client";

import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import FollowRecommend from "./FollowRecommend";


export default function FollowRecommendSection(){
    const {data} = useQuery<User[]>({
        queryKey:['users', 'followRecommends']
        , queryFn: getFollowRecommends
        , staleTime: 60 *1000 //fresh > stale, 기준은 5분 ( fresh상태에선 데이터를 가져오지 않음)
        , gcTime: 30*1000 // garbage collection, 5분이 지나면 데이터를 삭제
    });


    return data?.map((user) =>(
        <FollowRecommend user={user} key={user.id} />
    ))
}