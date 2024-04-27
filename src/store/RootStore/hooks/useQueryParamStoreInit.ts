import * as Router from 'react-router-dom'

import rootStore from '../RootStore/instanse'

import ReposStore from '../../RenderReposStore';

export const useQueryParamStoreInit = (): void => {
    const { search } = Router.useLocation();
    rootStore.query.setSearch(search)
}