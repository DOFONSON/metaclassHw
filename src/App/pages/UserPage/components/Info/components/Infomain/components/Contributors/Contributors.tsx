import { InfoProps } from "../../../../Info"
const Contributors: React.FC<InfoProps> = ({ contributors }) => {
    return (
        <div className="contributors">
            <div className="contributors__title">
                <h3 className="title__title">Contributors</h3>
                {contributors?.length ? <span className="contributors__title--span">{contributors.length}</span> : ''}
            </div>

            <ul className="contributors__list">
                {contributors?.map((con: any) => {
                    return <li key={con.id} className="contributors__list-item"><img src={con.avatar_url} alt="avatar" className="contributors__img" /> {con.login}</li>
                })}
            </ul>
        </div>
    )
}

export default Contributors