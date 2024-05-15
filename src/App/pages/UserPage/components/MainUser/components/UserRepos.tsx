import React from "react";
import Languages from "../../../../../../components/Languages";
import { useRootStore } from "../../../../../../store/RootStore/RootStore/RootStoreContext";
type Repos = {
    repos: []
}

type Repo = {
    id: number;
    name: string;
    languages: {}
}

const UserRepos = (repos: Repos) => {
    const rootStore = useRootStore()
    console.log(rootStore.cliProfileStore.languages);
    
  return (
    <ul>
      {repos.repos.map((repo: Repo) => (
        <li key={repo.id}>
            <div className="main">
                <h3>{repo.name}</h3>
            </div>
           <div className="languages">
                <Languages languages={repo.languages}/>
           </div>
        </li>
      ))}
    </ul>
  );
};

export default UserRepos;