// src/AppContext.jsx
import React, { createContext, useState } from 'react';
import { catData as initialCatData } from '../src/data/homeData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    // Shared state for cat profiles
    const [catData, setCatData] = useState(initialCatData);

    const addProfile = (newProfile) => {
        // Generate a new ID
        const newId = catData.length > 0 ? Math.max(...catData.map(cat => cat.id)) + 1 : 1;

        const profileWithId = {
            ...newProfile,
            id: newId
        };

        setCatData(prevData => [...prevData, profileWithId]);
    };

    return (
        <AppContext.Provider value={{ theme, toggleTheme, catData, addProfile }}>
            {children}
        </AppContext.Provider>
    );
};
