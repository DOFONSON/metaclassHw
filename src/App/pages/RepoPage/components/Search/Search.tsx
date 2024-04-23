import MultiDropdown from "../../../../../components/MultiDropdown"
import Input from "../../../../../components/Input"
import Button from "../../../../../components/Button/Button"
import { Option } from "../../../../../components/MultiDropdown/MultiDropdown"
import SearchIcon from "../../../../../components/Button/SearchIconBtn"
import styles from './styles/styles.module.scss'
import repoStore from '../../../../../store/RenderReposStore/';
import React from 'react'
const Search: React.FC = () => {
    const handleSearch = async () => {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
        if (searchInput) {
            await repoStore.fetchRepos(searchInput.value);
            console.log(repoStore);
        }
    };

    const [value, setValue] = React.useState<Option[]>([]);


    return (
        <div className="search__main">
            <MultiDropdown
                className={'search__drop'}
                options={[
                    { key: 'msk', value: 'Москва' },
                    { key: 'spb', value: 'Санкт-Петербург' },
                    { key: 'ekb', value: 'Екатеринбург' }
                ]}
                value={value}
                onChange={setValue}
                getTitle={(values: Option[]) => values.length === 0 ? 'Выберите город' : `Выбрано: ${values.length}`}
            ></MultiDropdown>
            <div className={styles.input_search_block}>
                <Input id="searchInput" onChange={() => { }} className={'search__input_input'} ></Input>
                <Button onClick={handleSearch}><SearchIcon /></Button>
            </div>
        </div >
    );
}

export default Search;