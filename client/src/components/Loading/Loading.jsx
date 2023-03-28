import style from './Loading.module.css';

const Loading = () => {
    return (
        <div className={style.loadingContainer}>
            <div className={style.loading}></div>
        </div>
    );
};

export default Loading;