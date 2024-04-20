import { useState, useEffect } from 'react';
import Header from "../../../components/Header";
import Info from "./components/Info";
import { FETCHED_DATA } from "../../../config/routes";
import { useParams } from 'react-router-dom';
import { Repo } from '../../../config/routes';
import Readme from './components/Readme';
const UserPage = () => {
    const { id } = useParams();
    const [repo, setRepo] = useState<Repo | null>(null);

    useEffect(() => {
        const foundRepo = FETCHED_DATA.find((repo: Repo) => repo.id.toString() === id);
        setRepo(foundRepo);

    }, [id]);

    return (
        <>
            <Header />
            <main className='main--user-page'>
                {repo && <Info compName={repo.company_login} compURL={repo.avatarUrl} repName={repo.name} topics={repo.topics} stars={repo.stargazers_count} watchers={repo.watchers} forks={repo.forks} contributors={repo.contributors} languages={repo.languagesResult} />}
                <Readme data={repo?.readme}></Readme>
            </main>
        </>
    );
}

export default UserPage;
