import QueryParamsStore from "../QueryParamsStore/QueryParamsStore";
import { Repo } from "../../../config/routes";
import { CollectionModel } from "../../../shared/collection";
export default class RootStore {

    readonly query = new QueryParamsStore();
    userImg = undefined
    userName = undefined
    repos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };

    URL: URL = new URL(window.location.href);

    reposTags: any[] = []
}