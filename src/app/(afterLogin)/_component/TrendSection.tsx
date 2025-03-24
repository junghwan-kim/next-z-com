"use client";

import { usePathname } from "next/navigation";
import Trend from "./Trend";
import style from "./TrendSection.module.css";
import { useSession } from "next-auth/react";
import { da } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";

export default function TrendSection() {
    const {data: session} = useSession();
    const {data} = useQuery<Hashtag[]>({
        queryKey:['trends']
        , queryFn: getTrends
        , staleTime: 60 *1000 //fresh > stale, 기준은 5분 ( fresh상태에선 데이터를 가져오지 않음)
        , gcTime: 30*1000 // garbage collection, 5분이 지나면 데이터를 삭제
        , enabled: !!session?.user
    });

    const pathname = usePathname();
    
    if(pathname === '/explore') return null;
    if(session?.user){
        return (
            <div className={style.trendBg}>
                <div className={style.trend}>
                    <h3>나를 위한 트렌드</h3>
                    {data?.map((trend) => (
                        <Trend key={trend.title} trend={trend} />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className={style.trendBg}>
            <div className={style.noTrend}>
                트렌드를 가져올 수 없습니다.
            </div>
        </div>
    );
}