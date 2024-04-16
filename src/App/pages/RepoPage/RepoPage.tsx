import User from './components/User'
import Header from '../../../components/Header';
import React from 'react'
const RepoPage = () => {
    return (

        <React.Fragment >
            <Header></Header>
            <main className='page__main'>
                <div className="wrapper">
                    <h2 className='RepoPage__org-list-title'>List of organization repositories</h2>

                </div>
            </main>
        </React.Fragment >
    )
}

export default RepoPage;