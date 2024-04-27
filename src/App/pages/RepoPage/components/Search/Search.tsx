import MultiDropdown from "../../../../../components/MultiDropdown"
import Input from "../../../../../components/Input"
import Button from "../../../../../components/Button/Button"
import { Option } from "../../../../../components/MultiDropdown/MultiDropdown"
import SearchIcon from "../../../../../components/Button/SearchIconBtn"
import styles from './styles/styles.module.scss'
import repoStore from '../../../../../store/RenderReposStore/';
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import MultiStore from "../../../../../store/MultiStore"



const Search: React.FC = observer(() => {
    const handleSearch = async () => {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
        if (searchInput) {
            await repoStore.fetchRepos(searchInput.value);
        }
    };

    const [value, setValue] = React.useState<Option[]>([]);

    useEffect(() => {
        setValue([])
    }, [MultiStore.tags])

    return (
        <div className="search__main">
            <MultiDropdown
                className={'search__drop'}
                options={MultiStore.tags}
                value={value}
                onChange={setValue}
                getTitle={(values: Option[]) => values.length === 0 ? 'Choose tags' : `Chosen: ${values.length}`}
            />
            <div className={styles.input_search_block}>
                <Input id="searchInput" onChange={() => { }} className={'search__input_input'} ></Input>
                <Button onClick={handleSearch}><SearchIcon /></Button>
            </div>
        </div >
    );
});

export default Search;
