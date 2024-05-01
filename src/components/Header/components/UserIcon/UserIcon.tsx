import Icon from './img/Ellipse 26.png'
import style from './UserIcon.module.scss'
const UserIcon = () => {
    return <img src={Icon} alt="user icon" className={style.header__user_image} />
}

export default UserIcon