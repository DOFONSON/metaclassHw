import { makeObservable, observable, action } from 'mobx';
import { fetchRepos } from "../../config/routes";
import { Repo } from "../../config/routes";
import { CollectionModel, getInitialCollectionModel } from '../../shared/collection';
import { Meta } from '../../shared/meta';

class RenderReposStore {
    repos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    searchQuery: string = '';
    meta: Meta = Meta.Initial
    constructor() {
        makeObservable(this, {
            repos: observable,
            meta: observable,
            searchQuery: observable,
            fetchRepos: action,
        });
    }

    async fetchRepos(query: string) {
        let response = []
        this.meta = Meta.Loading
        this.repos = getInitialCollectionModel()
        this.searchQuery = ''
        this.searchQuery = query;
        response = await fetchRepos(query)

        if (response.length == 0) {
            this.meta = Meta.Error
            return
        }

        for (const item of response) {
            this.repos.order.push(item.id)
            this.repos.entities[item.id] = item
        }

        this.meta = Meta.Success
    }


}

const RepoStore = new RenderReposStore();
export default RepoStore;
