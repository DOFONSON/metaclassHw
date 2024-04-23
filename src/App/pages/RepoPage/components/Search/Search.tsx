import MultiDropdown from "../../../../../components/MultiDropdown"
import Input from "../../../../../components/Input"
import Button from "../../../../../components/Button/Button"
import { Option } from "../../../../../components/MultiDropdown/MultiDropdown"
import SearchIcon from "../../../../../components/Button/SearchIconBtn"
import styles from './styles/styles.module.scss'
import { observable } from 'mobx';
import repoStore from '../../../../../store/RenderReposStore/';

const Search: React.FC = () => {
    const handleSearch = async () => {
        await repoStore.fetchRepos(document.getElementById('searchInput')?.value);
        console.log(repoStore);
    };

    return (
        <div className="search__main">
            <MultiDropdown
                className={'search__drop'}
                options={[
                    { key: 'msk', value: 'Москва' },
                    { key: 'spb', value: 'Санкт-Петербург' },
                    { key: 'ekb', value: 'Екатеринбург' }
                ]}
                value={[{ key: 'msk', value: 'Москва' }]}
                onChange={() => ({ key, value }: Option) => console.log('Выбрано:', key, value)}
                getTitle={(values: Option[]) => values.length === 0 ? 'Выберите город' : `Выбрано: ${values.length}`}
            ></MultiDropdown>
            <div className={styles.input_search_block}>
                <Input id="searchInput" onChange={() => { }} className={'search__input_input'} ></Input>
                <Button onClick={handleSearch}><SearchIcon /></Button>
            </div>
        </div >
    );
}

export default observable(Search);