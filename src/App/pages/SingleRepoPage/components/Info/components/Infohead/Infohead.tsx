import ArrowButton from "../../../../../../../components/ArrowButton"
import { Link } from "react-router-dom"
import { InfoProps } from "../../Info"
import style from './Infohead.module.scss'
import React from "react"
const Infohead: React.FC<InfoProps> = ({ compURL, compName, headURL }) => {

    return (
        <div className={style.repo__infohead}>
            <Link to={'/' + headURL?.search}><ArrowButton side="left" onClick={() => { }} color={'#1F883D'}></ArrowButton></Link>
            <img src={compURL} alt="company img" className={style.infohead__img} />
            <h2 className={style.infohead__title}>{compName}</h2>
        </div>
    )
}

export default Infohead
