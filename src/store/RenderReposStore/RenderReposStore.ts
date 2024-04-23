import { makeObservable, observable, action } from 'mobx';
import { fetchRepos } from "../../config/routes";
import { Repo } from "../../config/routes";

class RenderReposStore {
    repos: Repo[] = [];
    searchQuery: string = '';

    constructor() {
        makeObservable(this, {
            repos: observable.ref,
            searchQuery: observable,
            fetchRepos: action,
        });
    }

    async fetchRepos(query: string) {
        this.searchQuery = query;
        this.repos = await fetchRepos(query);
    }
}

const repoStore = new RenderReposStore();
export default repoStore;
