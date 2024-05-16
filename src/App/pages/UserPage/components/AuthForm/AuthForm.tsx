import React from "react"
import { ClientProfileStore } from "../../../../../store/ClientProfileStore/ClientProfileStore"
import style from './AuthForm.module.scss'
type cliType = ClientProfileStore


const AuthForm: React.FC<{ cliStore: cliType }> = ({ cliStore }) => {



    return (
        <div className={style.form}>
            <h2 className={style.form__title}>You need to pass authentification to see your profile</h2>
            <button type="button" onClick={cliStore.gitHubLogin} className={style.form__btn}>Login with GitHub</button>
        </div>
    )
}

export default AuthForm