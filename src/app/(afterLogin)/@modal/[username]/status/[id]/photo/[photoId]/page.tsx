import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import Post from "@/app/(afterLogin)/_component/Post";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import style from './photoModal.module.css';
import { faker } from "@faker-js/faker";

export default function PhotoModal(){
    const photo={
        imageId: 1,
        link: faker.image.urlPicsumPhotos(),
        Post:{
            content: faker.lorem.text()
        }
    };
    return (
        <div className={style.container}>
            <PhotoModalCloseButton />
            <div className={style.imageZone}>
                <img src={photo.link} alt={photo.Post?.content} />
                <div className={style.image} style={{backgroundImage: `url(${photo.link})`}}></div>
                <div className={style.buttonZone}>
                    <div className={style.buttonInner}>
                        <ActionButtons white />
                    </div>
                </div>
            </div>
            <div className={style.commentZone}>
                <Post noImage />
                <CommentForm />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
}