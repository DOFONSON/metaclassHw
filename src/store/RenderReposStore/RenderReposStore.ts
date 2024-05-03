import { makeObservable, observable, action, IReactionDisposer, reaction } from 'mobx';
import rootStore from '../RootStore/RootStore/instanse';
import { fetchRepos } from "../../config/routes";
import { Repo } from "../../config/routes";
import { CollectionModel, getInitialCollectionModel } from '../../shared/collection';
import { Meta } from '../../shared/meta';
import MultiStore from '../MultiStore/MultiStore';
export class RenderReposStore {
    repos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    renderedRepos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    multiStore
    searchQuery: string = '';
    meta: Meta = Meta.Initial;
    page: number = 0;
    tags: [] = []
    url = new URL(window.location.href);
    constructor() {
        makeObservable(this, {
            page: observable,
            repos: observable,
            meta: observable,
            url: observable,
            tags: observable,
            renderedRepos: observable,
            searchQuery: observable,
            fetchRepos: action,
            filterRepos: action,
            changePage: action
        });

        const pageQueryParam = rootStore.query.getParam('page');
        const searchQueryParam = rootStore.query.getParam('search');

        if (typeof searchQueryParam === 'string') {
            this.fetchRepos(searchQueryParam);
        }

        if (typeof pageQueryParam === 'string') {
            this.changePage(+pageQueryParam);
        }

        this.multiStore = MultiStore;

    }

    handleSearch = async () => {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
        if (searchInput) {
            this.changePage(0)
            await this.fetchRepos(searchInput.value);
        }
    };

    changePage = (ind: number) => {
        this.page = ind
        this.url = new URL(window.location.href);
        this.url.searchParams.set('page', this.page.toString())
        window.history.pushState({ path: this.url.href }, '', this.url.href);
        rootStore.URL = this.url
    }

    async fetchRepos(query: string, state = false) {

        this.searchQuery = query;
        MultiStore.deleteTags();
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

        this.multiStore.updateTags(arr);
        this.renderedRepos = this.repos;
        rootStore.repos = this.renderedRepos
        this.tags = arr

        this.meta = Meta.Success;
        if (!state) {
            this.url = new URL(window.location.href);
            this.url.searchParams.set('search', query);
            this.url.searchParams.set('page', this.page.toString())
            window.history.pushState({ path: this.url.href }, '', this.url.href);

        }
        rootStore.URL = this.url
    }

    filterRepos(options: any[]) {
        if (options.length === 0) {
            this.renderedRepos = this.repos;
            return;
        }
        this.renderedRepos = {
            order: [],
            entities: {}
        };
        for (const option of options) {
            for (const key in this.repos.entities) {
                const tagArr = this.repos.entities[key].topics;
                if (tagArr.includes(option.value) && !this.renderedRepos.order.includes(+key)) {
                    this.renderedRepos.order.push(+key);
                    this.renderedRepos.entities[key] = this.repos.entities[key];
                }
            }
        }
    }


    _qpPage: IReactionDisposer = reaction(
        () => rootStore.query.getParam('page'),
        (page) => {
            if (typeof page == 'string') {
                this.changePage(+page)
            }
        }
    )
    _qpReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam('search'),
        (search) => {
            if (typeof search == 'string') {

                this.fetchRepos(search)
            }
        }
    )
}

const renderReposStore = new RenderReposStore();
export default renderReposStore;
