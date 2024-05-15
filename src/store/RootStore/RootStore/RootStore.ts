import QueryParamsStore from "../QueryParamsStore/QueryParamsStore";
import { Repo } from "../../../config/routes";
import { CollectionModel } from "../../../shared/collection";
import { ClientProfileStore } from "../../ClientProfileStore/ClientProfileStore";
export default class RootStore {

    readonly query = new QueryParamsStore();
    userImg = undefined
    userName = undefined
    repos: CollectionModel<number, Repo> = {
        order: [],
        entities: {}
    };
    cliProfileStore =  new ClientProfileStore() 
    URL: URL = new URL(window.location.href);

    reposTags: any[] = []
}