import { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import Info from "./components/Info";
import { useParams } from 'react-router-dom';
import Readme from './components/Readme';
import style from './styles/UserPage.module.scss'
import reposStore from '../../../store/RenderReposStore/RenderReposStore';
import RepoStore from '../../../store/RepoStore/RepoStore';
import ReposStore from '../../../store/RenderReposStore/RenderReposStore';

const UserPage = () => {
    const { id } = useParams<{ id: string }>();
    if (id == undefined) return
    let repo = reposStore.repos.entities[+id];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRepos = async () => {
            if (repo) {
                console.log(111);
                let comp = new URL(window.location.href)
                comp.searchParams.set('comp', repo.company_login.toString())
                window.history.pushState({ path: comp.href }, '', comp.href);
                console.log(reposStore.repos.entities[+id]);
            } else {
                let comp = new URL(window.location.href)
                if (comp.searchParams.get('comp')) {
                    await ReposStore.fetchRepos(comp.searchParams.get('comp') || '')
                    repo = reposStore.repos.entities[+id];
                    const fetchData = async () => {
                        if (repo) {
                            await RepoStore.setRepo(repo);
                            setLoading(false);
                        }
                    }

                    fetchData();
                }
            }
        }
        getRepos()
    }, [])
    useEffect(() => {

        const fetchData = async () => {
            if (repo) {
                await RepoStore.setRepo(repo);
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
