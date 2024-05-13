import React, { createContext, useContext, ReactNode } from 'react';

const RepoStoreContext = createContext(null);

export const useRepoStoreContext = () => {
    const context = useContext(RepoStoreContext);
    if (!context) {
        throw new Error('useRenderReposStoreContext must be used within a RenderReposStoreProvider');
    }
    return context;
};

interface RepoStoreProviderProps {
    value: any;
    children: ReactNode;
}

export const RepoStoreProvider: React.FC<RepoStoreProviderProps> = ({ children, value }) => {
    return (
        <RepoStoreContext.Provider value={value}>
            {children}
        </RepoStoreContext.Provider>
    );
};