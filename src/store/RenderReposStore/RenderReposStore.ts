import { makeObservable, observable, action } from 'mobx';
import { fetchRepos } from "../../config/routes";
import { Repo } from "../../config/routes";
import { CollectionModel, getInitialCollectionModel } from '../../shared/collection';
import { Meta } from '../../shared/meta';
import MultiStore from '../MultiStore/MultiStore';
class RenderReposStore {
    repos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    renderedRepos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    searchQuery: string = '';
    meta: Meta = Meta.Initial
    constructor() {
        makeObservable(this, {
            repos: observable,
            meta: observable,
            renderedRepos: observable,
            searchQuery: observable,
            fetchRepos: action,
            filterRepos: action
        });
    }

    async fetchRepos(query: string) {
        MultiStore.deleteTags()
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
        let arr: any = []
        for (const item of response) {
            this.repos.order.push(item.id)
            this.repos.entities[item.id] = item
            arr.push(item)
        }
        this.renderedRepos = this.repos
        MultiStore.updateTags(arr)
        this.meta = Meta.Success
    }

    filterRepos(options: any[]) {
        if (options.length == 0) {
            this.renderedRepos = this.repos
            return
        }
        this.renderedRepos = {
            order: [],
            entities: {}
        }
        for (const option of options) {
            for (const key in this.repos.entities) {
                let tagArr = this.repos.entities[key].topics
                if (tagArr.includes(option.value) && !this.renderedRepos.order.includes(+key)) {
                    this.renderedRepos.order.push(+key)
                    this.renderedRepos.entities[key] = this.repos.entities[key]
                }
            }
        }
    }

}

const ReposStore = new RenderReposStore();
export default ReposStore;
