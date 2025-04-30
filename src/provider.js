import { useState, useEffect, createContext } from 'react';

export const AppCtxProvider = createContext(); // Create a context for the app

export const AppProviderComponent = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page

    const incrementPage = () => {
        console.log('incr page runnint', {currentPage})
        setCurrentPage((prevPage) => prevPage + 1);
    }

    return (
        <AppCtxProvider.Provider value={{ currentPage, incrementPage }}>
            {children}
        </AppCtxProvider.Provider>
    );
}
