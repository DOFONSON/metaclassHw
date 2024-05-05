import LogoTitle from "./components/LogoTitle"
import UserIcon from "./components/UserIcon"
import style from './header.module.scss'
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header className={style.header}>
            <LogoTitle></LogoTitle>
            <Link to={'/user'}><UserIcon></UserIcon></Link>
        </header>
    )
}
export default Header