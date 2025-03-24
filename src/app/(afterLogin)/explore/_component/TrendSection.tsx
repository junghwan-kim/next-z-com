"use client";

import { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../../_lib/getTrends";
import Trend from "../../_component/Trend";

export default function TrendSection() {
    const {data} = useQuery<Hashtag[]>({
        queryKey:['trends']
        , queryFn: getTrends
        , staleTime: 60 *1000 //fresh > stale, 기준은 5분 ( fresh상태에선 데이터를 가져오지 않음)
        , gcTime: 30*1000 // garbage collection, 5분이 지나면 데이터를 삭제
    });

    return data?.map((trend) => <Trend key={trend.title} trend={trend} />);
}