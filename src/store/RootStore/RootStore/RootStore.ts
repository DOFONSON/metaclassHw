import QueryParamsStore from "../QueryParamsStore/QueryParamsStore";
import { MultiStore } from "../../MultiStore/MultiStore";
import { SingleRepoStore } from '../../RepoStore/RepoStore'
export default class RootStore {
    readonly query = new QueryParamsStore();
    readonly multiStore = new MultiStore()
    readonly singleRepoStore = new SingleRepoStore()
}