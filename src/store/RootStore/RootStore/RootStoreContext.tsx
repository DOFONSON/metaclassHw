import { createContext, useContext } from 'react';
import rootStore from './instanse';

const RootStoreContext = createContext(rootStore);

export const useRootStore = () => {
    const store = useContext(RootStoreContext);
    if (!store) {
        throw new Error('useRootStore must be used within a RootStoreProvider');
    }
    return store;
};

export default RootStoreContext;
