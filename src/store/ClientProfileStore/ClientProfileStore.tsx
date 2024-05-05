import { clientID, clientSecret } from "../../config/serverAuth"

export class ClientProfileStore {

    gitHubLogin = () => {
        window.location.assign('https://github.com/login/oauth/authorize?client_id=' + clientID)
    }
}

export default new ClientProfileStore()