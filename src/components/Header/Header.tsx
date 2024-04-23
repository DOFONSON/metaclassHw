import LogoTitle from "./components/LogoTitle"
import UserIcon from "./components/UserIcon"
import style from './styles/header.module.scss'
const Header = () => {
    return (
        <header className={style.header}>
            <LogoTitle></LogoTitle>
            <UserIcon></UserIcon>
        </header>
    )
}
export default Header