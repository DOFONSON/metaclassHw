import MultiDropdown from "../../../../../components/MultiDropdown"
import Input from "../../../../../components/Input"
import Button from "../../../../../components/Button/Button"
import { Option } from "../../../../../components/MultiDropdown/MultiDropdown"
import SearchIcon from "../../../../../components/Button/SearchIconBtn"
import styles from './styles.module.scss'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { RenderReposStore } from "../../../../../store/RenderReposStore/RenderReposStore"
import { useRootStore } from "../../../../../store/RootStore/RootStore/RootStoreContext"

type renderReposStoreType = RenderReposStore

const Search: React.FC<{ RenderReposStore: renderReposStoreType }> = observer(({ RenderReposStore }) => {
    const rootStore = useRootStore()
    const [value, setValue] = React.useState<Option[]>([]);
    useEffect(() => {
        setValue([])
    }, [RenderReposStore.multiStore.tags])

    return (
        <div className="search__main">
            <MultiDropdown
                className={'search__drop'}
                options={RenderReposStore.multiStore.tags}
                value={value}
                onChange={setValue}
                getTitle={(values: Option[]) => values.length === 0 ? 'Choose tags' : `Chosen: ${values.length}`}
                renderReposStore={RenderReposStore}
            />
            <div className={styles.input_search_block}>
                <Input id="searchInput" onChange={() => { }} className={'search__input_input'} ></Input>
                <Button onClick={(RenderReposStore.handleSearch)}><SearchIcon /></Button>
            </div>
        </div >
    );
});

export default Search;