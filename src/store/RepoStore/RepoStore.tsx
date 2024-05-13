import { observable, makeObservable, action, runInAction, toJS } from "mobx";
import fetchRepos, { Repo } from "../../config/routes";
import { getOptionalData } from "../../config/routes";
import { Meta } from '../../shared/meta';
import { CollectionModel, getInitialCollectionModel } from "../../shared/collection";

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
    async fetchRepos(query: string, id: number) {
        this.meta = Meta.Loading;
        this.repos = getInitialCollectionModel();
        const response = await fetchRepos(query);
        if (response.length === 0) {
            this.meta = Meta.Error;
            return;
        }

        const arr: any = [];
        for (const item of response) {
            this.repos.order.push(item.id);
            this.repos.entities[item.id] = item;
            arr.push(item);
        }
        return await this.setRepo(this.repos.entities[id]);
    }
    setRepo = async (value: Repo) => {
        if (value) {
            this.repo = value;
            this.repo = await getOptionalData(this.repo.contributors, this.repo.languagesResult, this.repo.companyLogin, this.repo.name, this.repo)

        } else {
            console.error("Invalid repo object or missing contributors property");
        }

        this.meta = Meta.Success;

        return this.repo

    }
}