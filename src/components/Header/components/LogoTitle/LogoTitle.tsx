import Logo from './img/GitHubLogo.svg'
import style from './style/LogoTitle.module.scss'
const LogoTitle = () => {
    return (
        <div className={style.header__logo_title}>
            <img src={Logo} alt="GitHubLogo" />
            <h1 className={style.logo_title__title}>GitHub Client</h1>
        </div >
    )
}

export default LogoTitle