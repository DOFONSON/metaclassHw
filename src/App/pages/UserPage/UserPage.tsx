import AuthForm from "./components/AuthForm/AuthForm"
import MainUser from "./components/MainUser/MainUser";
import { ClientProfileStore } from "../../../store/ClientProfileStore/ClientProfileStore";
import { useLocalObservable } from "mobx-react-lite";
import { ClientProfileStoreProvider } from "../../../store/ClientProfileStore/ClientProfileStoreProvider";
import { useEffect, useState } from "react";
import ArrowButton from "../../../components/ArrowButton/ArrowButton";
import { Link } from "react-router-dom";
import style from './UserPage.module.scss'
import React from "react";


const UserPage = () => {

    const cliStore = useLocalObservable(() => new ClientProfileStore());

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const codeParam = urlParams.get('code')

        if (codeParam && (localStorage.getItem('accessToken') === null)) {
            async function getAccessToken() {
                console.log('http://localhost:4000/getAccessToken?code=' + codeParam);

                await fetch('http://localhost:4000/getAccessToken?code=' + codeParam, {
                    method: 'GET'
                }).then(response => response.json())
                    .then(data => {
                        console.log(data);

                        if (data.access_token) {
                            localStorage.setItem('accessToken', data.access_token)
                            setLoading(!loading)
                        }
                    })
            }

            getAccessToken()
        }
    }, [])



    return (
        <main className={style.main}>
            <ClientProfileStoreProvider value={cliStore}>
                <Link to={'/'}><ArrowButton side="left" onClick={() => { }} ></ArrowButton></Link>
                {
                    !localStorage.getItem('accessToken') ? <AuthForm cliStore={cliStore} /> : <MainUser cliStore={cliStore} />
                }

            </ClientProfileStoreProvider>
        </main>

    )
}

export default UserPage