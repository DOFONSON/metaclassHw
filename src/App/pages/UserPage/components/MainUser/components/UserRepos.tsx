import React from "react";
import Languages from "../../../../../../components/Languages";
import { useRootStore } from "../../../../../../store/RootStore/RootStore/RootStoreContext";
import style from './UserRepos.module.scss'
type Repos = {
    repos: []
}

type Repo = {
    id: number;
    name: string;
    languages: {};
    size: number;
    pushed_at: string;
    forks: number;
    created_at: string;
    url: string;
    owner: {
        login: string;
    }
}

const UserRepos = (repos: Repos) => {
    const rootStore = useRootStore()
    
  return (
    <ul className={style.repo__list}>
      {repos.repos.map((repo: Repo) => (
        <li key={repo.id} className={style.repo}>
            <div className={style.repo__main}>
                <h3 className={style.repo__name}>{repo.name}</h3>
                <ul className={style.repo__description}>
                    <li>Size: {repo.size}</li>
                    <li>Pushed at: {repo.pushed_at}</li>
                    <li>Forks: {repo.forks}</li>
                    <li>Created at: {repo.created_at}</li>
                </ul>
            </div>
           <div className="languages">
                <Languages languages={repo.languages}/>
           </div>
           <div className="repo__link">
            <a href={`https://github.com/${repo.owner.login}/${repo.name}`} className={style.repo__link_btn} target="blank">Go to repo!</a>
           </div>
        </li>
      ))}
    </ul>
  );
};

export default UserRepos;