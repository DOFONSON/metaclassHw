import { makeObservable, observable, action, IReactionDisposer, reaction, runInAction } from 'mobx';
import rootStore from '../RootStore/RootStore/instanse';
import { fetchRepos } from "../../config/routes";
import { Repo } from "../../config/routes";
import { CollectionModel, getInitialCollectionModel } from '../../shared/collection';
import { Meta } from '../../shared/meta';
import { MultiStore } from '../MultiStore/MultiStore';

export class RenderReposStore {
    repos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    renderedRepos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    multiStore = new MultiStore();
    searchQuery: string = '';
    meta: Meta = Meta.Initial;
    page: number = 1;
    tags: [] = [];
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
        
        const tagsQueryParam = rootStore.query.getParam('tags');
        const pageQueryParam = rootStore.query.getParam('page');
        const searchQueryParam = rootStore.query.getParam('search');

        if (typeof searchQueryParam === 'string') {
            this.fetchRepos(searchQueryParam);
        }

        if (typeof pageQueryParam === 'string') {
            this.changePage(+pageQueryParam);
        }

        if (typeof tagsQueryParam === 'string') {
            const tags = tagsQueryParam.split(',');
            this.multiStore.selectedTags = tags.map((tag) => ({ key: tag, value: tag }));
            this.filterRepos(this.multiStore.selectedTags);
        }
    }

    handleSearch = async () => {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
        if (searchInput) {
            this.changePage(1);
            await this.fetchRepos(searchInput.value);
        }
    };

    changePage = (ind: number) => {
        this.page = ind;
        this.url = new URL(window.location.href);
        this.url.searchParams.set('page', this.page.toString());
        window.history.pushState({ path: this.url.href }, '', this.url.href);
        rootStore.URL = this.url;
    };

    async fetchRepos(query: string) {
        this.url.searchParams.delete('tags');
        this.multiStore.updateTags([]);
        this.multiStore.selectedTags = [];
        this.url = new URL(window.location.href);
        this.url.searchParams.set('search', query);
        this.url.searchParams.set('page', this.page.toString());
        window.history.pushState({ path: this.url.href }, '', this.url.href);
        rootStore.URL = this.url;
        this.searchQuery = query;
        this.multiStore.deleteTags();
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

        runInAction(() => {
            this.renderedRepos = this.repos;
            rootStore.repos = this.renderedRepos;
            this.tags = arr;
            this.meta = Meta.Success;
        });
    }

    filterRepos(options: any[]) {
        if (options.length === 0) {
            this.renderedRepos = this.repos;
            this.url.searchParams.delete('tags');
            window.history.pushState({ path: this.url.href }, '', this.url.href);
            rootStore.URL = this.url;
            return;
        }
        this.renderedRepos = {
            order: [],
            entities: {}
        };

        const tags = options.map((option) => option.value);
        this.url.searchParams.set('tags', tags.join(','));
        window.history.pushState({ path: this.url.href }, '', this.url.href);
        rootStore.URL = this.url;
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

    _qpReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam('search'),
        (search) => {
            if (typeof search == 'string') {
                this.fetchRepos(search);
            }
        }
    );

    _qpPage: IReactionDisposer = reaction(
        () => rootStore.query.getParam('page'),
        (page) => {
            if (typeof page == 'string') {
                this.changePage(+page);
            }
        }
    );
}

const renderReposStore = new RenderReposStore();
export default renderReposStore;
