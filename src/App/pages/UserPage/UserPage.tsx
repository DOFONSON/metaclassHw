import { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import Info from "./components/Info";
import { useParams } from 'react-router-dom';
import Readme from './components/Readme';
import style from './styles/UserPage.module.scss'
import reposStore from '../../../store/RenderReposStore/RenderReposStore';
import RepoStore from '../../../store/RepoStore/RepoStore';
import { toJS } from 'mobx';

const UserPage = () => {
    const { id } = useParams();
    if (id == undefined) return
    const repo = reposStore.repos.entities[+id];
    const [loading, setLoading] = useState(true);

    console.log(toJS(repo));

    useEffect(() => {
        const fetchData = async () => {
            if (repo) {
                await RepoStore.setRepo(repo);
                console.log(toJS(RepoStore.repo?.languagesResult));

                setLoading(false);
            }
        }

        fetchData();
    }, [repo]);

    return (
        <>
            <Header />
            <main className={style.main__user_page}>
                {loading && <p>Loading...</p>}
                {!loading && RepoStore.repo && (
                    <>
                        <Info
                            compName={RepoStore.repo.company_login}
                            compURL={RepoStore.repo.avatarUrl}
                            repName={RepoStore.repo.name}
                            topics={RepoStore.repo.topics}
                            stars={RepoStore.repo.stargazers_count}
                            watchers={RepoStore.repo.watchers}
                            forks={RepoStore.repo.forks}
                            contributors={RepoStore.repo.contributors}
                            languages={RepoStore.repo.languagesResult}
                        />
                        {RepoStore.repo?.readme && <Readme data={RepoStore.repo?.readme} />}
                    </>
                )}
            </main>
        </>
    );
}

export default UserPage;
