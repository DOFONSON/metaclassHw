import Header from '../../../components/Header';
import Search from './components/Search/Search';
import Users from './components/Users/Users'
import React from 'react'
import style from './styles/RepoPage.module.scss'
const RepoPage = () => {

    return (

        <React.Fragment >
            <Header />
            <main className={style.page__main}>
                <div className={style.wrapper}>
                    <h2 className={style.RepoPage__org_list_title}>List of organization repositories</h2>
                    <Search></Search>
                    <Users></Users>
                </div>
            </main>
        </React.Fragment >
    )
}

export default RepoPage;