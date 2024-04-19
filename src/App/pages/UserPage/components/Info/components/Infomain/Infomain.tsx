import RepoInfo from "./components/RepoInfo"
import Contributors from "./components/Contributors/Contributors"
import Languages from "./components/Languages/Languages"
import { InfoProps } from "../../Info"
const Infomain: React.FC<InfoProps> = ({ repName, topics, stars, watchers, forks, contributors, languages }) => {

    return (
        <div className="info-main">
            <RepoInfo repName={repName} topics={topics} stars={stars} watchers={watchers} forks={forks}></RepoInfo>
            <div className="optional-info">
                <Contributors contributors={contributors}></Contributors>
                <Languages languages={languages}></Languages>
            </div>
        </div>
    )
}
export default Infomain