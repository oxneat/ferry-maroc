import React, { createContext, useState } from 'react';

export const TabStateContext = createContext();

export const TabStateProvider = ({ children }) => {
    const [showBottomTab, setShowBottomTab] = useState(true);
    const [currentRoute, setCurrentRoute] = useState('home');

    return (
        <TabStateContext.Provider value={{ showBottomTab, setShowBottomTab, currentRoute, setCurrentRoute }}>
            {
                children
            }
        </TabStateContext.Provider>
    )
}
