import axios from "axios";

const GITHUB_TOKEN = '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';

type Data = {
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
    stargazers_count: number;
    description: string;
    avatarUrl: 'string';
    updatedAt: string;
    name: string;
    company_login: string;
    topics: string[];
    watchers: number;
    forks: number;
    contributors: {}[];
    languagesResult: object;
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const fetchRepos = async () => {
    try {
        const result = await axios.get('https://api.github.com/orgs/ktsstudio/repos', {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });
        const repos = await Promise.all(result.data.map(async (raw: Data) => {
            const dateUpdate = new Date(Date.parse(raw.updated_at));
            console.log(raw);

            const newUpdate = dateUpdate.getDay() + ' ' + months[dateUpdate.getMonth()];

            const contributorsResult = await axios.get(raw.contributors_url, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            });
            const languagesResult = await axios.get(raw.languages_url, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            });
            console.log(languagesResult);

            const contributors = contributorsResult.data;

            return {
                id: raw.id,
                stargazers_count: raw.stargazers_count || 0,
                description: raw.description,
                avatarUrl: raw.owner.avatar_url,
                name: raw.name,
                updated_at: newUpdate,
                company_login: raw.owner.login,
                topics: raw.topics,
                watchers: raw.watchers,
                forks: raw.forks_count,
                contributors: contributors,
                languagesResult: languagesResult
            };
        }));
        return repos;
    } catch (error) {
        console.error('Error fetching repos:', error);
        return [];
    }
};

export const FETCHED_DATA = await fetchRepos();
