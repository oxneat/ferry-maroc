import React, { createContext, useState } from 'react';

export const TabStateContext = createContext();

export const TabStateProvider = ({ children }) => {
    const [showBottomTab, setShowBottomTab] = useState(true);

    return (
        <TabStateContext.Provider value={{ showBottomTab, setShowBottomTab }}>
            {
                children
            }
        </TabStateContext.Provider>
    )
}
