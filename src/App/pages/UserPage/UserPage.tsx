import AuthForm from "./components/AuthForm/AuthForm"
import MainUser from "./components/MainUser/MainUser";
import { useEffect, useState } from "react";
import ArrowButton from "../../../components/ArrowButton/ArrowButton";
import { Link } from "react-router-dom";
import style from './UserPage.module.scss'
import React from "react";
import { useRootStore } from "../../../store/RootStore/RootStore/RootStoreContext";


const UserPage = () => {


    const rootStore = useRootStore()

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const codeParam = urlParams.get('code')
        console.log(!localStorage.getItem('accessToken'));
        
        if (codeParam && (localStorage.getItem('accessToken') === null)) {
            rootStore.cliProfileStore.getAccessToken(codeParam)
        }
    }, [])

    return (
        <main className={style.main}>
                <Link to={-1}><ArrowButton side="left" onClick={() => { }} ></ArrowButton></Link>
                {
                    !localStorage.getItem('accessToken') ? <AuthForm cliStore={rootStore.cliProfileStore} /> : <MainUser cliStore={rootStore.cliProfileStore} />
                }

        </main>

    )
}

export default UserPage