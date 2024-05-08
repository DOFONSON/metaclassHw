import React from 'react';
import RootStoreContext from './RootStoreContext';
import rootStore from './instanse';
export const RootStoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const store = rootStore;
    return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};
