import BackButton from "../_component/BackButton";
import Post from "../_component/Post";
import SearchForm from "../_component/SearchForm";
import Tab from "./_component/Tab";
import style from './search.module.css';


type Props ={
    searchParams: Promise<{q: string, f?: string, pf?: string}>;
};

export default async function Search({searchParams}: Props) {
    return (
        <main className={style.main}>
            <div className={style.searchTop}>
                <div className={style.searchZone}>
                    <div className={style.buttonZone}>
                        <BackButton/>
                    </div>
                    <div className={style.formZone}>
                        <SearchForm q={(await searchParams).q} />
                    </div>
                </div>
                <Tab />
            </div>
            <div className={style.list}>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                {/*<SearchResult searchParams={searchParams} />*/}
            </div>
        </main>
    );
}