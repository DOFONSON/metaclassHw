import React, { createContext, useContext, ReactNode } from 'react';

const ClientProfileStoreContext = createContext(null);

export const useClientProfileStoreContext = () => {
    const context = useContext(ClientProfileStoreContext);
    if (!context) {
        throw new Error('useClientProfileStoreContext must be used within a ClientProfileStoreProvider');
    }
    return context;
};

interface ClientProfileStoreProviderProps {
    value: any;
    children: ReactNode;
}

export const ClientProfileStoreProvider: React.FC<ClientProfileStoreProviderProps> = ({ children, value }) => {
    return (
        <ClientProfileStoreContext.Provider value={value}>
            {children}
        </ClientProfileStoreContext.Provider>
    );
};
