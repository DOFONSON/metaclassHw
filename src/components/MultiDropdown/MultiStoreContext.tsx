import React, { createContext, useContext, ReactNode } from 'react';

const MultiStoreContext = createContext(null);

export const useMultiStoreContext = () => {
    const context = useContext(MultiStoreContext);
    if (!context) {
        throw new Error('useMultiStoreContext must be used within a MultiStoreProvider');
    }
    return context;
};

interface MultiStoreProviderProps {
    value: any;
    children: ReactNode;
}

export const MultiStoreProvider: React.FC<MultiStoreProviderProps> = ({ children, value }) => {
    return (
        <MultiStoreContext.Provider value={value}>
            {children}
        </MultiStoreContext.Provider>
    );
};
