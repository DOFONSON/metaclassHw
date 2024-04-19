import ArrowButton from "../../../../../../../components/ArrowButton"
import { Link } from "react-router-dom"
import { InfoProps } from "../../Info"

const Infohead: React.FC<InfoProps> = ({ compURL, compName }) => {
    return (
        <div className="repo__infohead">
            <Link to={'/'}><ArrowButton side="left" onClick={() => { }} color={'#1F883D'}></ArrowButton></Link>
            <img src={compURL} alt="company img" className="infohead__img" />
            <h2 className="infohead__title">{compName}</h2>
        </div>
    )
}

export default Infohead