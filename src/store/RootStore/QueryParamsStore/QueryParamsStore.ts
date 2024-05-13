type PrivateFields = '_params'
import { action, makeObservable, observable } from 'mobx'
import * as qs from 'qs'

export default class QueryParamsStore {
    private _params: qs.ParsedQs = {}
    private _search: string = ''
    url = new URL(window.location.href);
    page: number = 0
    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            page: observable,
            url: observable,
            setSearch: action,
        })
    }
    getParam(
        key: string
    ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
        return this._params[key]
    }

    changePage = (ind: number) => {
        this.page = ind
        this.url = new URL(window.location.href);
        this.url.searchParams.set('page', this.page.toString())
        window.history.pushState({ path: this.url.href }, '', this.url.href);
    }

    setSearch(search: string) {
        search = search.startsWith('?') ? search.slice(1) : search
        if (this._search !== search) {
            this._search = search
            this._params = qs.parse(search)
        }
    }
}   