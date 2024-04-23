import RepoInfo from "./components/RepoInfo"
import Contributors from "./components/Contributors/Contributors"
import Languages from "./components/Languages/Languages"
import { InfoProps } from "../../Info"
import style from './styles/Infomain.module.scss'
const Infomain: React.FC<InfoProps> = ({ repName, topics, stars, watchers, forks, contributors, languages }) => {

    return (
        <div className={style.info_main}>
            <RepoInfo repName={repName} topics={topics} stars={stars} watchers={watchers} forks={forks}></RepoInfo>
            <div className={style.optional_info}>
                <Contributors contributors={contributors}></Contributors>
                {languages && <Languages languages={languages} />}
            </div>
        </div>
    )
}
export default Infomain