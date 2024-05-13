import Search from './components/Search/Search';
import Users from './components/Users/Users';
import React from 'react';
import style from './RepoPage.module.scss';
import { useLocalObservable } from 'mobx-react-lite';
import { RenderReposStore } from '../../../store/RenderReposStore/RenderReposStore';
import { MultiStoreProvider } from '../../../components/MultiDropdown/MultiStoreContext';
import { MultiStore } from '../../../store/MultiStore/MultiStore';
const RepoPage = () => {
    const renderReposStore = useLocalObservable(() => new RenderReposStore());
    const multiStore = useLocalObservable(() => new MultiStore())
    return (
        <React.Fragment>
            <main className={style.page__main}>
                <div className={style.wrapper}>
                    <h2 className={style.RepoPage__org_list_title}>List of organization repositories</h2>
                    <MultiStoreProvider value={multiStore}>
                        <Search RenderReposStore={renderReposStore} multiStore={multiStore} />
                    </MultiStoreProvider>
                    <Users ReposStore={renderReposStore} />
                </div>
            </main>
        </React.Fragment>
    );
};

export default RepoPage;