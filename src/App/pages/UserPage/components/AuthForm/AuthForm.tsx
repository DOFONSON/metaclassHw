import React from "react"
import { ClientProfileStore } from "../../../../../store/ClientProfileStore/ClientProfileStore"

type cliType = ClientProfileStore


const AuthForm: React.FC<{ cliStore: cliType }> = ({ cliStore }) => {



    return (
        <div className="form">
            <h2>You need to pass authentification to see your profile</h2>
            <button type="button" onClick={cliStore.gitHubLogin}>Login with GitHub</button>
        </div>
    )
}

export default AuthForm