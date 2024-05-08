import { action, makeObservable, observable } from "mobx"
import { clientID } from "../../config/serverAuth"

export class ClientProfileStore {
    data: any

    constructor() {
        makeObservable(this, {
            data: observable,
            getUserData: action.bound
        })
    }

    gitHubLogin = () => {
        window.location.assign('https://github.com/login/oauth/authorize?client_id=' + clientID)
    }

    getUserData = async () => {
        const response = await fetch('http://localhost:4000/getUserData', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        const data = await response.json()
        this.setData(data)
    }

    setData = action((data: any) => {
        this.data = data
    })

}

export default new ClientProfileStore()