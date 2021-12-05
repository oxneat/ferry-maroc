import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ type: '', msg: '' });

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {
                children
            }
        </AlertContext.Provider>
    )
}
