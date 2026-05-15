import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'
import { addToCart } from './utils/cart'

function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [dietaryFilter, setDietaryFilter] = useState('all');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cartToast, setCartToast] = useState(false);

    const handleAddToCart = (item) => {
        addToCart(item, 1);
        setCartToast(true);
        setTimeout(() => setCartToast(false), 1800);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto slide hero
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const heroSlides = [
        {
            title: "Authentic Delhi Street Food",
            subtitle: "Experience the vibrant flavors of Delhi's finest chaats and traditional dishes",
            bg: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/images/Hero-1.png')"
        },
        {
            title: "Food Served With Love",
            subtitle: "Every dish prepared with care and passion by our expert chefs",
            bg: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/images/Hero-2.png')"
        },
        {
            title: "Over 50 Delicious Items",
            subtitle: "From traditional chaats to royal thalis - taste the magic of Delhi",
            bg: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/images/Hero-3.png')"
        }
    ];

    // Menu categories
    const categories = [
        { id: 'all', name: 'All', icon: '🍽️' },
        { id: 'chaat', name: 'The Chatpati Chaat', icon: '🥗' },
        { id: 'mumbai', name: 'Mumbai Local', icon: '🚂' },
        { id: 'snacks', name: 'Snacks Ka Chaska', icon: '🍢' },
        { id: 'tandoor', name: 'The Tikkawala (Tandoor)', icon: '🔥' },

        { id: 'biryani', name: 'Biryani Ki Kahani', icon: '🍛' },
        { id: 'thali', name: 'C.P.D Special Thalis', icon: '🍱' },
        { id: 'curry-veg', name: 'Tadka Marke', icon: '🍲' },
        { id: 'curry-nonveg', name: 'Curry Main Kya Hai', icon: '🥘' },
        { id: 'bread', name: 'Tandoori Daawat', icon: '🥖' },
        { id: 'parantha', name: 'Old School Paranthas', icon: '🫓' },
        { id: 'rolls', name: 'Roll Baby Roll', icon: '🌯' },
        { id: 'sweets', name: 'Meethe Me', icon: '🍮' },
        { id: 'drinks', name: 'Kya Piyoge', icon: '🥤' },
    ];

    // Menu items - ALL items from menu cards with exact names and prices
    const menuItems = [
        // Chatpati Chaat
        { id: 1, name: 'Bhara Samosa (2 Pcs)', price: '$4.00', category: 'chaat', image: '/images/bhara-samosa.png', hot: true, description: 'Experience the authentic taste of Delhi with our handcrafted Bhara Samosas. Each samosa features a perfectly crispy, golden-brown exterior made from refined flour, encasing a flavorful filling of seasoned potatoes, green peas, and aromatic Indian spices.' },
        { id: 2, name: 'Khasta Kachori (2 Pcs)', price: '$6.50', category: 'chaat', image: '🥙', hot: false, description: 'Indulge in our crispy Khasta Kachoris, a beloved Delhi street food delicacy. These perfectly round, puffed pastries are filled with a savory mixture of spiced lentils and aromatic spices, creating an explosion of flavors in every bite.' },
        { id: 3, name: 'Jaypuri Pyaaz Kachori (2 Pcs)', price: '$6.50', category: 'chaat', image: '🥙', hot: false, description: 'A royal treat from Jaipur brought to Delhi! Our Pyaaz Kachoris feature a crispy, flaky crust filled with caramelized onions seasoned with traditional Rajasthani spices. Each bite offers a perfect balance of sweet and savory flavors.' },
        { id: 4, name: 'Chandni Chowk Ke Bhalle', price: '$8.95', category: 'chaat', image: '🥗', hot: false, description: 'Transport yourself to the streets of Old Delhi with our authentic Dahi Bhalle. Soft, melt-in-mouth lentil fritters soaked in creamy, sweetened yogurt and topped with tangy tamarind chutney, mint sauce, and aromatic spices.' },
        { id: 5, name: 'Churmuri Bhel', price: '$8.95', category: 'chaat', image: '🥘', hot: false, description: 'A light and crunchy street food favorite! Our Churmuri Bhel combines puffed rice with fresh vegetables, roasted peanuts, and a medley of tangy and spicy chutneys, creating a perfect harmony of textures and flavors.' },
        { id: 6, name: 'Golgappe (12 Pcs)', price: '$13.95', category: 'chaat', image: '🥙', hot: true, description: 'The most iconic Delhi street food! Our Golgappe (Pani Puri) feature ultra-crispy semolina shells filled with spiced mashed potatoes and chickpeas, then dunked in tangy-spicy tamarind water. An explosion of flavors in every bite!' },
        { id: 7, name: 'Sev Puri Dahi Puri (SPDP)', price: '$8.95', category: 'chaat', image: '🥗', hot: false, description: 'A delightful combination platter! Enjoy both Sev Puri (crispy puris topped with potatoes, onions, chutneys, and sev) and Dahi Puri (puris filled with yogurt, tamarind chutney, and spices) in one serving.' },
        { id: 8, name: 'Papri Chaat', price: '$8.95', category: 'chaat', image: '🥘', hot: false, description: 'A classic Delhi chaat! Crispy wheat crackers (papri) topped with boiled potatoes, chickpeas, yogurt, and a symphony of sweet and spicy chutneys, garnished with fresh coriander and sev.' },
        { id: 9, name: 'Dahi Aloo Tikki', price: '$8.95', category: 'chaat', image: '🍢', hot: false, description: 'Crispy-on-the-outside, soft-on-the-inside potato tikkis topped with cool yogurt, tangy tamarind chutney, spicy green chutney, and garnished with pomegranate seeds and fresh coriander.' },
        { id: 10, name: 'Raj Kachori', price: '$9.95', category: 'chaat', image: '🥙', hot: true, description: 'The king of all kachoris! A large, crispy kachori bowl filled with moong dal, potatoes, chickpeas, yogurt, and topped with an array of chutneys, sev, and spices. A complete meal in itself!' },
        { id: 11, name: 'Chola Tikki Chaat', price: '$9.95', category: 'chaat', image: '🥘', hot: false, description: 'A hearty combination of crispy potato tikkis served with spicy chickpea curry, topped with yogurt, chutneys, onions, and a sprinkle of aromatic spices.' },
        { id: 12, name: 'Samosa Chaat', price: '$9.95', category: 'chaat', image: '🌮', hot: true, description: 'The ultimate comfort food! Crispy samosas broken and topped with spicy chickpea curry, yogurt, tamarind and mint chutneys, creating a delicious medley of textures and flavors.' },
        { id: 13, name: 'Veg Pakode', price: '$8.95', category: 'chaat', image: '🍢', hot: false, description: 'Crispy vegetable fritters made with fresh seasonal vegetables dipped in spiced chickpea flour batter and deep-fried to golden perfection. Perfect with chai!' },
        { id: 14, name: 'Chutney Paneer Pakora', price: '$10.95', category: 'chaat', image: '🧀', hot: false, description: 'Premium cottage cheese slices sandwiched with spicy mint chutney, coated in seasoned chickpea batter, and deep-fried until crispy. An elevated version of traditional pakoras!' },
        { id: 15, name: 'Golgappa Basket (24 Pcs)', price: '$24.95', category: 'chaat', image: '🥙', hot: true, description: 'The ultimate party platter! 24 crispy semolina shells served with three different types of flavored waters and spicy potato-chickpea filling.' },
        { id: 16, name: 'Ghungaraale Fries', price: '$6.95', category: 'chaat', image: '🍟', hot: false, description: 'Our signature curly fries are seasoned with a special blend of chatpati spices! Crispy on the outside, fluffy on the inside, and spiraled for maximum fun.' },
        { id: 17, name: 'Sev Puri', price: '$8.95', category: 'chaat', image: '🥗', hot: false, description: 'The quintessential Mumbai street snack! Flat crispy puris loaded with diced potatoes, onions, and three types of chutneys (tamarind, chili, garlic), topped strictly with mountains of nylon sev.' },
        { id: 18, name: 'Kurkure Tokri', price: '$9.95', category: 'chaat', image: '🥙', hot: false, description: 'An edible art piece! A crispy, basket-shaped katori made from grated potatoes, filled with sprouts, pomegranate, yogurt, chutneys, and spices. Looks amazing, tastes even better.' },
        { id: 19, name: 'Golgappa (8Pcs)', price: '$8.95', category: 'chaat', image: '🥙', hot: false, description: 'The most iconic Delhi street food! Our Golgappe (Pani Puri) feature ultra-crispy semolina shells filled with spiced mashed potatoes and chickpeas, then dunked in tangy-spicy tamarind water.' },
        { id: 20, name: 'Sabudana Wada', price: '$8.95', category: 'chaat', image: '🥘', hot: false, description: 'A popular fasting snack from Maharashtra! Crispy deep-fried fritters made from soaked tapioca pearls (sabudana), mashed potatoes, and crushed peanuts. Served with sweetened curd or green chutney.' },

        // Mumbai Local
        { id: 21, name: 'Bun Samosa', price: '$9.95', category: 'mumbai', image: '🍔', hot: false, description: 'A classic Indian street burger! A crispy samosa tucked inside a soft bun, slathered with spicy green chutney and sweet tamarind chutney. A perfect on-the-go snack.' },
        { id: 22, name: 'Karjat Vada Pav', price: '$9.95', category: 'mumbai', image: '🍔', hot: true, description: 'Famous from Karjat station! A spicy, deep-fried potato dumpling (vada) served in a pav (bread roll) with a generous amount of garlic chutney and fried green chili.' },
        { id: 23, name: 'Garlic Cheese Vada Pav', price: '$10.95', category: 'mumbai', image: '🍔', hot: false, description: 'A cheesy twist on the classic Vada Pav! Our spicy potato vada is topped with a slice of cheese and melted butter, served in a soft pav with chutneys.' },
        { id: 24, name: 'Kacchi Dabeli', price: '$9.95', category: 'mumbai', image: '🍔', hot: false, description: 'A sweet, spicy, and tangy potato burger from Kutch (Gujarat). A soft bun filled with a special dabeli masala potato mix, topped with pomegranate, roasted peanuts, and fine sev.' },
        { id: 25, name: 'Kadak Pav Bhaji', price: '$11.95', category: 'mumbai', image: '🥙', hot: true, description: 'Spicy, buttery, and absolutely delicious! A thick vegetable curry (bhaji) cooked with a special blend of spices, served with butter-toasted pavs and lemon.' },
        { id: 26, name: 'Cheese Pav Bhaji (Amul)', price: '$12.95', category: 'mumbai', image: '🥙', hot: false, description: 'Our famous Pav Bhaji loaded with generous amounts of Amul cheese! The cheese melts into the hot, spicy bhaji, creating a creamy and rich flavor profile.' },
        { id: 27, name: 'Chicken Keema Pav', price: '$15.95', category: 'mumbai', image: '🍔', hot: true, description: 'A spicy and savory delight for non-veg lovers! Minced chicken cooked with aromatic spices, onions, and tomatoes, served with buttered pav. A hearty meal.' },
        { id: 28, name: 'Veg Keema Pav', price: '$12.95', category: 'mumbai', image: '🍔', hot: false, description: 'A vegetarian take on the classic meat dish! Soya granules or minced vegetables cooked in a spicy, flavorful gravy, served with soft pavs.' },
        { id: 29, name: 'Missal Pav', price: '$11.95', category: 'mumbai', image: '🥙', hot: true, description: 'A fiery Maharashtrian curry made from moth beans (matki), topped with farsan (crispy mix), chopped onions, and coriander. Served with pav.' },

        // Snacks Ka Chaska
        { id: 30, name: 'Veg Cheese Burger', price: '$10.95', category: 'snacks', image: '🍔', hot: false, description: 'A desi-style burger featuring a crispy vegetable patty made from potatoes, peas, and carrots, topped with a slice of cheese, fresh veggies, and our special sauce.' },
        { id: 31, name: 'Aloo Subji W/ Khasta Kachori', price: '$10.95', category: 'snacks', image: '🥘', hot: false, description: 'A traditional North Indian breakfast! Spicy potato curry (aloo subji) served with crispy, flaky khasta kachoris. A heavenly combination.' },
        { id: 32, name: 'Chole Bhature', price: '$12.95', category: 'snacks', image: '🥙', hot: true, description: 'The ultimate Punjabi feast! Large, fluffy fried bread (bhature) served with spicy, tangy chickpea curry (chole), pickled onions, and green chilies.' },
        { id: 33, name: 'Bedmi Aloo Puri', price: '$11.95', category: 'snacks', image: '🥘', hot: false, description: 'A popular street food from Agra! Crispy, coarse wheat flour puris stuffed with spiced lentil paste, served with a spicy potato curry.' },
        { id: 34, name: 'Veg Keema Roomali Roti', price: '$11.95', category: 'snacks', image: '🫓', hot: false, description: 'A delicious vegetarian wrap! Spiced soya granules or minced vegetables cooked to perfection and wrapped in a soft, thin roomali roti.' },
        { id: 35, name: 'Sarson Ka Saag Makka Roti', price: '$12.95', category: 'snacks', image: '🥘', hot: false, description: 'A winter classic from Punjab! Nutritious mustard greens (sarson ka saag) served with rustic cornflour flatbread (makki ki roti) and white butter.' },
        { id: 36, name: 'Chicken Keema Roomali Roti', price: '$16.95', category: 'snacks', image: '🫓', hot: true, description: 'A non-veg lover’s dream! Spicy minced chicken (keema) wrapped in a delicate, handkerchief-thin roomali roti with crunchy onions and tangy chutney.' },

        // The Tikkawala (Tandoor)
        { id: 37, name: 'Sutli Chicken', price: '$16.95', category: 'tandoor', image: '🍗', hot: true, description: 'Our signature Tandoori Chicken! Marinated in yoghurt and spices for 24 hours, tied with a string (sutli) and slow-cooked in a tandoor.' },
        { id: 38, name: 'Barrah Chicken', price: '$16.95', category: 'tandoor', image: '🍗', hot: false, description: 'Succulent chicken pieces marinated in a spicy mix of roasted spices and yoghurt, then grilled to perfection for a robust smoky flavor.' },
        { id: 39, name: 'Chicken Malai', price: '$16.95', category: 'tandoor', image: '🍗', hot: false, description: 'A milder, creamy version of the classic chicken tikka. Boneless chicken chunks marinated in cream, cheese, and mild spices.' },
        { id: 40, name: 'Chicken Chatpati', price: '$16.95', category: 'tandoor', image: '🍗', hot: true, description: 'For those who like it hot and tangy! Boneless chicken marinated in a special Chatpati spice blend and grilled to charred perfection.' },


        { id: 41, name: 'Veg Cutlet Sizzler', price: '$11.95', category: 'tandoor', image: '🍳', hot: false, description: 'A delightful sizzler platter featuring crispy vegetable cutlets served on a bed of rice or noodles, with stir-fried vegetables and savory sauce.' },
        { id: 42, name: 'Bhatti Paneer Sizzler', price: '$13.95', category: 'tandoor', image: '🔥', hot: true, description: 'Paneer like never before! Large cubes of paneer marinated in Bhatti spices and grilled, served sizzling with onions and capsicum.' },
        { id: 43, name: 'Chaap Chaap Sizzler', price: '$12.95', category: 'tandoor', image: '🔥', hot: false, description: 'Delicious Soya Chaap marinated in tandoori spices, grilled and served sizzling with grilled onions and mint sauce.' },
        { id: 44, name: 'Chicken Tikka Sizzler', price: '$16.95', category: 'tandoor', image: '🍗', hot: true, description: 'The ultimate platter for chicken lovers! An assortment of Malai Tikka, Haryali Tikka, and Classic Chicken Tikka served on a sizzling plate.' },
        { id: 45, name: 'Lamb Chops', price: '$26.99', category: 'tandoor', image: '🍖', hot: true, description: 'Premium lamb chops marinated in a secret spice blend and grilled to juicy perfection. Served sizzling with grilled vegetables.' },
        { id: 46, name: 'Fish Amritsari', price: '$14.95', category: 'tandoor', image: '🐟', hot: false, description: 'Crispy, golden-fried fish fillets marinated in traditional Amritsari spices and chickpea flour. A light and flavorful appetizer.' },

        // Biryani Ki Kahani
        { id: 47, name: 'Tarkari Biryani (Veg)', price: '$14.95', category: 'biryani', image: '🍛', hot: false, description: 'A royal feast for vegetarians! Fragrant basmati rice layered with a rich medley of seasonal vegetables cooked in aromatic spices and saffron-infused milk.' },
        { id: 48, name: 'Purani Delhi Chicken Biryani', price: '$16.95', category: 'biryani', image: '🍛', hot: true, description: 'Originating from the streets of Old Delhi! Tender chicken pieces marinated in yoghurt and spices, layered with long-grain basmati rice and slow-cooked.' },
        { id: 49, name: 'Purani Delhi Goat Biryani', price: '$21.95', category: 'biryani', image: '🍛', hot: true, description: 'A delicacy for meat connoisseurs! Succulent pieces of goat meat cooked with aromatic spices and layered with premium basmati rice.' },

        // Tadka Marke (Comes With Rice)
        { id: 50, name: 'Aloo Gobhi', price: '$12.95', category: 'curry-veg', image: '🥔', hot: false, description: 'A classic North Indian vegetarian dish made with potatoes (aloo) and cauliflower (gobhi), stir-fried with onions, tomatoes, and aromatic spices.' },
        { id: 51, name: 'Pindi Chole', price: '$12.95', category: 'curry-veg', image: '🥘', hot: true, description: 'A spicy and tangy chickpea curry from the Punjab region. Cooked with a special blend of roasted spices (Pindi masala) and tea leaves.' },
        { id: 52, name: 'Daal Makhanwala', price: '$13.95', category: 'curry-veg', image: '🍲', hot: false, description: 'A creamy and buttery black lentil dish, slow-cooked overnight on a low flame to achieve a velvety texture. Flavored with fresh cream and butter.' },
        { id: 53, name: 'Peeli Daal (Yellow Daal)', price: '$12.95', category: 'curry-veg', image: '🍲', hot: false, description: 'Comforting yellow lentil curry tempered with ghee, cumin seeds, garlic, and dried red chilies. A light and healthy staple.' },
        { id: 54, name: 'Paneer Makhanwala', price: '$14.95', category: 'curry-veg', image: '🧀', hot: true, description: 'Soft paneer cubes simmered in a rich, creamy, and mildly sweet tomato-cashew gravy finished with butter and cream.' },
        { id: 55, name: 'Palak Paneer', price: '$14.95', category: 'curry-veg', image: '🥬', hot: false, description: 'A healthy and delicious dish consisting of paneer cubes cooked in a smooth, spicy spinach gravy. Enriched with cream.' },
        { id: 56, name: 'Kadai Paneer', price: '$14.95', category: 'curry-veg', image: '🥘', hot: false, description: 'Spicy and flavorful paneer dish cooked with bell peppers, onions, and tomatoes in a thick masala gravy with freshly ground spices.' },
        { id: 57, name: 'Malai Kofta', price: '$14.95', category: 'curry-veg', image: '🥘', hot: false, description: 'Soft and creamy cottage cheese dumplings (kofta) deep-fried and served in a rich, velvety tomato-cashew gravy. A royal vegetarian treat.' },
        { id: 58, name: 'Paneer Bhatti Masala', price: '$14.95', category: 'curry-veg', image: '🧀', hot: true, description: 'Smoky grilled paneer tikka pieces tossed in a spicy, rich tomato-onion gravy. Combines the flavor of tandoori paneer with a delicious curry.' },

        // Curry Main Kya Hai
        { id: 59, name: 'Chicken Curry', price: '$16.95', category: 'curry-nonveg', image: '🍗', hot: true, description: 'Classic home-style chicken curry cooked in a spicy onion-tomato gravy with aromatic Indian spices. A timeless favorite.' },
        { id: 60, name: 'Butter Chicken', price: '$16.95', category: 'curry-nonveg', image: '🍗', hot: true, description: 'The world-famous butter chicken! Tender grilled chicken pieces simmered in a rich, creamy, and mildly sweet tomato-butter gravy.' },
        { id: 61, name: 'Goat Curry', price: '$21.95', category: 'curry-nonveg', image: '🍖', hot: true, description: 'Traditional slow-cooked goat meat curry in a rich and spicy gravy. Tender, flavorful, and perfect with rice or naan.' },
        { id: 62, name: 'Karahi Sukha', price: '$23.95', category: 'curry-nonveg', image: '🍲', hot: true, description: 'Dry-style Karahi Chicken (Sukha) cooked in a wok with chunky bell peppers, onions, and tomatoes.' },
        { id: 63, name: 'Chicken Tikka Masala', price: '$16.95', category: 'curry-nonveg', image: '🍗', hot: true, description: 'Classic Chicken Tikka Masala featuring grilled marinated chicken chunks in a spiced creamy tomato sauce.' },
        { id: 64, name: 'Chicken Keema Masala', price: '$17.95', category: 'curry-nonveg', image: '🍲', hot: true, description: 'Minced chicken (Keema) cooked with green peas in a dry, spiced masala. Pairs perfectly with pav or roti.' },

        // Roll Baby Roll
        { id: 65, name: 'Amritsar Soya Chaap Roll', price: '$11.95', category: 'rolls', image: '🌯', hot: false, description: 'Delicious soya chaap marinated in spices and grilled, then wrapped in a soft roti with crunchy onions and tangy chutneys.' },
        { id: 66, name: 'Chatpata Aloo Roll', price: '$11.95', category: 'rolls', image: '🌯', hot: false, description: 'A spicy and tangy potato filling wrapped in a soft roti with onions and green chilies. A perfect street-style snack.' },
        { id: 67, name: 'Tawa Paneer Roll', price: '$12.95', category: 'rolls', image: '🌯', hot: false, description: 'Juicy paneer cubes cooked on a tawa with spices and wrapped in a soft roti with fresh salad and sauces.' },
        { id: 68, name: 'Double Eggroll Roll', price: '$12.95', category: 'rolls', image: '🌯', hot: false, description: 'Double the eggs, double the taste! Two egg omelets layered inside a flaky paratha, rolled with crunchy onions.' },
        { id: 69, name: 'Pudina Chicken Roll', price: '$13.95', category: 'rolls', image: '🌯', hot: true, description: 'Juicy chicken pieces marinated in fresh mint and coriander chutney, grilled and rolled in a flaky paratha.' },
        { id: 70, name: 'Chicken Keema Roll', price: '$14.95', category: 'rolls', image: '🌯', hot: true, description: 'Spicy minced chicken (keema) cooked with aromatic spices and green peas, stuffed in a roll with crunchy onions.' },

        // C.P.D Special Thalis
        { id: 71, name: 'Kulcha Thali', price: '$15.95', category: 'thali', image: '🍱', hot: false, description: 'A delightful vegetarian platter featuring stuffed Amritsari Kulcha served with two delicious vegetable curries, rice, and sides.' },
        { id: 72, name: 'C.P.D Veg Thali', price: '$17.95', category: 'thali', image: '🍱', hot: true, description: 'The ultimate vegetarian feast! Indulge in a grand spread of FOUR different vegetable curries, served with fluffy pooris.' },
        { id: 73, name: 'C.P.D Non Veg Thali', price: '$22.95', category: 'thali', image: '🍱', hot: true, description: 'A wholesome non-veg thali featuring your choice of Chicken or Goat Curry, served with appetizers, bread, and rice.' },

        // Bachaa Party Special
        { id: 74, name: 'Baccha Maggi', price: '$8.95', category: 'snacks', image: '🍜', hot: false, description: 'A kids favorite! Classic Maggi noodles cooked with mild spices and optional vegetables. Comfort in a bowl.' },
        { id: 75, name: 'Fries', price: '$7.95', category: 'snacks', image: '🍟', hot: false, description: 'Crispy, golden-brown french fries seasoned lightly with salt. Perfect as a side or a snack.' },
        { id: 76, name: 'Bacha Combo', price: '$13.95', category: 'snacks', image: '🍔', hot: false, description: 'Chole Cheese Burger, Fries & Mango Lassi' },

        // Tandoori Daawat (Bread)
        { id: 77, name: 'Butter Naan', price: '$3.95', category: 'bread', image: '🥖', hot: false, description: 'Soft and fluffy Indian flatbread made from refined flour, baked in a tandoor and brushed generously with butter.' },
        { id: 78, name: 'Garlic Naan', price: '$4.95', category: 'bread', image: '🥖', hot: false, description: 'Flavorful naan bread topped with minced garlic and fresh coriander, baked in a tandoor until golden and crispy.' },
        { id: 79, name: 'Tandoori Roti', price: '$3.95', category: 'bread', image: '🫓', hot: false, description: 'Rustic and healthy flatbread made from whole wheat flour, baked in a tandoor with a smoky flavor.' },
        { id: 80, name: 'Roomali Roti', price: '$4.95', category: 'bread', image: '🫓', hot: false, description: 'An ultra-thin, soft flatbread that is folded like a handkerchief. Light, airy, and perfect for scooping up gravies.' },
        { id: 81, name: 'Chur Chur Naan', price: '$4.95', category: 'bread', image: '🥖', hot: false, description: 'A crispy, flaky, and layered naan that is crushed before serving to enhance its texture. Stuffed with spices.' },
        { id: 82, name: 'Lachaa Parantha', price: '$4.95', category: 'bread', image: '🫓', hot: false, description: 'A multi-layered whole wheat flatbread prepared in a tandoor. Each layer is brushed with ghee.' },
        { id: 83, name: 'Paneer Kulcha', price: '$5.95', category: 'bread', image: '🥖', hot: false, description: 'Soft leavened bread stuffed with a spiced mixture of crumbly paneer, herbs, and onions. Baked in a tandoor.' },
        { id: 84, name: 'Gobhi Kulcha', price: '$4.95', category: 'bread', image: '🥖', hot: false, description: 'Delicious kulcha stuffed with a spicy mixture of grated cauliflower and herbs. A crunchy and flavorful bread.' },
        { id: 85, name: 'Pyaaz Kulcha', price: '$4.95', category: 'bread', image: '🥖', hot: false, description: 'Flavorful kulcha stuffed with chopped onions and spices. The sweetness of the onions makes for a savory delight.' },
        { id: 86, name: 'Aloo Kulcha', price: '$4.95', category: 'bread', image: '🥖', hot: false, description: 'A classic Amritsari specialty! Kulcha stuffed with a spicy mashed potato filling. Crisp on the outside.' },
        { id: 87, name: 'Mirchi Naan', price: '$4.95', category: 'bread', image: '🥖', hot: true, description: 'Spicy naan topped with chopped green chilies and coriander for an extra kick of heat.' },
        { id: 88, name: 'Mithi Cheese Naan', price: '$5.95', category: 'bread', image: '🥖', hot: false, description: 'A unique sweet and savory naan stuffed with nuts, raisins, and a sweetened cheese mixture.' },

        // Old School Paranthas
        { id: 89, name: 'Aloo Parantha', price: '$11.95', category: 'parantha', image: '🫓', hot: false, description: 'Traditional whole wheat flatbread stuffed with a spicy mashed potato filling and cooked with ghee.' },
        { id: 90, name: 'Gobhi Parantha', price: '$11.95', category: 'parantha', image: '🫓', hot: false, description: 'Crispy whole wheat flatbread stuffed with a flavorful mixture of grated cauliflower and spices.' },
        { id: 91, name: 'Paneer Parantha', price: '$12.95', category: 'parantha', image: '🫓', hot: false, description: 'Hearty flatbread stuffed with spiced cottage cheese (paneer), herbs, and onions. A protein-rich bread.' },
        { id: 92, name: 'Mix Veg Parantha', price: '$12.95', category: 'parantha', image: '🫓', hot: false, description: 'Wholesome parantha stuffed with a medley of finely chopped seasonal vegetables and aromatic spices.' },
        { id: 93, name: 'Cheese Parantha', price: '$12.95', category: 'parantha', image: '🫓', hot: false, description: 'A treat for cheese lovers! Flaky parantha stuffed with a blend of melted cheese and mild spices.' },

        // Meethe Me (Sweets)
        { id: 94, name: 'Brown Rabdi', price: '$6.95', category: 'sweets', image: '🍮', hot: false, description: 'A rich and creamy traditional Indian dessert made by reducing milk until it thickens. Garnished with nuts.' },
        { id: 95, name: 'Gulab Jamun', price: '$5.95', category: 'sweets', image: '🍡', hot: false, description: 'Soft deep-fried dumplings made of milk solids and dipped in aromatic rose and saffron-flavored syrup.' },
        { id: 96, name: 'Rasmalai', price: '$6.95', category: 'sweets', image: '🍰', hot: false, description: 'Delicate cottage cheese dumplings soaked in sweetened, thickened milk flavored with saffron and cardamom.' },
        { id: 97, name: 'Malpua', price: '$6.95', category: 'sweets', image: '🥞', hot: false, description: 'Traditional Indian pancakes made from flour and milk, deep-fried in ghee and soaked in sugar syrup.' },
        { id: 98, name: 'Kulfi Falooda', price: '$6.95', category: 'sweets', image: '🍨', hot: false, description: 'A decadent layered dessert featuring dense kulfi ice cream, vermicelli noodles, sweet basil seeds, and rose syrup.' },
        { id: 99, name: 'Malai Kulfi', price: '$4.95', category: 'sweets', image: '🍦', hot: false, description: 'Creamy, dense Indian ice cream made with thickened milk and cardamom. Frozen on a stick.' },
        { id: 100, name: 'Moong Dal Halwa', price: '$6.95', category: 'sweets', image: '🍮', hot: false, description: 'A rich and warm dessert made from yellow lentils slow-cooked in ghee with sugar and nuts. A true indulgence.' },
        { id: 101, name: 'Rasgulla', price: '$4.95', category: 'sweets', image: '🍡', hot: false, description: 'Soft and spongy cottage cheese balls soaked in a clear, sweet sugar syrup. A classic Bengali dessert.' },

        // Kya Piyoge (Drinks)
        { id: 102, name: 'Aam Ki Lassi', price: '$4.95', category: 'drinks', image: '🥤', hot: false, description: 'The king of lassis! Creamy yogurt blended with sweet Alphonso mango pulp. A tropical delight.' },
        { id: 103, name: 'Masal Chanch', price: '$4.95', category: 'drinks', image: '🥤', hot: false, description: 'Light and refreshing spiced yogurt drink tempered with roasted cumin, black salt, and coriander.' },
        { id: 104, name: 'Meethi Lassi', price: '$4.95', category: 'drinks', image: '🥤', hot: false, description: 'Traditional sweet yogurt-based drink. Thick, creamy, and perfect to cool down after a spicy meal.' },
        { id: 105, name: 'Aam Ka Panna', price: '$4.95', category: 'drinks', image: '🥤', hot: false, description: 'A refreshing summer drink made from raw mangoes, fresh mint, and roasted cumin. Tangy and sweet.' },
        { id: 106, name: 'Jal Jeera Soda', price: '$4.95', category: 'drinks', image: '🥤', hot: false, description: 'A fizzy and tangy drink made with fresh lime juice, soda water, and a spicy cumin-based Jal Jeera masala.' },
        { id: 107, name: 'Gulab Falooda', price: '$5.95', category: 'drinks', image: '🥤', hot: false, description: 'A fragrant layered dessert drink featuring sweet rose syrup, vermicelli, basil seeds, and chilled milk.' },
        { id: 108, name: 'Mango Shake', price: '$6.95', category: 'drinks', image: '🥤', hot: false, description: 'Rich and creamy milkshake made with ripe mangoes and chilled milk. A seasonal favorite.' },
        { id: 109, name: 'Vanilla Shake', price: '$6.95', category: 'drinks', image: '🥤', hot: false, description: 'Classic smooth and creamy vanilla milkshake made with premium vanilla extract.' },
        { id: 110, name: 'Chocolate Shake', price: '$6.95', category: 'drinks', image: '🥤', hot: false, description: 'Indulgent and rich chocolate milkshake made with cocoa and chilled milk.' },
        { id: 111, name: 'Rose Shake', price: '$6.95', category: 'drinks', image: '🥤', hot: false, description: 'Fragrant and sweet pink milkshake flavored with rose syrup and garnished with nuts.' },
        { id: 112, name: 'Cold Coffee', price: '$6.95', category: 'drinks', image: '☕', hot: false, description: 'Chilled and creamy blended coffee. A perfect pick-me-up for any time of the day.' },
        { id: 113, name: 'Kesar Dry Fruit Milk', price: '$6.95', category: 'drinks', image: '🥛', hot: false, description: 'Nutritious milk flavored with saffron (kesar) and loaded with crushed almonds and pistachios.' },
        { id: 114, name: 'Adrak Ki Chai', price: '$3.00', category: 'drinks', image: '☕', hot: true, description: 'Authentic Indian tea brewed with fresh ginger and aromatic tea leaves. Warm and soothing.' },
        { id: 115, name: 'Coffee', price: '$3.00', category: 'drinks', image: '☕', hot: true, description: 'Hot and frothy Indian-style beaten coffee made with milk and sugar.' },
        { id: 116, name: 'Coke', price: '$2.50', category: 'drinks', image: '🥤', hot: false, description: 'Bubbly and refreshing Coca-Cola. A classic companion to any meal.' },
        { id: 117, name: 'Sprite', price: '$2.50', category: 'drinks', image: '🥤', hot: false, description: 'Crisp and clear lemon-lime soda for a refreshing burst of citrus.' },
        { id: 118, name: 'Limca', price: '$3.95', category: 'drinks', image: '🥤', hot: false, description: 'The iconic Indian lemon-lime drink with a sharp, tangy kick.' },
        { id: 119, name: 'Thums Up', price: '$3.95', category: 'drinks', image: '🥤', hot: false, description: 'The strong, fizzy Indian cola with a unique spicy kick. Taste the thunder!' },
        { id: 120, name: 'Fanta', price: '$2.50', category: 'drinks', image: '🥤', hot: false, description: 'Bright and bubbly orange soda with a sweet, fruity flavor.' },
        { id: 121, name: 'Water', price: '$2.00', category: 'drinks', image: '💧', hot: false, description: 'Purified and chilled bottled drinking water for perfect hydration.' },
        { id: 122, name: 'Masala Soda', price: '$4.95', category: 'drinks', image: '🥤', hot: false, description: 'Fizzy soda water mixed with a special blend of tangy and spicy Indian masalas.' },
    ];

    const isVeg = (item) => {
        if (item.veg !== undefined && item.veg !== null) {
            return item.veg === true || item.veg === 'true' || item.veg === 1 || item.veg === '1';
        }
        const nonVegKeywords = ['chicken', 'goat', 'lamb', 'fish', 'egg', 'keema', 'mutton', 'prawn', 'non veg', 'non-veg'];
        const lowerName = item.name.toLowerCase();
        const lowerDesc = item.description ? item.description.toLowerCase() : '';
        return !nonVegKeywords.some(keyword => lowerName.includes(keyword) || lowerDesc.includes(keyword));
    };

    const [searchQuery, setSearchQuery] = useState('');


    const handleCategoryClick = (catId) => {
        if (catId === 'all') {
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const headerOffset = 100;
                const elementPosition = menuSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
            return;
        }

        const section = document.getElementById(`category-${catId}`);
        if (section) {
            const headerOffset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const handleDietaryClick = (dietId) => {
        setDietaryFilter(dietId);
        // We don't scroll here as it's a global filter that changes the content density
    };



    const stats = [
        { icon: '👥', value: '5000+', label: 'Happy Customers' },
        { icon: '⭐', value: '99%', label: 'Quality Score' },
        { icon: '📅', value: '3+ Years', label: 'Of Excellence' },
        { icon: '🍽️', value: '120+', label: 'Menu Items' },
    ];

    const testimonials = [
        { name: 'Rahul S.', text: 'Best chaat in town! Tastes just like Delhi street food.', rating: 5 },
        { name: 'Priya M.', text: 'The thalis are amazing! Feels like home-cooked food.', rating: 5 },
        { name: 'Amit K.', text: 'Authentic flavors and great service. Highly recommended!', rating: 5 },
    ];

    return (
        <div className="app">
            {/* Header */}
            <Header />

            {/* Hero Slider */}
            <section id="home" className="hero-slider">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            background: slide.bg,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div className="hero-content">
                            <h1 className="hero-title">{slide.title}</h1>
                            <p className="hero-subtitle">{slide.subtitle}</p>
                            <div className="hero-buttons">
                                <a href="#menu" className="btn btn-primary">View Menu</a>
                                <a href="#contact" className="btn btn-secondary">Order Now</a>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="slider-dots">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </section>

            {/* Menu Section */}
            <section id="menu" className="section menu-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Our Delicious Menu</h2>
                        <p className="section-description">
                            Explore our wide variety of authentic Delhi street food and traditional dishes
                        </p>
                    </div>

                    {/* Dietary Filters */}
                    <div className="dietary-filters" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
                        <button 
                            className={`dietary-btn ${dietaryFilter === 'all' ? 'active' : ''}`}
                            onClick={() => handleDietaryClick('all')}
                        >All</button>
                        <button 
                            className={`dietary-btn ${dietaryFilter === 'veg' ? 'active' : ''}`}
                            onClick={() => handleDietaryClick('veg')}
                        >🟢 Veg</button>
                        <button 
                            className={`dietary-btn ${dietaryFilter === 'non-veg' ? 'active' : ''}`}
                            onClick={() => handleDietaryClick('non-veg')}
                        >🔺 Non-Veg</button>
                    </div>

                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search for dishes (e.g. Samosa, Biryani)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
                            )}
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="category-filters">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedCategory(cat.id);
                                    handleCategoryClick(cat.id);
                                }}
                            >
                                <span className="category-icon">{cat.icon}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Grouped Product Grid */}
                    <div className="menu-sections-wrapper">
                        {categories.filter(c => c.id !== 'all').map((cat) => {
                            const categoryItems = menuItems.filter(item => {
                                const matchesCategory = item.category === cat.id;
                                const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.description.toLowerCase().includes(searchQuery.toLowerCase());
                                
                                let matchesDietary = true;
                                if (dietaryFilter === 'veg') matchesDietary = isVeg(item);
                                else if (dietaryFilter === 'non-veg') matchesDietary = !isVeg(item);

                                return matchesCategory && matchesSearch && matchesDietary;
                            });

                            if (categoryItems.length === 0) return null;

                            return (
                                <div key={cat.id} id={`category-${cat.id}`} className="menu-category-block" style={{ marginBottom: '4rem' }}>
                                    <h3 className="category-section-title" style={{ 
                                        textAlign: 'center', 
                                        fontSize: '2.5rem', 
                                        color: 'var(--primary-maroon)', 
                                        marginBottom: '2rem',
                                        fontFamily: 'var(--font-heading)',
                                        position: 'relative',
                                        paddingBottom: '1rem'
                                    }}>
                                        {cat.name}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '60px',
                                            height: '3px',
                                            background: 'var(--accent-gold)'
                                        }}></div>
                                    </h3>
                                    
                                    <div className="product-grid">
                                        {categoryItems.map((item) => (
                                            <div key={item.id} className="product-card">
                                                {item.hot && <span className="badge-hot">Hot</span>}
                                                <div className={`diet-symbol ${isVeg(item) ? "veg" : "non-veg"}`} style={{ 
                                                    position: 'absolute', top: '10px', left: '10px', zIndex: 5,
                                                    width: '16px', height: '16px', border: '1px solid',
                                                    borderColor: isVeg(item) ? '#2ecc71' : '#e74c3c',
                                                    background: 'white', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isVeg(item) ? '#2ecc71' : '#e74c3c' }}></div>
                                                </div>
                                                <div className="product-image">
                                                    {item.image && typeof item.image === 'string' && (item.image.startsWith('/') || item.image.startsWith('http') || item.image.startsWith('data:')) ? (
                                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <span className="product-emoji">{item.image || '🥘'}</span>
                                                    )}
                                                </div>
                                                <div className="product-info">
                                                    <h3 className="product-name">{item.name}</h3>
                                                    <p className="product-description">{item.description}</p>
                                                    <div className="product-footer">
                                                        <span className="product-price">{item.price}</span>
                                                        <div className="product-actions">
                                                            <Link to={`/product/${item.id}`} className="btn-view">View</Link>
                                                            <button className="btn-add" onClick={() => handleAddToCart(item)}>Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section about-section">
                <div className="container">
                    <div className="section-title">
                        <h2>About Chatpati Delhi</h2>
                    </div>

                    <div className="about-cards">
                        <div className="about-card">
                        <h3>Our Story</h3>
                        <p>
                            Chatpati Delhi was born from a simple idea bringing the true taste of Delhi street food to your table.
                            We started with a passion for authentic flavors and the desire to keep our cultural roots alive through
                            food made the right way.
                        </p>
                        <p>
                            At Chatpati Delhi, we celebrate the taste of our heritage and deliver it fresh to your table,
                            just the way it was meant to be.
                        </p>
                        </div>
                        <div className="about-card">
                            <h3>Our Mission</h3>
                            <p>
                                We are committed to providing the freshest, highest-quality dishes while preserving traditional
                                recipes and authentic flavors that have been passed down through generations.
                            </p>
                            <p>
                                Transparency, quality, and long-term relationships lie at the heart of everything we do.
                                Your satisfaction and taste buds always come first.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section values-section">
                <div className="container">
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">🎯</div>
                            <h3>Quality First</h3>
                            <p>We never compromise on quality. Every dish is carefully prepared and inspected.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">❤️</div>
                            <h3>Customer Care</h3>
                            <p>Your satisfaction is our priority. We serve you with dedication and honesty.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🌱</div>
                            <h3>Sustainability</h3>
                            <p>We support eco-friendly practices and use fresh, quality ingredients.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="section-title">
                        <h2>What Our Customers Say</h2>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((review, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="stars">{'⭐'.repeat(review.rating)}</div>
                                <p className="testimonial-text">"{review.text}"</p>
                                <p className="testimonial-author">— {review.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="section contact-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Get in Touch</h2>
                    </div>
                    <div className="contact-wrapper">
                        <div className="contact-info">
                            <div className="contact-item">
                                <div className="contact-icon">📧</div>
                                <div>
                                    <h4>Email</h4>
                                    <p>info@chatpatidelhi.com</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">📞</div>
                                <div>
                                    <h4>Phone</h4>
                                    <p>+1 (732) 499-9387</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">📍</div>
                                <div>
                                    <h4>Address</h4>
                                    <p>3201 NJ-27, Franklin Park, NJ 08823</p>
                                </div>
                            </div>
                        </div>
                        <form className="contact-form">
                            <input type="text" placeholder="Your Name" className="form-input" />
                            <input type="email" placeholder="Your Email" className="form-input" />
                            <input type="tel" placeholder="Phone Number" className="form-input" />
                            <textarea placeholder="Your Message" className="form-textarea" rows="5"></textarea>
                            <button type="submit" className="btn btn-primary btn-full">Send Message ➤</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            {cartToast && <div className="cart-toast">✅ Added to cart</div>}
            <Footer />
        </div>
    )
}

export default Home
