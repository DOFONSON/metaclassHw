import style from './LoadingStub.module.scss'
const LoadingStub = () => {
    return (
        <div className="loading_stub">
            <div className={style.box}>
                <div className={style.cat}>
                    <div className={style.body}></div>
                    <div className={style.tail}></div>
                    <div className={style.head}></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingStub