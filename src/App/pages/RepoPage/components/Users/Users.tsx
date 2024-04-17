import { useState, useEffect } from 'react';
import Card from '../Card';
import axios from 'axios';

type Data = {
    id?: string;
    stargazers_count?: number;
    description?: 'string';
    owner: {
        avatar_url?: 'string'
    };
    name?: string;
    updated_at?: string;
}

type Repo = {
    id: number;
    stargazers_count: number;
    description: string;
    avatarUrl: 'string';
    updated_at: string;
    name: string;
}

const Users = () => {
    const [repos, setRepos] = useState<Repo[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: 'https://api.github.com/orgs/ktsstudio/repos'
            })
            setRepos(result.data.map((raw: Data) => {
                return {
                    id: raw.id,
                    stargazers_count: raw.stargazers_count || 0,
                    description: raw.description,
                    avatarUrl: raw.owner.avatar_url,
                    name: raw.name,
                    updated_at: raw.updated_at
                }
            }))
        }
        fetch()

    }, []);

    return (
        <>
            <ul className='repos'>
                {repos.map((repo: Repo) => (
                    <li><Card key={repo.id} className={'repos__card'} image={repo.avatarUrl} captionSlot={repo.stargazers_count} title={repo.name} contentSlot={repo.description} subtitle={repo.updated_at} /></li>
                ))}
            </ul>

        </>
    )
}

export default Users