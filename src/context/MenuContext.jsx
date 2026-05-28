import React, { createContext, useContext, useState, useEffect } from 'react';
import { menuItems as staticMenuItems } from '../data/menuData';
import { supabase } from '../supabaseClient';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState(staticMenuItems);
    const [loading, setLoading] = useState(true);

    const fetchMenu = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                console.warn('Supabase fetch error, using static fallback:', error.message);
                setMenuItems(staticMenuItems);
            } else if (data && data.length > 0) {
                // Map the Supabase data back to the structure expected by the app
                const formattedItems = data.map(item => ({
                    id: parseInt(item.id),
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    image: item.image_url || '🥘',
                    description: item.description,
                    veg: item.veg,
                    hot: item.hot,
                    cold: item.cold
                }));
                setMenuItems(formattedItems);
            } else {
                // If database is empty, fall back to static list
                setMenuItems(staticMenuItems);
            }
        } catch (err) {
            console.error('Fatal fetch error, using static fallback:', err);
            setMenuItems(staticMenuItems);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <MenuContext.Provider value={{ menuItems, loading, refreshMenu: fetchMenu }}>
            {children}
        </MenuContext.Provider>
    );
};
