import React, { createContext, useContext } from 'react';
import { menuItems } from '../data/menuData';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    return (
        <MenuContext.Provider value={{ menuItems, loading: false }}>
            {children}
        </MenuContext.Provider>
    );
};
