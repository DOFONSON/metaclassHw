import { useEffect, useState } from "react"
import {ClientProfileStore} from "../../../../../store/ClientProfileStore/ClientProfileStore"
import style from './MainUser.module.scss'
import { toJS } from "mobx"

type cliType = ClientProfileStore

const MainUser: React.FC<{ cliStore: cliType }> = ({cliStore}) => {
    const [data, setData]: [any, any] = useState(null)
    useEffect(() => {
        getCliData()
        console.log(cliStore.data);
    }, [])

    useEffect(() => {
        console.log(toJS(data));
    }, [cliStore.data, data])
    
    const getCliData = async () => {
        await cliStore.getUserData()
        setData(cliStore.data)
    }
    return(
        (data && 
        <div className={style.main__user}>
            <img src={data.avatar_url} alt="user icon" className={style.main__user_avatar}/>
            <h2>{data.login}</h2>
            <span>GitHub user from: {data.created_at}</span>
        </div>)
    )
}

export default MainUser