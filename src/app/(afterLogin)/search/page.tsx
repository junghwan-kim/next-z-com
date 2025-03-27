import { Metadata, ResolvingMetadata } from "next";
import BackButton from "../_component/BackButton";
import Post from "../_component/Post";
import SearchForm from "../_component/SearchForm";
import SearchResult from "./_component/SearchResult";
import Tab from "./_component/Tab";
import style from './search.module.css';


type Props ={
    searchParams: Promise<{q: string, f?: string, pf?: string}>;
};

export async function generateMetadata({searchParams}: Props, parent: ResolvingMetadata):Promise<Metadata>{
    const query = await searchParams;
    return {
        title: `${query.q} - 검색 / Z`,
        description: `${query.q} - 검색 / Z`
    };

}

export default async function Search({searchParams}: Props) {
    const query = await searchParams;
    return (
        <main className={style.main}>
            <div className={style.searchTop}>
                <div className={style.searchZone}>
                    <div className={style.buttonZone}>
                        <BackButton/>
                    </div>
                    <div className={style.formZone}>
                        <SearchForm q={query.q} f={query.f} pf={query.pf} />
                    </div>
                </div>
                <Tab />
            </div>
            <div className={style.list}>
               <SearchResult searchParams={query} />
            </div>
        </main>
    );
}