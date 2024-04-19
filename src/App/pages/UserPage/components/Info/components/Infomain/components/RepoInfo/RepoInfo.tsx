import { Link } from "./Img/Link"
import { Stars } from "./Img/Stars"
import { Eye } from './Img/Eye'
import { Branch } from "./Img/Branch"
import { InfoProps } from "../../../../Info"
const RepoInfo: React.FC<InfoProps> = ({ repName, topics, stars, watchers, forks }) => {
    return (
        <div className="info-main__header">
            <div className="info-main__header--title">
                <Link></Link>
                <h3>{repName}</h3>
            </div>
            <ul className="info-main__tags">{topics?.map(topic => {
                return <li key={topic} className="info-main__tag">{topic}</li>
            })}</ul>
            <ul className="info-main__header--list  ">
                <li><Stars></Stars> {stars} stars</li>
                <li><Eye></Eye> {watchers} watching</li>
                <li><Branch></Branch> {forks} forks</li>
            </ul>
        </div>
    )
}
export default RepoInfo