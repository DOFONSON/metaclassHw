import { action, makeObservable, observable, toJS } from "mobx"
import { clientID } from "../../config/serverAuth"

export class ClientProfileStore {
    data: any

    constructor() {
        makeObservable(this, {
            data: observable,
            getUserData: action
        })
    }
    gitHubLogin = () => {
        window.location.assign('https://github.com/login/oauth/authorize?client_id=' + clientID)
    }

    async getUserData() {
        await fetch('http://localhost:4000/getUserData', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(response => response.json())
        .then(data => this.data = data)
        console.log(toJS(this.data));
        
    }
}

export default new ClientProfileStore()