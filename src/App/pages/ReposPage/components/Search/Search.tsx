import MultiDropdown from "../../../../../components/MultiDropdown"
import Input from "../../../../../components/Input"
import Button from "../../../../../components/Button/Button"
import { Option } from "../../../../../components/MultiDropdown/MultiDropdown"
import SearchIcon from "../../../../../components/Button/SearchIconBtn"
import styles from './styles.module.scss'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { MultiStore } from "../../../../../store/MultiStore/MultiStore"
import { RenderReposStore } from "../../../../../store/RenderReposStore/RenderReposStore"
import { useRootStore } from "../../../../../store/RootStore/RootStore/RootStoreContext"

type multiStoreType = MultiStore
type renderReposStoreType = RenderReposStore

const Search: React.FC<{ RenderReposStore: renderReposStoreType, multiStore: multiStoreType }> = observer(({ RenderReposStore, multiStore }) => {
    const rootStore = useRootStore()
    const [value, setValue] = React.useState<Option[]>([]);
    useEffect(() => {
        setValue([])
        multiStore.updateTags(RenderReposStore.tags);
    }, [RenderReposStore.tags])

    return (
        <div className="search__main">
            <MultiDropdown
                className={'search__drop'}
                options={multiStore.tags}
                value={value}
                onChange={setValue}
                getTitle={(values: Option[]) => values.length === 0 ? 'Choose tags' : `Chosen: ${values.length}`}
                multiStore={multiStore}
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