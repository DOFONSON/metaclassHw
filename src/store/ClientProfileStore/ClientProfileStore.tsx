import { action, makeObservable, observable, toJS } from "mobx"
import { clientID } from "../../config/serverAuth"
import { Meta } from "../../shared/meta"

export class ClientProfileStore {
    data: any
    meta: Meta = Meta.Initial
    repos: {
        languages: any,
        languages_url: string ,
        pushed_at: string,
        created_at: string
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


        this.setData(data)
        console.log(data);
        
        const repos = await (await fetch(data.repos_url)).json()
        this.setRepos(repos)
    
        const temp = await Promise.all(this.repos.map(async (repo) => {
            if (repo.languages_url) {
                repo.languages = await (await fetch(repo.languages_url)).json()
            }
            return repo
        }))
        console.log(temp);
        temp.forEach(repo => {
            repo.pushed_at = this.formatDate(repo.pushed_at)
            repo.created_at = this.formatDate(repo.created_at)
        })
        this.setRepos(temp)
    
    }

    formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }
    getAccessToken = async (codeParam: string) => {
        this.meta = Meta.Loading
        
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
        this.data = data;
        this.data.updated_at = this.formatDate(data.updated_at);
        this.data.created_at = this.formatDate(data.created_at);
      })

    setLanguages = action((languages: any) => {
        this.languages = languages
    })

}

export default new ClientProfileStore()