import React, { useEffect, useState } from "react"
import { ClientProfileStore } from "../../../../../store/ClientProfileStore/ClientProfileStore"
import style from './MainUser.module.scss'
import { toJS } from "mobx"
import UserRepos from "./components/UserRepos"
type cliType = ClientProfileStore

const MainUser: React.FC<{ cliStore: cliType }> = ({ cliStore }) => {
    const [data, setData]: [any, any] = useState(null)
    const [repos, setRepos]: [[], any] = useState([])

    useEffect(() => {
        getCliData()
    }, [])

    useEffect(() => {
        console.log(toJS(data));
    }, [data])

    const getCliData = async () => {
        await cliStore.getUserData()
        setData(cliStore.data)
        setRepos(cliStore.repos)
    }
    
    return (
        (data &&
            <div>
                <div className={style.main__user}>
                    <div>
                        <img src={data.avatar_url} alt="user icon" className={style.user__avatar} />
                        <h2 className={style.user__login}>{data.login}</h2>
                        <span className={style.user__name}>{data.name}</span>
                        <p className={style.user__bio}>{data.bio}</p>
                    </div>
                        <div className="additional_info">
                            <ul className={style.additional_info__list}>
                                <li className={style.list__item}>GitHub user from: {data.created_at}</li>
                                <li className={style.list__item}>Public repos: {data.public_repos}</li>
                                <li className={style.list__item}>Last commit: {data.updated_at}</li>
                                <li className={style.list__item}>Followers: {data.followers}</li>
                                <li className={style.list__item}>Following: {data.following}</li>
                                <li className={style.list__item}>Company: {data.company ? data.company : 'no info'}</li>
                            </ul>
                        </div>
                </div>
                
                <UserRepos repos={repos} />
            </div>)
    )
}

export default MainUser