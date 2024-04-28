import { observable, makeObservable, action } from "mobx";
import { Repo } from "../../config/routes";
import { getOptionalData } from "../../config/routes";
import { Meta } from '../../shared/meta';
class CardStore {
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
            this.repo = await getOptionalData(this.repo.contributors, this.repo.languagesResult, this.repo.company_login, this.repo.name, this.repo)

        } else {
            console.error("Invalid repo object or missing contributors property");
        }
    }

}
const RepoStore = new CardStore();

export default RepoStore