import { observable, makeObservable, action, runInAction, toJS } from "mobx";
import fetchRepos, { Repo } from "../../config/routes";
import { getOptionalData } from "../../config/routes";
import { Meta } from '../../shared/meta';
import { CollectionModel } from "../../shared/collection";

export class SingleRepoStore {
    repo: Repo | undefined = undefined
    meta: Meta = Meta.Initial
    repos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    constructor() {
        makeObservable(this, {
            repo: observable.ref,
            repos: observable,
            meta: observable,
            fetchRepos: action,
            setRepo: action
        });
    }
    async fetchRepos(query: string, name: string) {
        this.meta = Meta.Loading;
        const response = await (await (fetch(`https://api.github.com/repos/${query}/${name}`))).json()
        if (!response) {
            this.meta = Meta.Error;
            return;
        }
        return await this.setRepo(response, query, name);
    }
    setRepo = async (value: Repo, query: string, name: string) => {
        if (value) {
            this.repo = value;
            console.log(query);
            
            this.repo = await getOptionalData(this.repo.contributors_url, this.repo.languages_url, query, name, this.repo)

        } else {
            console.error("Invalid repo object or missing contributors property");
        }
        console.log(this.repo);
        
        this.meta = Meta.Success;
        
        return this.repo

    }
}