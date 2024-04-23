import { useState, useEffect } from 'react';
import Header from "../../../components/Header";
import Info from "./components/Info";
import { FETCHED_DATA } from "../../../config/routes";
import { useParams } from 'react-router-dom';
import { Repo } from '../../../config/routes';
import Readme from './components/Readme';
import axios from "axios";
import { GITHUB_TOKEN } from '../../../config/routes';
import style from './styles/UserPage.module.scss'
const UserPage = () => {
    const { id } = useParams();
    const [repo, setRepo] = useState<Repo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const foundRepo = FETCHED_DATA.find((repo: Repo) => repo.id.toString() === id);
            if (!foundRepo) {
                console.error('Error: Repo not found');
                return;
            }

            try {

                const contributorsResult = await axios.get(foundRepo.contributors, {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`
                    }
                });

                const languagesResult = await axios.get(foundRepo.languagesResult, {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`
                    }
                });

                let readmeContent: string | undefined = undefined;
                try {
                    const readmeResult = await axios.get(`https://api.github.com/repos/${foundRepo.owner.login}/${foundRepo.name}/readme`, {
                        headers: {
                            Authorization: `token ${GITHUB_TOKEN}`
                        }
                    });
                    readmeContent = decodeURIComponent(escape(atob(readmeResult.data.content)));
                } catch (error) {
                    console.error('Error while fetching:', error);
                }

                const contributors = contributorsResult.data;

                foundRepo.contributors = contributors;
                foundRepo.readme = readmeContent;
                foundRepo.languagesResult = languagesResult.data;

                setRepo(foundRepo);

            } catch (error) {
                console.error('Error while fetching data:', error);
            }
        };

        fetchData();
    }, [id]);


    return (
        <>
            <Header />
            <main className={style.main__user_page}>
                {repo && <Info compName={repo.company_login} compURL={repo.avatarUrl} repName={repo.name} topics={repo.topics} stars={repo.stargazers_count} watchers={repo.watchers} forks={repo.forks} contributors={repo.contributors} languages={repo.languagesResult} />}
                <Readme data={repo?.readme}></Readme>
            </main>
        </>
    );
}

export default UserPage;
