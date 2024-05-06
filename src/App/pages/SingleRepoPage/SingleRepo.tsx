import { useEffect, useState } from 'react';
import Info from "./components/Info";
import { useParams } from 'react-router-dom';
import Readme from './components/Readme';
import style from './UserPage.module.scss'
import reposStore from '../../../store/RenderReposStore/RenderReposStore';
import { SingleRepoStore } from '../../../store/RepoStore/RepoStore';
import ReposStore from '../../../store/RenderReposStore/RenderReposStore';
import Loading from './components/Stub/Loading';
import rootStore from '../../../store/RootStore/RootStore/instanse';
import { useLocalObservable } from 'mobx-react-lite';
const SingleRepo = () => {

    const singleRepoStore = useLocalObservable(() => new SingleRepoStore())

    const { id } = useParams<{ id: string }>();
    if (id == undefined) return
    let repo = rootStore.repos.entities[+id];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRepos = async () => {
            if (repo) {
                let comp = new URL(window.location.href)
                comp.searchParams.set('search', repo.companyLogin.toString())
                window.history.pushState({ path: comp.href }, '', comp.href);
            } else {
                let comp = new URL(window.location.href)
                if (comp.searchParams.get('search')) {
                    await ReposStore.fetchRepos(comp.searchParams.get('search') || '')
                    repo = reposStore.repos.entities[+id];
                    const fetchData = async () => {
                        if (repo) {
                            await singleRepoStore.setRepo(repo);
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
                await singleRepoStore.setRepo(repo);
                setLoading(false);
            }
        }

        fetchData();
    }, [repo]);

    return (
        <>
            <main className={style.main__user_page}>
                {loading && <Loading />}
                {!loading && singleRepoStore.repo && (
                    <>
                        <Info
                            compName={singleRepoStore.repo.companyLogin}
                            compURL={singleRepoStore.repo.avatarUrl}
                            repName={singleRepoStore.repo.name}
                            topics={singleRepoStore.repo.topics}
                            stars={singleRepoStore.repo.stargazersCount}
                            watchers={singleRepoStore.repo.watchers}
                            forks={singleRepoStore.repo.forks}
                            contributors={singleRepoStore.repo.contributors}
                            languages={singleRepoStore.repo.languagesResult}
                        />
                        {singleRepoStore.repo?.readme && <Readme data={singleRepoStore.repo?.readme} />}
                    </>
                )}
            </main>
        </>
    );
}

export default SingleRepo;