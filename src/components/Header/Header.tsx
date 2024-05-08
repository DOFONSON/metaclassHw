import { useEffect } from "react";
import { ClientProfileStore } from "../../store/ClientProfileStore/ClientProfileStore";
import LogoTitle from "./components/LogoTitle"
import UserIcon from "./components/UserIcon"
import style from './header.module.scss'
import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import rootStore from "../../store/RootStore/RootStore/instanse";

type cliType = ClientProfileStore | undefined

const Header: React.FC<{ cliStore: cliType }> = ({ cliStore }) => {

    console.log(style);


    useEffect(() => {
        rootStore.userImg = cliStore ? cliStore?.data?.avatar_url : rootStore.userImg
        rootStore.userName = cliStore?.data?.login
    }, [cliStore?.data, UserIcon])

    useEffect(() => {
        cliStore?.getUserData();
    }, [])

    return (
        <header className={style.header}>
            <LogoTitle></LogoTitle>
            <Link to={'/user'} className={style.userLink}><UserIcon image={rootStore.userImg} userName={rootStore.userName}></UserIcon></Link>
        </header>
    )
}
export default observer(Header)