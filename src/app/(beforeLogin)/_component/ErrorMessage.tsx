
import style from './signup.module.css';

export default function ErrorMessage({ message }: { message: string | undefined }) {
    return (
        <div className={style.error}>{message}</div>
    );
}