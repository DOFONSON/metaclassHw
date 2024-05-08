import Infohead from "./components/Infohead"
import Infomain from "./components/Infomain";
import rootStore from "../../../../../store/RootStore/RootStore/instanse";
import React from "react";
export type InfoProps = {
    compURL?: string;
    headURL?: URL
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
    let url = rootStore.URL;
    console.log(url.search);

    return (
        <>
            <Infohead compURL={compURL} compName={compName} headURL={url}></Infohead>
            <Infomain repName={repName} topics={topics} stars={stars} watchers={watchers} forks={forks} contributors={contributors} languages={languages}></Infomain>
        </>
    )
}

export default Info