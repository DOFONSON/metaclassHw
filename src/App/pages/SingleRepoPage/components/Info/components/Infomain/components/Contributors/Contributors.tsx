import { InfoProps } from "../../../../Info"
import style from './Contributors.module.scss'
const Contributors: React.FC<InfoProps> = ({ contributors }) => {
    if (!Array.isArray(contributors)) {
        return null;
    }
    return (
        <div className={style.contributors}>
            <div className={style.contributors__title}>
                <h3 className={style.title__title}>Contributors</h3>
                {contributors?.length ? <span className={style.contributors__title_span}>{contributors.length}</span> : ''}
            </div>

            <ul className={style.contributors__list}>
                {contributors?.map((con: any) => {
                    return <li key={con.id} className={style.contributors__list_item}><img src={con.avatar_url} alt="avatar" className={style.contributors__img} /> {con.login}</li>
                })}
            </ul>
        </div>
    )
}

export default Contributors