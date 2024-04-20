import axios from "axios";

const GITHUB_TOKEN = '';

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
    readme: string | undefined;
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

            let readmeContent: string | undefined = undefined;
            try {
                const readmeResult = await axios.get(`https://api.github.com/repos/${raw.owner.login}/${raw.name}/readme`, {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`
                    }
                });
                readmeContent = decodeURIComponent(escape(atob(readmeResult.data.content)));
            } catch (error) {
                console.error('Error while fetching:', error);
            }

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
                languagesResult: languagesResult,
                readme: readmeContent
            };
        }));
        return repos;
    } catch (error) {
        console.error('Error fetching repos:', error);
        return [];
    }
};

export const FETCHED_DATA = await fetchRepos();
