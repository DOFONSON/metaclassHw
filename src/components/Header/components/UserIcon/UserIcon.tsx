import Icon from './img/Ellipse 26.png'
import style from './UserIcon.module.scss'

type UserIconProps = {
    image: string | undefined,
    userName: undefined | string
}

const UserIcon: React.FC<UserIconProps> = ({ image, userName }) => {
    return (
        <div className={style.userIcon}>
            <h4 className={style.userIcon__name}>{userName ? userName : ''}</h4> <img src={image ? image : Icon} alt="user icon" className={style.header__user_img} />
        </div>
    )
}

export default UserIcon