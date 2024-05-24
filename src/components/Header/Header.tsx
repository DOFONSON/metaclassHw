import { useEffect } from "react";
import { ClientProfileStore } from "../../store/ClientProfileStore/ClientProfileStore";
import LogoTitle from "./components/LogoTitle"
import UserIcon from "./components/UserIcon"
import style from './header.module.scss'
import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import rootStore from "../../store/RootStore/RootStore/instanse";
import React from "react";

type cliType = ClientProfileStore | undefined

const Header: React.FC<{ cliStore: cliType }> = ({ cliStore }) => {

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
            <Link to={'/user'} className={style.userLink}><UserIcon image={cliStore?.data?.avatar_url} userName={cliStore?.data?.login}></UserIcon></Link>
        </header>
    )
}
export default observer(Header)