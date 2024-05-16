import { action, makeObservable, observable, toJS } from "mobx"
import { clientID } from "../../config/serverAuth"
import { Meta } from "../../shared/meta"

export class ClientProfileStore {
    data: any
    meta: Meta = Meta.Initial
    repos: {
        languages: any,
        languages_url: string 
}[] = []
    languages: any = []
    constructor() {
        makeObservable(this, {
            data: observable,
            meta: observable,
            repos: observable,
            languages: observable,
            getUserData: action.bound,
            getAccessToken: action,
            setRepos: action,
            getLanguages: action,
            setLanguages: action
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

        console.log('re:', data);

        this.setData(data)
        console.log(data);
        
        const repos = await (await fetch(data.repos_url)).json()
        this.setRepos(repos)
    
        const temp = await Promise.all(this.repos.map(async (repo) => {
            if (repo.languages_url) {
                console.log(repo.languages_url);
                repo.languages = await (await fetch(repo.languages_url)).json()
            }
            return repo
        }))
    
        this.setRepos(temp)
    
    }

    formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
      }
    getAccessToken = async (codeParam: string) => {
        this.meta = Meta.Loading
        console.log(codeParam);
        
        await fetch('http://localhost:4000/getAccessToken?code=' + codeParam, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => {

                if (data.access_token) {
                    localStorage.setItem('accessToken', data.access_token)
                }
            }).catch(er => console.log(er)
            )
            
            this.meta = Meta.Success
    }

    getLanguages = async (langUrl: string) => {
        const qwe = await (await fetch(langUrl)).json()
         return qwe
    }

    setRepos = action((repos: any) => {
        this.repos = repos
    }) 

    setData = action((data: any) => {
        this.data = data
        this.data.created_at = this.formatDate(this.data.created_at)
        this.data.updated_at = this.formatDate(this.data.updated_at)
    })

    setLanguages = action((languages: any) => {
        this.languages = languages
    })

}

export default new ClientProfileStore()