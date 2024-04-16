import Logo from './img/GitHubLogo.svg'
const LogoTitle = () => {
    return (
        <div className="header__logo-title">
            <img src={Logo} alt="GitHubLogo" />
            <h1 className='logo-title__title'>GitHub Client</h1>
        </div>
    )
}

export default LogoTitle