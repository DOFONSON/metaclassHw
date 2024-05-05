import style from './ErrorStub.module.scss'
const ErrorStub = () => {
    return (
        <div className={style.error_stub}>
            <h2>Sorry... Can't find repos of this company</h2>
        </div>
    )
}

export default ErrorStub