import Header from '../../../components/Header';
import Search from './components/Search';
import Users from './components/Users'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
const RepoPage = () => {
    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: 'https://api.github.com/orgs/ktsstudio/repos'
            })
            console.log(result);

        }
        fetch()
    }, [])
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