import { useEffect, useState } from 'react';
import Info from "./components/Info";
import { useParams } from 'react-router-dom';
import Readme from './components/Readme';
import style from './UserPage.module.scss'
import { SingleRepoStore } from '../../../store/RepoStore/RepoStore';
import Loading from './components/Stub/Loading';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { Meta } from '../../../shared/meta';

const SingleRepo = observer(() => {
    const singleRepoStore = useLocalObservable(() => new SingleRepoStore())
    const { id } = useParams<{ id: string }>();

    useEffect(() => {

        if (id) {

            const getRepos = async () => {
                let url = new URL(window.location.href);

                let comp = url.href.split('&search=')[1]

                await singleRepoStore.fetchRepos(comp || '', +id)
            }
            getRepos()
        }
    }, [id])

    useEffect(() => {
    }, [singleRepoStore.meta])

    return (
        <>
            <main className={style.main__user_page}>
                {singleRepoStore.meta == Meta.Loading && <Loading />}
                {singleRepoStore.meta == Meta.Success && singleRepoStore.repo && (
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
})

export default SingleRepo;