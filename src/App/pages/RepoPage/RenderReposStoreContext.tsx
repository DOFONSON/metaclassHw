import React, { createContext, useContext, ReactNode } from 'react';

const RenderReposStoreContext = createContext(null);

export const useRenderReposStoreContext = () => {
    const context = useContext(RenderReposStoreContext);
    if (!context) {
        throw new Error('useRenderReposStoreContext must be used within a RenderReposStoreProvider');
    }
    return context;
};

interface RenderReposStoreProviderProps {
    value: any;
    children: ReactNode;
}

export const RenderReposStoreProvider: React.FC<RenderReposStoreProviderProps> = ({ children, value }) => {
    return (
        <RenderReposStoreContext.Provider value={value}>
            {children}
        </RenderReposStoreContext.Provider>
    );
};
