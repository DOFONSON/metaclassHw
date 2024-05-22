import axios from "axios";
import { marked } from "marked";
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
        login?: string;
        avatar_url: string
    }
    stargazersCount: number;
    description: string;
    avatarUrl: 'string';
    updatedAt: string;
    name: string;
    companyLogin: string;
    topics: string[];
    watchers: number;
    forks: number;
    contributors: string;
    languagesResult: string;
    readme: string | undefined;
    contributors_url: string;
    languages_url: string;
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const axiosGetData = async (url: string, token: string) => {
    return axios.get(url, {
        headers: {
            Authorization: `token ${token}`
        }
    });
}

export const fetchRepos = async (organisation: string) => {

    try {
        const result = await axiosGetData(`https://api.github.com/orgs/${organisation}/repos`, GITHUB_TOKEN);

        const repos = await Promise.all(result.data.map(async (raw: Data) => {
            const dateUpdate = new Date(Date.parse(raw.updated_at));

            const newUpdate = dateUpdate.getDay() + ' ' + months[dateUpdate.getMonth()];
            return {
                id: raw.id,
                stargazersCount: raw.stargazers_count || 0,
                description: raw.description,
                avatarUrl: raw.owner.avatar_url,
                name: raw.name,
                updatedAt: newUpdate,
                companyLogin: raw.owner.login,
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
function decodeBase64(encoded:any) {
    const decoded = atob(encoded);  // Decode base64
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
    }
    const text = new TextDecoder('utf-8').decode(bytes);
    return text;
}

export const getOptionalData = async (contributors: string, languages: string, login: string, name: string, repo: Repo) => {
    try {

        const contributorsResult = await axiosGetData(contributors, GITHUB_TOKEN)

        const languagesResult = await axiosGetData(languages, GITHUB_TOKEN)

        let readmeContent: string | undefined = undefined;
        try {
            const readmeResult = await axiosGetData(`https://api.github.com/repos/${login}/${name}/readme`, GITHUB_TOKEN).then(response => {
                const markdown = decodeBase64(response.data.content);
                return marked(markdown);
              });
            readmeContent = readmeResult;
        } catch (error) {
            console.error('Error while fetching:', error);
        }

        const contributorsData = contributorsResult.data;

        repo.contributors = contributorsData;
        repo.readme = readmeContent;
        repo.languagesResult = languagesResult.data;

        return repo

    } catch (error) {
        console.error('Error while fetching data:', error);
    }
}

export default fetchRepos;
