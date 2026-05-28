import React, { createContext, useState, useEffect, useContext } from 'react';
import { menuItems as localMenuItems } from '../data/menuData';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMenuItems = async (forceRefresh = false) => {
        // Only fetch if empty or forced (e.g., from Admin Panel)
        if (menuItems.length > 0 && !forceRefresh) {
            return;
        }

        setLoading(true);
        try {
            const url = forceRefresh ? `/api/menu?t=${Date.now()}` : '/api/menu';
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setMenuItems(data);
            } else {
                console.warn('API error, using local menu data');
                setMenuItems(localMenuItems);
            }
        } catch (error) {
            console.warn('Backend not running, using local menu data:', error.message);
            setMenuItems(localMenuItems);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    return (
        <MenuContext.Provider value={{ menuItems, loading, refreshMenu: () => fetchMenuItems(true) }}>
            {children}
        </MenuContext.Provider>
    );
};
