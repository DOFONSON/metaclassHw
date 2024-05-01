import { observable, makeObservable, action } from "mobx";
import { Repo } from "../../config/routes";
import { getOptionalData } from "../../config/routes";
import { Meta } from '../../shared/meta';
export class SingleRepoStore {
    repo: Repo | undefined = undefined
    meta: Meta = Meta.Initial
    constructor() {
        makeObservable(this, {
            repo: observable.ref,
            meta: observable,
            setRepo: action
        });
    }
    setRepo = async (value: Repo) => {
        if (value) {
            this.meta = Meta.Loading
            this.repo = value;
            this.repo = await getOptionalData(this.repo.contributors, this.repo.languagesResult, this.repo.companyLogin, this.repo.name, this.repo)

        } else {
            console.error("Invalid repo object or missing contributors property");
        }
    }

}
const RepoStore = new SingleRepoStore();

export default RepoStore