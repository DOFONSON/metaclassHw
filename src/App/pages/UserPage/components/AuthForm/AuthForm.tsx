import { ClientProfileStore } from "../../../../../store/ClientProfileStore/ClientProfileStore"
import React, { useEffect } from "react"

type cliType = ClientProfileStore


const AuthForm: React.FC<{ cliStore: cliType }> = ({ cliStore }) => {
    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const codeParam = urlParams.get('code')
    }, [])
    return (
        <div className="form">
            <h2>You need to pass authentification to see your profile</h2>
            <button type="button" onClick={cliStore.gitHubLogin}>Login with GitHub</button>
        </div>
    )
}

export default AuthForm