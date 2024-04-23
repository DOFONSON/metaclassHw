import Infohead from "./components/Infohead"
import Infomain from "./components/Infomain";
export type InfoProps = {
    compURL?: string;
    compName?: string
    repName?: string
    topics?: string[]
    stars?: number
    watchers?: number
    forks?: number
    contributors?: {}[] | string
    languages?: any
}
const Info: React.FC<InfoProps> = ({ compURL, compName, repName, topics, stars, watchers, forks, contributors, languages }) => {

    return (
        <>
            <Infohead compURL={compURL} compName={compName}></Infohead>
            <Infomain repName={repName} topics={topics} stars={stars} watchers={watchers} forks={forks} contributors={contributors} languages={languages}></Infomain>
        </>
    )
}

export default Info