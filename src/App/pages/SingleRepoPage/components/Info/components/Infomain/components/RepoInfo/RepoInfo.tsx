import { Link } from "./Img/Link"
import Star from "../../../../../../../../../components/Star"
import { Eye } from './Img/Eye'
import { Branch } from "./Img/Branch"
import { InfoProps } from "../../../../Info"
import style from './RepoInfo.module.scss'
import React from "react"
const RepoInfo: React.FC<InfoProps> = ({ repName, topics, stars, watchers, forks }) => {
    return (
        <div className="info_main__header">
            <div className={style.info_main__header_title}>
                <Link />
                <h3>{repName ? repName : ''}</h3>
            </div>
            {topics ?
                <ul className={style.info_main__tags}>{topics?.map(topic => {
                    return <li key={topic} className={style.info_main__tag}>{topic}</li>
                })}</ul> : ''}
            <ul className={style.info_main__header_list}>
                <li><Star color={'#AFADB5'} /> {stars} stars</li>
                <li><Eye /> {watchers} watching</li>
                <li><Branch /> {forks} forks</li>
            </ul>
        </div>
    )
}
export default RepoInfo