import axios from "axios";
export const GITHUB_TOKEN = '';

export type Data = {
    id?: string;
    stargazers_count?: number;
    description?: string;
    owner: {
        avatar_url?: string;
        login: string;
    };
    name?: string;
    updated_at: string;
    topics: string[];
    watchers: number;
    forks_count: number;
    contributors_url: string;
    languages_url: string;
};

export type Repo = {
    id: number;
    owner?: {
        login?: string
    }
    stargazers_count: number;
    description: string;
    avatarUrl: 'string';
    updatedAt: string;
    name: string;
    company_login: string;
    topics: string[];
    watchers: number;
    forks: number;
    contributors: string;
    languagesResult: string;
    readme: string | undefined;
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const axiosGetData = async (url: string, token: string) => {
    return axios.get(url, {
        headers: {
            Authorization: `token ${token}`
        }
    });
}


export const fetchRepos = async (organisation: string) => {
    console.log(organisation);

    try {
        const result = await axiosGetData(`https://api.github.com/orgs/${organisation}/repos`, GITHUB_TOKEN);
        const repos = await Promise.all(result.data.map(async (raw: Data) => {
            const dateUpdate = new Date(Date.parse(raw.updated_at));

            const newUpdate = dateUpdate.getDay() + ' ' + months[dateUpdate.getMonth()];

            return {
                id: raw.id,
                stargazers_count: raw.stargazers_count || 0,
                description: raw.description,
                avatarUrl: raw.owner.avatar_url,
                name: raw.name,
                updatedAt: newUpdate,
                company_login: raw.owner.login,
                topics: raw.topics,
                watchers: raw.watchers,
                forks: raw.forks_count,
                contributors: raw.contributors_url,
                languagesResult: raw.languages_url,
                owner: raw.owner
            };
        }));
        return repos;
    } catch (error) {
        console.error('Error fetching repos:', error);
        return [];
    }
};

export default fetchRepos;
