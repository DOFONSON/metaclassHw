import Header from '../../../components/Header';
import Search from './components/Search';
import Users from './components/Users'
import React from 'react'
const RepoPage = () => {

    return (

        <React.Fragment >
            <Header></Header>
            <main className='page__main'>
                <div className="wrapper">
                    <h2 className='RepoPage__org-list-title'>List of organization repositories</h2>
                    <Search></Search>
                    <Users></Users>
                </div>
            </main>
        </React.Fragment >
    )
}

export default RepoPage;