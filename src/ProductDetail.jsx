import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addToCart } from './utils/cart';
import './index.css';
import './enhanced-styles.css';

// Rich data with detailed descriptions for specific items
const richProductData = [
    {
        id: 1,
        fullDescription: 'Experience the authentic taste of Delhi with our handcrafted Bhara Samosas. Each samosa features a perfectly crispy, golden-brown exterior made from refined flour, encasing a flavorful filling of seasoned potatoes, green peas, and aromatic Indian spices.',
        ingredients: ['Refined Flour (Maida)', 'Potatoes', 'Green Peas', 'Cumin Seeds', 'Coriander Powder', 'Garam Masala', 'Green Chilies', 'Ginger', 'Vegetable Oil'],
        features: ['✓ Freshly made daily', '✓ Crispy & flaky texture', '✓ Authentic Delhi recipe', '✓ Served with mint & tamarind chutney', '✓ Perfect tea-time snack'],
        prepTime: '15 mins',
        rating: 4.8,
        reviews: 142,
        vegetarian: true
    },
    {
        id: 2,
        fullDescription: 'Indulge in our crispy Khasta Kachoris, a beloved Delhi street food delicacy. These perfectly round, puffed pastries are filled with a savory mixture of spiced lentils and aromatic spices, creating an explosion of flavors in every bite.',
        ingredients: ['Refined Flour', 'Moong Dal (Yellow Lentils)', 'Fennel Seeds', 'Black Pepper', 'Asafoetida (Hing)', 'Red Chili Powder', 'Turmeric', 'Coriander Powder', 'Ghee'],
        features: ['✓ Extra crispy & flaky', '✓ Traditional Delhi recipe', '✓ Protein-rich lentil filling', '✓ Best with aloo sabzi', '✓ No artificial preservatives'],
        prepTime: '20 mins',
        rating: 4.6,
        reviews: 98,
        vegetarian: true
    },
    {
        id: 3,
        fullDescription: 'A royal treat from Jaipur brought to Delhi! Our Pyaaz Kachoris feature a crispy, flaky crust filled with caramelized onions seasoned with traditional Rajasthani spices. Each bite offers a perfect balance of sweet and savory flavors.',
        ingredients: ['All-Purpose Flour', 'Onions', 'Fennel Seeds', 'Nigella Seeds (Kalonji)', 'Red Chili Powder', 'Turmeric', 'Coriander Powder', 'Ghee'],
        features: ['✓ Jaipur authentic recipe', '✓ Sweet & savory flavor', '✓ Caramelized onions', '✓ Aromatic spice blend', '✓ Pairs well with sweet chutney'],
        prepTime: '25 mins',
        rating: 4.7,
        reviews: 87,
        vegetarian: true
    },
    {
        id: 4,
        fullDescription: 'Transport yourself to the streets of Old Delhi with our authentic Dahi Bhalle. Soft, melt-in-mouth lentil fritters soaked in creamy, sweetened yogurt and topped with tangy tamarind chutney, mint sauce, and aromatic spices.',
        ingredients: ['Urad Dal (Black Gram)', 'Fresh Yogurt', 'Tamarind', 'Green Chutney', 'Cumin Powder', 'Red Chili Powder', 'Black Salt', 'Sugar', 'Fresh Coriander'],
        features: ['✓ Famous Chandni Chowk style', '✓ Soft & fluffy bhallas', '✓ Homemade yogurt', '✓ Perfect balance of sweet & tangy', '✓ Cooling & refreshing'],
        prepTime: '10 mins',
        rating: 4.9,
        reviews: 203,
        vegetarian: true
    },
    {
        id: 5,
        fullDescription: 'A light and crunchy street food favorite! Our Churmuri Bhel combines puffed rice with fresh vegetables, roasted peanuts, and a medley of tangy and spicy chutneys, creating a perfect harmony of textures and flavors.',
        ingredients: ['Puffed Rice', 'Onions', 'Tomatoes', 'Cucumber', 'Roasted Peanuts', 'Sev', 'Tamarind Chutney', 'Green Chutney', 'Lemon Juice', 'Chaat Masala'],
        features: ['✓ Low-calorie snack', '✓ Fresh vegetables', '✓ Crunchy texture', '✓ Tangy & spicy', '✓ Instant energy booster'],
        prepTime: '5 mins',
        rating: 4.5,
        reviews: 76,
        vegetarian: true
    },
    {
        id: 6,
        fullDescription: 'The most iconic Delhi street food! Our Golgappe (Pani Puri) feature ultra-crispy semolina shells filled with spiced mashed potatoes and chickpeas, then dunked in tangy-spicy tamarind water. An explosion of flavors in every bite!',
        ingredients: ['Semolina (Suji)', 'Potatoes', 'Chickpeas', 'Tamarind', 'Black Salt', 'Cumin Powder', 'Mint Leaves', 'Green Chilies', 'Coriander', 'Chaat Masala'],
        features: ['✓ Freshly made crispy puris', '✓ Two flavored waters (sweet & spicy)', '✓ Authentic Delhi taste', '✓ Made-to-order freshness', '✓ Most popular street food'],
        prepTime: '8 mins',
        rating: 4.9,
        reviews: 312,
        vegetarian: true
    },
    {
        id: 7,
        fullDescription: 'A delightful combination platter! Enjoy both Sev Puri (crispy puris topped with potatoes, onions, chutneys, and sev) and Dahi Puri (puris filled with yogurt, tamarind chutney, and spices) in one serving.',
        ingredients: ['Wheat Flour Puris', 'Potatoes', 'Yogurt', 'Onions', 'Tomatoes', 'Sev (Crispy Chickpea Noodles)', 'Tamarind Chutney', 'Mint Chutney', 'Pomegranate'],
        features: ['✓ Best of both worlds', '✓ Sweet, tangy & spicy', '✓ Crunchy & creamy textures', '✓ Fresh toppings', '✓ Mumbai-Delhi fusion'],
        prepTime: '10 mins',
        rating: 4.7,
        reviews: 156,
        vegetarian: true
    },
    {
        id: 8,
        fullDescription: 'A classic Delhi chaat! Crispy wheat crackers (papri) topped with boiled potatoes, chickpeas, yogurt, and a symphony of sweet and spicy chutneys, garnished with fresh coriander and sev.',
        ingredients: ['Wheat Crackers (Papri)', 'Potatoes', 'Chickpeas', 'Yogurt', 'Tamarind Chutney', 'Green Chutney', 'Sev', 'Chaat Masala', 'Red Chili Powder', 'Coriander'],
        features: ['✓ Multi-layered flavors', '✓ Sweet & tangy taste', '✓ Crunchy & soft textures', '✓ Protein from chickpeas', '✓ Street food favorite'],
        prepTime: '8 mins',
        rating: 4.6,
        reviews: 134,
        vegetarian: true
    },
    {
        id: 9,
        fullDescription: 'Crispy-on-the-outside, soft-on-the-inside potato tikkis topped with cool yogurt, tangy tamarind chutney, spicy green chutney, and garnished with pomegranate seeds and fresh coriander.',
        ingredients: ['Potatoes', 'Bread Crumbs', 'Corn Flour', 'Yogurt', 'Tamarind Chutney', 'Mint Chutney', 'Chaat Masala', 'Pomegranate Seeds', 'Coriander'],
        features: ['✓ Crispy shallow-fried tikki', '✓ Cool & refreshing yogurt', '✓ Balance of temperatures', '✓ Healthy potato base', '✓ Perfect evening snack'],
        prepTime: '12 mins',
        rating: 4.8,
        reviews: 189,
        vegetarian: true
    },
    {
        id: 10,
        fullDescription: 'The king of all kachoris! A large, crispy kachori bowl filled with moong dal, potatoes, chickpeas, yogurt, and topped with an array of chutneys, sev, and spices. A complete meal in itself!',
        ingredients: ['Refined Flour', 'Moong Dal', 'Potatoes', 'Chickpeas', 'Yogurt', 'Tamarind Chutney', 'Green Chutney', 'Sev', 'Pomegranate', 'Spices'],
        features: ['✓ Extra large serving', '✓ Complete meal', '✓ 5 flavor profiles', '✓ Instagram-worthy presentation', '✓ Most filling chaat'],
        prepTime: '15 mins',
        rating: 4.9,
        reviews: 267,
        vegetarian: true
    },
    {
        id: 11,
        fullDescription: 'A hearty combination of crispy potato tikkis served with spicy chickpea curry, topped with yogurt, chutneys, onions, and a sprinkle of aromatic spices.',
        ingredients: ['Potatoes', 'Chickpeas', 'Onions', 'Tomatoes', 'Yogurt', 'Garam Masala', 'Coriander Powder', 'Tamarind Chutney', 'Green Chutney', 'Chaat Masala'],
        features: ['✓ High protein content', '✓ Filling & satisfying', '✓ Spicy chickpea curry', '✓ Crispy tikki base', '✓ Complete nutrition'],
        prepTime: '18 mins',
        rating: 4.7,
        reviews: 145,
        vegetarian: true
    },
    {
        id: 12,
        fullDescription: 'The ultimate comfort food! Crispy samosas broken and topped with spicy chickpea curry, yogurt, tamarind and mint chutneys, creating a delicious medley of textures and flavors.',
        ingredients: ['Samosas', 'Chickpeas', 'Yogurt', 'Tamarind Chutney', 'Green Chutney', 'Onions', 'Sev', 'Chaat Masala', 'Coriander', 'Pomegranate'],
        features: ['✓ Two favorites in one', '✓ Extra spicy option', '✓ Generous portion', '✓ Perfect for sharing', '✓ Ultimate comfort food'],
        prepTime: '12 mins',
        rating: 4.8,
        reviews: 198,
        vegetarian: true
    },
    {
        id: 13,
        fullDescription: 'Crispy vegetable fritters made with fresh seasonal vegetables dipped in spiced chickpea flour batter and deep-fried to golden perfection. Perfect with chai!',
        ingredients: ['Chickpea Flour (Besan)', 'Potatoes', 'Onions', 'Spinach', 'Cauliflower', 'Green Chilies', 'Ginger', 'Carom Seeds (Ajwain)', 'Turmeric', 'Red Chili Powder'],
        features: ['✓ Assorted vegetables', '✓ Crispy & golden', '✓ Perfect rainy day snack', '✓ Best with tea/coffee', '✓ Served hot & fresh'],
        prepTime: '15 mins',
        rating: 4.5,
        reviews: 112,
        vegetarian: true
    },
    {
        id: 14,
        fullDescription: 'Premium cottage cheese slices sandwiched with spicy mint chutney, coated in seasoned chickpea batter, and deep-fried until crispy. An elevated version of traditional pakoras!',
        ingredients: ['Fresh Paneer', 'Chickpea Flour', 'Mint Chutney', 'Coriander Chutney', 'Green Chilies', 'Ginger-Garlic Paste', 'Carom Seeds', 'Red Chili Powder', 'Salt'],
        features: ['✓ Premium paneer quality', '✓ Mint chutney stuffing', '✓ Extra protein', '✓ Crispy coating', '✓ Restaurant-style'],
        prepTime: '20 mins',
        rating: 4.7,
        reviews: 167,
        vegetarian: true
    },
    {
        id: 16,
        fullDescription: 'Our signature curly fries are seasoned with a special blend of chatpati spices! Crispy on the outside, fluffy on the inside, and spiraled for maximum fun. Served with a side of creamy dip.',
        ingredients: ['Potatoes', 'Corn Starch', 'Rice Flour', 'Paprika', 'Garlic Powder', 'Onion Powder', 'Black Pepper', 'Salt', 'Vegetable Oil'],
        features: ['✓ Fun spiral shape', '✓ Extra crispy coating', '✓ Chatpati spice blend', '✓ Kids favorite', '✓ Perfect side dish'],
        prepTime: '12 mins',
        rating: 4.6,
        reviews: 210,
        vegetarian: true
    },
    {
        id: 17,
        fullDescription: 'The quintessential Mumbai street snack! Flat crispy puris loaded with diced potatoes, onions, and three types of chutneys (tamarind, chili, garlic), topped strictly with mountains of nylon sev.',
        ingredients: ['Flat Puris (Papdi)', 'Boiled Potatoes', 'Onions', 'Nylon Sev', 'Tamarind Chutney', 'Garlic Chutney', 'Green Chili Chutney', 'Raw Mango (Seasonal)', 'Coriander'],
        features: ['✓ Authentic Mumbai recipe', '✓ Heavy on Sev', '✓ Triple chutney flavor', '✓ Crunchy & spicy', '✓ Freshly assembled'],
        prepTime: '8 mins',
        rating: 4.8,
        reviews: 320,
        vegetarian: true
    },
    {
        id: 18,
        fullDescription: 'An edible art piece! A crispy, basket-shaped katori made from grated potatoes, filled with sprouts, pomegranate, yogurt, chutneys, and spices. Looks amazing, tastes even better.',
        ingredients: ['Grated Potatoes', 'Bean Sprouts', 'Chickpeas', 'Yogurt', 'Tamarind Chutney', 'Mint Chutney', 'Pomegranate Arils', 'Sev', 'Chaat Masala'],
        features: ['✓ Unique basket presentation', '✓ Crunchy potato nest', '✓ Fresh & healthy fillings', '✓ Perfect appetizer', '✓ Instagram favorite'],
        prepTime: '15 mins',
        rating: 4.9,
        reviews: 289,
        vegetarian: true
    },
    {
        id: 20,
        fullDescription: 'A popular fasting snack from Maharashtra! Crispy deep-fried fritters made from soaked tapioca pearls (sabudana), mashed potatoes, and crushed peanuts. Served with sweetened curd or green chutney.',
        ingredients: ['Sabudana (Tapioca Pearls)', 'Potatoes', 'Roasted Peanuts', 'Green Chilies', 'Cumin Seeds', 'Coriander Leaves', 'Lemon Juice', 'Sugar', 'Salt'],
        features: ['✓ Traditional fasting food', '✓ Crispy outside, soft inside', '✓ Peanut crunch', '✓ Gluten-free option', '✓ Served with chutney'],
        prepTime: '12 mins',
        rating: 4.7,
        reviews: 156,
        vegetarian: true
    },
    {
        id: 21,
        fullDescription: 'A classic Indian street burger! A crispy samosa tucked inside a soft bun, slathered with spicy green chutney and sweet tamarind chutney. A perfect on-the-go snack.',
        ingredients: ['Bun', 'Samosa', 'Green Chutney', 'Tamarind Chutney', 'Butter', 'Red Chili Powder'],
        features: ['✓ Portable snack', '✓ Iconic fusion', '✓ Sweet & spicy', '✓ Freshly baked bun', '✓ Filling snack'],
        prepTime: '5 mins',
        rating: 4.5,
        reviews: 89,
        vegetarian: true
    },
    {
        id: 22,
        fullDescription: 'Famous from Karjat station! A spicy, deep-fried potato dumpling (vada) served in a pav (bread roll) with a generous amount of garlic chutney and fried green chili. The true taste of Maharashtra.',
        ingredients: ['Pav', 'Potatoes', 'Chickpea Flour (Besan)', 'Garlic Chutney', 'Green Chilies', 'Mustard Seeds', 'Curry Leaves', 'Turmeric'],
        features: ['✓ Authentic Karjat style', '✓ Spicy garlic chutney', '✓ Freshly fried vada', '✓ Mumbai staple', '✓ High energy food'],
        prepTime: '8 mins',
        rating: 4.8,
        reviews: 210,
        vegetarian: true
    },
    {
        id: 23,
        fullDescription: 'A cheesy twist on the classic Vada Pav! Our spicy potato vada is topped with a slice of cheese and melted butter, served in a soft pav with chutneys. A favorite among cheese lovers.',
        ingredients: ['Pav', 'Potato Vada', 'Cheese Slice', 'Butter', 'Garlic Chutney', 'Green Chutney', 'Fried Green Chili'],
        features: ['✓ Cheesy goodness', '✓ Fusion street food', '✓ Melted butter', '✓ Spicy & creamy', '✓ Kids favorite'],
        prepTime: '8 mins',
        rating: 4.7,
        reviews: 156,
        vegetarian: true
    },
    {
        id: 24,
        fullDescription: 'A sweet, spicy, and tangy potato burger from Kutch (Gujarat). A soft bun filled with a special dabeli masala potato mix, topped with pomegranate, roasted peanuts, and fine sev.',
        ingredients: ['Bun', 'Boiled Potatoes', 'Dabeli Masala', 'Tamarind Chutney', 'Pomegranate', 'Roasted Peanuts', 'Nylon Sev', 'Butter'],
        features: ['✓ Unique masala blend', '✓ Sweet & spicy', '✓ Crunchy peanuts', '✓ Authentic Kutchi taste', '✓ Soft buttery bun'],
        prepTime: '10 mins',
        rating: 4.6,
        reviews: 134,
        vegetarian: true
    },
    {
        id: 25,
        fullDescription: 'Spicy, buttery, and absolutely delicious! A thick vegetable curry (bhaji) cooked with a special blend of spices, served with butter-toasted pavs, chopped onions, and lemon wedges.',
        ingredients: ['Potatoes', 'Cauliflower', 'Peas', 'Carrots', 'Pav Bhaji Masala', 'Butter', 'Pav', 'Onions', 'Lemon', 'Coriander'],
        features: ['✓ Mixed vegetable goodness', '✓ Rich buttery taste', '✓ Spicy masala', '✓ Complete meal', '✓ Mumbai classic'],
        prepTime: '15 mins',
        rating: 4.9,
        reviews: 345,
        vegetarian: true
    },
    {
        id: 26,
        fullDescription: 'Our famous Pav Bhaji loaded with generous amounts of Amul cheese! The cheese melts into the hot, spicy bhaji, creating a creamy and rich flavor profile that is hard to resist.',
        ingredients: ['Pav', 'Mixed Vegetable Bhaji', 'Amul Cheese', 'Butter', 'Onions', 'Lemon', 'Coriander'],
        features: ['✓ Loaded with Amul Cheese', '✓ Extra creamy', '✓ Rich flavor', '✓ Kids favorite', '✓ Spicy & cheesy'],
        prepTime: '15 mins',
        rating: 4.9,
        reviews: 278,
        vegetarian: true
    },
    {
        id: 27,
        fullDescription: 'A spicy and savory delight for non-veg lovers! Minced chicken cooked with aromatic spices, onions, and tomatoes, served with buttered pav. A hearty and satisfying meal.',
        ingredients: ['Minced Chicken (Keema)', 'Onions', 'Tomatoes', 'Ginger-Garlic Paste', 'Garam Masala', 'Pav', 'Butter', 'Coriander', 'Green Chilies'],
        features: ['✓ Spicy chicken keema', '✓ Protein rich', '✓ Authentic spices', '✓ Soft buttered pav', '✓ Filling meal'],
        prepTime: '18 mins',
        rating: 4.8,
        reviews: 198,
        vegetarian: false
    },
    {
        id: 28,
        fullDescription: 'A vegetarian take on the classic meat dish! Soya granules or minced vegetables cooked in a spicy, flavorful gravy, served with soft pavs. You won\'t believe it\'s not meat!',
        ingredients: ['Soya Granules/Minced Veggies', 'Onions', 'Tomatoes', 'Keema Masala', 'Pav', 'Butter', 'Peas', 'Coriander'],
        features: ['✓ 100% Vegetarian', '✓ High protein soya', '✓ Meat-like texture', '✓ Spicy gravy', '✓ Healthy alternative'],
        prepTime: '15 mins',
        rating: 4.6,
        reviews: 145,
        vegetarian: true
    },
    {
        id: 29,
        fullDescription: 'A fiery Maharashtrian curry made from moth beans (matki), topped with farsan (crispy mix), chopped onions, and coriander. Served with pav and a slice of lemon for an extra kick.',
        ingredients: ['Moth Beans (Matki)', 'Farsan/Sev', 'Onions', 'Tomatoes', 'Missal Masala', 'Pav', 'Lemon', 'Coriander', 'Oil', 'Mustard Seeds'],
        features: ['✓ Authentic Kolhapuri spice', '✓ High protein beans', '✓ Crunchy topping', '✓ Spicy curry', '✓ Traditional breakfast'],
        prepTime: '15 mins',
        rating: 4.7,
        reviews: 234,
        vegetarian: true
    },
    {
        id: 30,
        fullDescription: 'A desi-style burger that hits all the right spots! A crispy vegetable patty made from potatoes, peas, and carrots, topped with a slice of cheese, fresh lettuce, tomatoes, and our special burger sauce.',
        ingredients: ['Burger Bun', 'Potato & Veg Patty', 'Cheese Slice', 'Lettuce', 'Tomato', 'Onion', 'Mayonnaise', 'Ketchup', 'Burger Sauce'],
        features: ['✓ Homemade veg patty', '✓ Cheesy delight', '✓ Fresh veggies', '✓ Special sauce', '✓ Kids favorite'],
        prepTime: '12 mins',
        rating: 4.5,
        reviews: 112,
        vegetarian: true
    },
    {
        id: 31,
        fullDescription: 'A traditional North Indian breakfast! Spicy potato curry (aloo subji) served with crispy, flaky khasta kachoris. The combination of the spicy curry and the crunchy kachori is heavenly.',
        ingredients: ['Khasta Kachori', 'Potatoes', 'Tomatoes', 'Green Chilies', 'Ginger', 'Cumin Seeds', 'Asafoetida', 'Turmeric', 'Coriander'],
        features: ['✓ Classic breakfast combo', '✓ Spicy potato curry', '✓ Flaky kachori', '✓ Authentic taste', '✓ Filling meal'],
        prepTime: '10 mins',
        rating: 4.7,
        reviews: 145,
        vegetarian: true
    },
    {
        id: 32,
        fullDescription: 'The ultimate Punjabi feast! Large, fluffy fried bread (bhature) served with spicy, tangy chickpea curry (chole), pickled onions, and green chilies. A meal that signifies celebration.',
        ingredients: ['Refined Flour (Maida)', 'Chickpeas (Kabuli Chana)', 'Onions', 'Tomatoes', 'Ginger-Garlic Paste', 'Chole Masala', 'Tea Leaves (for color)', 'Yogurt'],
        features: ['✓ Authentic Punjabi recipe', '✓ Large fluffy bhature', '✓ Spicy & tangy chole', '✓ Served with pickle', '✓ Heavy & satisfying'],
        prepTime: '20 mins',
        rating: 4.9,
        reviews: 356,
        vegetarian: true
    },
    {
        id: 33,
        fullDescription: 'A popular street food from Agra and Mathura! Crispy, coarse wheat flour puris stuffed with spiced lentil paste, served with a spicy potato curry. A rustic and flavorful meal.',
        ingredients: ['Wheat Flour', 'Urad Dal Paste', 'Potatoes', 'Tomatoes', 'Fennel Seeds', 'Coriander Powder', 'Red Chili Powder', 'Amchur (Dry Mango Powder)'],
        features: ['✓ Rustic flavors', '✓ Stuffed puris', '✓ Spicy aloo sabzi', '✓ Mathura style', '✓ Crispy texture'],
        prepTime: '15 mins',
        rating: 4.6,
        reviews: 123,
        vegetarian: true
    },
    {
        id: 34,
        fullDescription: 'A delicious vegetarian wrap! Spiced soya granules or minced vegetables cooked to perfection and wrapped in a soft, thin roomali roti with onions and mint sauce.',
        ingredients: ['Roomali Roti', 'Soya Granules/Minced Veggies', 'Onions', 'Mint Chutney', 'Chaat Masala', 'Lemon Juice'],
        features: ['✓ Thin & soft roti', '✓ Healthy filling', '✓ Perfect for lunch', '✓ Easy to eat', '✓ Vegetarian delight'],
        prepTime: '12 mins',
        rating: 4.5,
        reviews: 98,
        vegetarian: true
    },
    {
        id: 35,
        fullDescription: 'A winter classic from Punjab! Nutritious mustard greens (sarson ka saag) cooked with spices and served with rustic cornflour flatbread (makki ki roti) and a dollop of white butter.',
        ingredients: ['Mustard Greens (Sarson)', 'Spinach', 'Corn Flour (Makka)', 'Ginger', 'Garlic', 'Green Chilies', 'Ghee/Butter', 'Jaggery'],
        features: ['✓ Winter special', '✓ Highly nutritious', '✓ Authentic Punjabi taste', '✓ Gluten-free bread', '✓ Rich in iron'],
        prepTime: '25 mins',
        rating: 4.8,
        reviews: 210,
        vegetarian: true
    },
    {
        id: 36,
        fullDescription: 'A non-veg lover’s dream! Spicy minced chicken (keema) wrapped in a delicate, handkerchief-thin roomali roti with crunchy onions and tangy chutney.',
        ingredients: ['Roomali Roti', 'Minced Chicken', 'Onions', 'Ginger-Garlic Paste', 'Green Chilies', 'Garam Masala', 'Mint Chutney', 'Egg (optional coating)'],
        features: ['✓ Soft roomali roti', '✓ Spicy chicken filling', '✓ Juicy & flavorful', '✓ Perfect roll', '✓ High protein'],
        prepTime: '15 mins',
        rating: 4.7,
        reviews: 167,
        vegetarian: false
    },
    {
        id: 37,
        fullDescription: 'Our signature Tandoori Chicken! Marinated in yoghurt and spices for 24 hours, tied with a string (sutli) to hold its juices, and slow-cooked in a clay oven (tandoor). Juicy, smoky, and absolutely delicious.',
        ingredients: ['Whole Chicken', 'Yoghurt', 'Ginger-Garlic Paste', 'Lemon Juice', 'Kashmiri Red Chili', 'Garam Masala', 'Mustard Oil', 'Kasuri Methi'],
        features: ['✓ Signature dish', '✓ Slow-cooked in Tandoor', '✓ Smoky flavor', '✓ Juicy & tender', '✓ Authentic marinade'],
        prepTime: '25 mins',
        rating: 4.9,
        reviews: 412,
        vegetarian: false
    },
    {
        id: 38,
        fullDescription: 'Succulent chicken pieces marinated in a spicy mix of roasted spices and yoghurt, then grilled to perfection. The \'Barrah\' style preparation gives it a robust and smoky flavor.',
        ingredients: ['Chicken Pieces', 'Hung Curd', 'Barrah Masala', 'Black Pepper', 'Clove', 'Cardamom', 'Lemon', 'Ghee'],
        features: ['✓ Spicy & robust', '✓ Smoky aroma', '✓ Tender meat', '✓ Perfect appetizer', '✓ Best with mint chutney'],
        prepTime: '20 mins',
        rating: 4.7,
        reviews: 231,
        vegetarian: false
    },
    {
        id: 39,
        fullDescription: 'A milder, creamy version of the classic chicken tikka. Boneless chicken chunks marinated in cream (malai), cheese, cashew paste, and mild spices. Delicately grilled to melt in your mouth.',
        ingredients: ['Boneless Chicken', 'Fresh Cream', 'Cheese', 'Cashew Paste', 'White Pepper', 'Cardamom Powder', 'Ghee'],
        features: ['✓ Creamy & mild', '✓ Melt-in-mouth texture', '✓ Kid-friendly', '✓ Rich cashew marinade', '✓ Cheesy flavor'],
        prepTime: '20 mins',
        rating: 4.8,
        reviews: 345,
        vegetarian: false
    },
    {
        id: 40,
        fullDescription: 'For those who like it hot and tangy! Boneless chicken marinated in a special \'Chatpati\' spice blend including raw mango powder, chili, and lemon. Grilled to a charred perfection.',
        ingredients: ['Boneless Chicken', 'Chatpati Masala', 'Amchur (Dry Mango)', 'Red Chili Paste', 'Lemon Juice', 'Yoghurt', 'Ginger-Garlic'],
        features: ['✓ Spicy & tangy', '✓ Chatpati flavors', '✓ Char-grilled', '✓ Zesty kick', '✓ Perfect with drinks'],
        prepTime: '20 mins',
        rating: 4.7,
        reviews: 189,
        vegetarian: false
    },
    {
        id: 41,
        fullDescription: 'A delightful sizzler platter featuring crispy vegetable cutlets served on a bed of rice or noodles, with stir-fried vegetables and savory sauce. Served sizzling hot!',
        ingredients: ['Veg Cutlets', 'Rice/Noodles', 'Mixed Vegetables (Carrot, Beans, Capsicum)', 'Sizzler Sauce', 'French Fries', 'Butter'],
        features: ['✓ Served sizzling hot', '✓ Complete meal', '✓ Crispy cutlets', '✓ Fresh veggies', '✓ Dramatic presentation'],
        prepTime: '25 mins',
        rating: 4.6,
        reviews: 156,
        vegetarian: true
    },
    {
        id: 42,
        fullDescription: 'Paneer like never before! Large cubes of paneer marinated in \'Bhatti\' spices and grilled, served sizzling with onions, capsicum, and a spicy gravy.',
        ingredients: ['Paneer (Cottage Cheese)', 'Bhatti Masala', 'Onions', 'Capsicum', 'Sizzler Gravy', 'Butter', 'Lemon'],
        features: ['✓ Smoky grilled paneer', '✓ Spicy Bhatti masala', '✓ Sizzling platter', '✓ High protein veg', '✓ Exotic flavors'],
        prepTime: '25 mins',
        rating: 4.8,
        reviews: 267,
        vegetarian: true
    },
    {
        id: 43,
        fullDescription: 'Delicious Soya Chaap marinated in tandoori spices, grilled and served sizzling with grilled onions and mint sauce. A vegetarian delight with a meaty texture.',
        ingredients: ['Soya Chaap', 'Tandoori Masala', 'Yoghurt', 'Butter', 'Onions', 'Capsicum', 'Lemon', 'Sizzler Sauce'],
        features: ['✓ Meat substitute', '✓ High protein', '✓ Tandoori flavor', '✓ Juicy & chewy', '✓ Sizzling hot'],
        prepTime: '20 mins',
        rating: 4.7,
        reviews: 198,
        vegetarian: true
    },
    {
        id: 44,
        fullDescription: 'The ultimate platter for chicken lovers! An assortment of Malai Tikka, Haryali Tikka, and Classic Chicken Tikka served on a sizzling plate with dip and salad.',
        ingredients: ['Chicken Malai Tikka', 'Chicken Haryali Tikka', 'Chicken Tikka', 'Mint Chutney', 'Salad', 'Butter'],
        features: ['✓ Assorted tikkas', '✓ 3 flavors in 1', '✓ Shareable platter', '✓ Best seller', '✓ Sizzling presentation'],
        prepTime: '30 mins',
        rating: 4.9,
        reviews: 450,
        vegetarian: false
    },
    {
        id: 45,
        fullDescription: 'Premium lamb chops marinated in a secret spice blend and grilled to juicy perfection. Served sizzling with grilled vegetables and a mint-yogurt dip. A royal feast!',
        ingredients: ['Lamb Chops', 'Secret Spice Blend', 'Yoghurt', 'Raw Papaya (tenderizer)', 'Ginger-Garlic', 'Ghee', 'Grilled Veggies'],
        features: ['✓ Premium lamb cuts', '✓ Juicy & tender', '✓ Royal delicacy', '✓ Exquisite flavors', '✓ Special occasion dish'],
        prepTime: '35 mins',
        rating: 4.9,
        reviews: 180,
        vegetarian: false
    },
    {
        id: 46,
        fullDescription: 'Crispy, golden-fried fish fillets marinated in traditional Amritsari spices and chickpea flour. A light and flavorful appetizer that melts in your mouth.',
        ingredients: ['Fish Fillets', 'Chickpea Flour (Besan)', 'Carom Seeds (Ajwain)', 'Ginger-Garlic Paste', 'Lemon Juice', 'Red Chili Powder', 'Turmeric', 'Egg'],
        features: ['✓ Amritsari specialty', '✓ Light & crispy batter', '✓ Ajwain flavor', '✓ Fresh fish', '✓ Perfect snack'],
        prepTime: '15 mins',
        rating: 4.8,
        reviews: 189,
        vegetarian: false
    },
    {
        id: 47,
        fullDescription: 'A royal feast for vegetarians! Fragrant basmati rice layered with a rich medley of seasonal vegetables cooked in aromatic spices and saffron-infused milk. Served with raita and salan.',
        ingredients: ['Basmati Rice', 'Cauliflower', 'Carrots', 'Beans', 'Peas', 'Potatoes', 'Saffron', 'Biryani Masala', 'Fried Onions (Barista)', 'Ghee'],
        features: ['✓ Authentic Dum cooking', '✓ Fresh seasonal veggies', '✓ Saffron aroma', '✓ Served with Raita', '✓ Complete meal'],
        prepTime: '20 mins',
        rating: 4.7,
        reviews: 210,
        vegetarian: true
    },
    {
        id: 48,
        fullDescription: 'Orignating from the streets of Old Delhi! Tender chicken pieces marinated in yoghurt and spices, layered with long-grain basmati rice and slow-cooked in a sealed pot (dum) to lock in the flavors.',
        ingredients: ['Basmati Rice', 'Chicken Pieces', 'Yoghurt', 'Saffron', 'Kewra Water', 'Rose Water', 'Ghee', 'Whole Spices', 'Fried Onions'],
        features: ['✓ Purani Delhi style', '✓ Dum Pukht cooking', '✓ Rich & aromatic', '✓ Tender chicken', '✓ Classic recipe'],
        prepTime: '25 mins',
        rating: 4.9,
        reviews: 450,
        vegetarian: false
    },
    {
        id: 49,
        fullDescription: 'A delicacy for meat connoisseurs! Succulent pieces of goat meat cooked with aromatic spices and layered with premium basmati rice. Slow-cooked to perfection for an unforgettable taste experience.',
        ingredients: ['Basmati Rice', 'Goat Meat', 'Yoghurt', 'Saffron', 'Mint Leaves', 'Coriander', 'Garam Masala', 'Ghee', 'Ginger-Garlic'],
        features: ['✓ Premium goat meat', '✓ Traditional Dum style', '✓ Exquisite aroma', '✓ Rich flavors', '✓ Special occasion dish'],
        prepTime: '30 mins',
        rating: 4.8,
        reviews: 320,
        vegetarian: false
    },
    {
        id: 71,
        fullDescription: 'A delightful vegetarian platter featuring stuffed Amritsari Kulcha served with two delicious vegetable curries, rice, and sides. A perfect meal for one!',
        ingredients: ['Amritsari Kulcha', '2 Veg Curries', 'Rice', 'Salad', 'Papad', 'Raita', 'Sweet of the Day'],
        rawIngredients: ['Refined Flour', 'Fresh Vegetables', 'Yoghurt', 'Spices', 'Basmati Rice', 'Ghee'],
        features: ['✓ Includes Stuffed Kulcha', '✓ 2 Different Curries', '✓ Complete Thali', '✓ Freshly Prepared', '✓ Sizzling Hot'],
        prepTime: '20 mins',
        rating: 4.6,
        reviews: 95,
        vegetarian: true
    },
    {
        id: 72,
        fullDescription: 'The ultimate vegetarian feast! Indulge in a grand spread of FOUR different vegetable curries, served with fluffy pooris, aromatic rice, and all the traditional accompaniments.',
        ingredients: ['4 Veg Curries', 'Pooris', 'Rice', 'Salad', 'Papad', 'Raita', 'Sweet of the Day'],
        rawIngredients: ['Fresh Vegetables', 'Wheat Flour', 'Basmati Rice', 'Yoghurt', 'Exotic Spices', 'Oil', 'Ghee'],
        features: ['✓ 4 Veg Curries Variety', '✓ Includes Pooris', '✓ Grand Thali Experience', '✓ Perfect for Big Appetites', '✓ Authentic Flavors'],
        prepTime: '25 mins',
        rating: 4.8,
        reviews: 112,
        vegetarian: true
    },
    {
        id: 125,
        fullDescription: 'The ultimate royal feast! A grand platter featuring your choice of tender Goat Curry or rich Paneer Curry, accompanied by a delicious Chicken Appetizer. A complete meal experience.',
        ingredients: ['Goat Curry/Paneer Curry', 'Chicken Appetizer', 'Bread (Naan/Roti)', 'Rice', 'Salad', 'Papad', 'Raita', 'Sweet of the Day'],
        rawIngredients: ['Fresh Goat Meat', 'Paneer (Cottage Cheese)', 'Basmati Rice', 'Whole Wheat Flour', 'Yoghurt', 'Exotic Spices', 'Ghee', 'Fresh Vegetables'],
        features: ['✓ Choice of Curry (Goat/Paneer)', '✓ Includes Chicken Appetizer', '✓ Complete Thali', '✓ Includes Rice & Breads', '✓ Sweet Dish Included'],
        prepTime: '25 mins',
        rating: 4.9,
        reviews: 50,
        vegetarian: false
    },
    {
        id: 126,
        fullDescription: 'A wholesome non-veg thali with all the fixings! Enjoy your choice of Chicken Curry or Paneer Curry, served with a Chicken Appetizer, Bread, Rice, Salad, Papad, Raita, and a Sweet.',
        ingredients: ['Chicken Curry/Paneer Curry', 'Chicken Appetizer', 'Bread (Naan/Roti)', 'Rice', 'Salad', 'Papad', 'Raita', 'Sweet of the Day'],
        rawIngredients: ['Tender Chicken', 'Paneer (Cottage Cheese)', 'Basmati Rice', 'Whole Wheat Flour', 'Yoghurt', 'Aromatic Spices', 'Butter', 'Fresh Vegetables'],
        features: ['✓ Choice of Curry (Chicken/Paneer)', '✓ Includes Chicken Appetizer', '✓ Complete Thali', '✓ Includes Rice & Breads', '✓ Sweet Dish Included'],
        prepTime: '25 mins',
        rating: 4.8,
        reviews: 45,
        vegetarian: false
    },
    {
        id: 50,
        fullDescription: 'A classic North Indian vegetarian dish made with potatoes (aloo) and cauliflower (gobhi), stir-fried with onions, tomatoes, and aromatic spices. Simple, comforting, and delicious.',
        ingredients: ['Potatoes', 'Cauliflower', 'Onions', 'Tomatoes', 'Ginger', 'Turmeric', 'Cumin', 'Coriander'],
        features: ['✓ Homestyle cooking', '✓ Comfort food', '✓ Fresh vegetables', '✓ Mildly spiced', '✓ Vegan friendly'],
        prepTime: '15 mins',
        rating: 4.5,
        reviews: 120,
        vegetarian: true
    },
    {
        id: 51,
        fullDescription: 'A spicy and tangy chickpea curry from the Punjab region. Cooked with a special blend of roasted spices (Pindi masala) and tea leaves to give it a dark, rich color and unique flavor.',
        ingredients: ['Chickpeas (Chole)', 'Pindi Chole Masala', 'Tea Leaves', 'Ginger', 'Green Chilies', 'Amchur (Mango Powder)', 'Pomegranate Seeds'],
        features: ['✓ Authentic Punjabi taste', '✓ Rich dark gravy', '✓ Spicy & tangy', '✓ High protein', '✓ Best with Bhature/Kulcha'],
        prepTime: '20 mins',
        rating: 4.7,
        reviews: 180,
        vegetarian: true
    },
    {
        id: 52,
        fullDescription: 'A creamy and buttery black lentil dish, slow-cooked overnight on a low flame to achieve a velvety texture. Flavored with fresh cream, butter, and mild spices.',
        ingredients: ['Black Lentils (Urad Dal)', 'Kidney Beans (Rajma)', 'Butter', 'Fresh Cream', 'Tomato Puree', 'Ginger-Garlic Paste', 'Kasuri Methi'],
        features: ['✓ Slow-cooked (Dal Makhani)', '✓ Rich & creamy', '✓ Buttery texture', '✓ Signature dish', '✓ Mildly spiced'],
        prepTime: '25 mins',
        rating: 4.9,
        reviews: 350,
        vegetarian: true
    },
    {
        id: 53,
        fullDescription: 'Comforting yellow lentil curry (Arhar/Moong dal) tempered with ghee, cumin seeds, garlic, and dried red chilies. A light and healthy staple.',
        ingredients: ['Yellow Lentils (Arhar/Moong)', 'Ghee', 'Cumin Seeds', 'Garlic', 'Dried Red Chilies', 'Tomatoes', 'Turmeric', 'Coriander'],
        features: ['✓ Light & healthy', '✓ Home-style Tadka', '✓ Comfort food', '✓ Gluten-free', '✓ Best with Rice'],
        prepTime: '15 mins',
        rating: 4.6,
        reviews: 140,
        vegetarian: true
    },
    {
        id: 54,
        fullDescription: 'Soft paneer cubes simmered in a rich, creamy, and mildly sweet tomato-cashew gravy finished with butter and cream. A crowd favorite!',
        ingredients: ['Paneer', 'Butter', 'Fresh Cream', 'Tomatoes', 'Cashews', 'Honey/Sugar', 'Kasuri Methi', 'Cardamom'],
        features: ['✓ Rich buttery gravy', '✓ Mild & sweet', '✓ Creamy texture', '✓ Kid-friendly', '✓ Vegetarian favorite'],
        prepTime: '20 mins',
        rating: 4.8,
        reviews: 410,
        vegetarian: true
    },
    {
        id: 55,
        fullDescription: 'A healthy and delicious dish consisting of paneer cubes cooked in a smooth, spicy spinach gravy. Enriched with cream and aromatic spices.',
        ingredients: ['Paneer', 'Spinach (Palak)', 'Onions', 'Tomatoes', 'Ginger-Garlic', 'Green Chilies', 'Fresh Cream', 'Garam Masala'],
        features: ['✓ Healthy spinach base', '✓ High protein', '✓ Smooth gravy', '✓ Rich in iron', '✓ Classic combination'],
        prepTime: '20 mins',
        rating: 4.7,
        reviews: 290,
        vegetarian: true
    },
    {
        id: 56,
        fullDescription: 'Spicy and flavorful paneer dish cooked with bell peppers, onions, and tomatoes in a thick masala gravy, flavored with freshly ground coriander and red chilies (Kadai Masala).',
        ingredients: ['Paneer', 'Capsicum (Bell Peppers)', 'Onions', 'Tomatoes', 'Kadai Masala', 'Whole Coriander Seeds', 'Dried Red Chilies'],
        features: ['✓ Spicy & flavorful', '✓ Crunchy veggies', '✓ Freshly ground spices', '✓ Semi-dry gravy', '✓ Restaurant style'],
        prepTime: '20 mins',
        rating: 4.7,
        reviews: 260,
        vegetarian: true
    },
    {
        id: 94,
        fullDescription: 'A rich and creamy traditional Indian dessert made by reducing milk over a low flame for hours until it thickens and turns into a caramel-brown color. Garnished with nuts.',
        ingredients: ['Full Cream Milk', 'Sugar', 'Cardamom', 'Almonds', 'Pistachios', 'Saffron'],
        features: ['✓ Slow-cooked richness', '✓ Caramelized milk flavor', '✓ Thick & creamy', '✓ Authentic recipe', '✓ Served chilled'],
        prepTime: '10 mins',
        rating: 4.8,
        reviews: 150,
        vegetarian: true
    },
    {
        id: 95,
        fullDescription: 'Soft, melt-in-the-mouth deep-fried dumplings made of milk solids (khoya) and dipped in aromatic rose and saffron-flavored sugar syrup. Served warm.',
        ingredients: ['Khoya (Milk Solids)', 'Paneer', 'Sugar', 'Rose Water', 'Cardamom', 'Saffron', 'Ghee'],
        features: ['✓ Soft & spongy', '✓ Warm & comforting', '✓ Rose flavor syrup', '✓ Classic Indian sweet', '✓ Perfect dessert'],
        prepTime: '5 mins',
        rating: 4.9,
        reviews: 320,
        vegetarian: true
    },
    {
        id: 96,
        fullDescription: 'Delicate cottage cheese dumplings soaked in sweetened, thickened milk flavored with saffron and cardamom. A cool and refreshing royal dessert.',
        ingredients: ['Paneer (Chenna)', 'Milk', 'Sugar', 'Saffron', 'Pistachios', 'Almonds', 'Cardamom'],
        features: ['✓ Royal Bengali sweet', '✓ Saffron milk base', '✓ Soft dumplings', '✓ Served chilled', '✓ Light & refreshing'],
        prepTime: '5 mins',
        rating: 4.9,
        reviews: 280,
        vegetarian: true
    },
    {
        id: 97,
        fullDescription: 'Traditional Indian pancakes made from flour and milk, deep-fried in ghee and soaked in sugar syrup. Crispy on the edges and soft in the center.',
        ingredients: ['Flour (Maida)', 'Milk', 'Sugar', 'Fennel Seeds', 'Cardamom', 'Ghee', 'Rabdi (optional)'],
        features: ['✓ Traditional pancake', '✓ Fried in Ghee', '✓ Crispy edges', '✓ Soaked in syrup', '✓ Festive special'],
        prepTime: '10 mins',
        rating: 4.6,
        reviews: 120,
        vegetarian: true
    },
    {
        id: 98,
        fullDescription: 'A decadent layered dessert featuring dense kulfi ice cream, vermicelli noodles (falooda), sweet basil seeds (sabja), and rose syrup.',
        ingredients: ['Kulfi', 'Falooda Sev', 'Basil Seeds (Sabja)', 'Rose Syrup', 'Dry Fruits', 'Milk'],
        features: ['✓ Multi-layered dessert', '✓ Rich Kulfi base', '✓ Chewy falooda', '✓ Cooling basil seeds', '✓ Summer favorite'],
        prepTime: '8 mins',
        rating: 4.8,
        reviews: 210,
        vegetarian: true
    },
    {
        id: 99,
        fullDescription: 'Creamy, dense Indian ice cream made with thickened milk, cream, and cardamom. Unchurned and frozen on a stick for that authentic texture.',
        ingredients: ['Full Cream Milk', 'Sugar', 'Cardamom', 'Cream', 'Nuts (Almonds/Pistachios)'],
        features: ['✓ Authentic Indian Ice Cream', '✓ Dense & creamy', '✓ Cardamom flavor', '✓ Kids favorite', '✓ Stick ice cream'],
        prepTime: '5 mins',
        rating: 4.7,
        reviews: 190,
        vegetarian: true
    },
    {
        id: 100,
        fullDescription: 'A rich and warm dessert made from yellow lentils (moong dal) slow-cooked in ghee with sugar and nuts. A labor of love and a true indulgence.',
        ingredients: ['Moong Dal', 'Ghee', 'Sugar', 'Milk/Khoya', 'Almonds', 'Cashews', 'Cardamom'],
        features: ['✓ Rich & heavy', '✓ Loaded with Ghee', '✓ Winter special', '✓ Grainy texture', '✓ Warm dessert'],
        prepTime: '10 mins',
        rating: 4.8,
        reviews: 160,
        vegetarian: true
    },
    {
        id: 101,
        fullDescription: 'Spongy and light cottage cheese balls cooked in a light sugar syrup. A Bengali delicacy that is loved all over India for its simplicity and taste.',
        ingredients: ['Paneer (Chenna)', 'Sugar', 'Water', 'Rose Water', 'Cardamom'],
        features: ['✓ Soft & Spongy', '✓ Light dessert', '✓ Not too sweet', '✓ Bengali classic', '✓ Squeezable'],
        prepTime: '5 mins',
        rating: 4.6,
        reviews: 140,
        vegetarian: true
    },
    {
        id: 124,
        fullDescription: 'A classic winter dessert made with fresh red carrots, milk, ghee, and nuts. Slow-cooked to perfection to bring out the natural sweetness of carrots.',
        ingredients: ['Red Carrots', 'Milk', 'Ghee', 'Sugar', 'Khoya', 'Cashews', 'Almonds', 'Raisins'],
        features: ['✓ Winter special', '✓ Fresh red carrots', '✓ Rich in Ghee', '✓ Loaded with nuts', '✓ Traditional recipe'],
        prepTime: '10 mins',
        rating: 4.9,
        reviews: 350,
        vegetarian: true
    },
    {
        id: 77,
        fullDescription: 'Soft and fluffy Indian flatbread made from refined flour, baked in a traditional clay oven (tandoor), and brushed generously with butter. The perfect accompaniment to any curry.',
        ingredients: ['Refined Flour (Maida)', 'Butter', 'Yoghurt', 'Milk', 'Salt', 'Sugar', 'Ghee'],
        features: ['✓ Baked in clay tandoor', '✓ Soft & fluffy', '✓ Brushed with Butter', '✓ Classic Indian bread', '✓ Best with Butter Chicken'],
        prepTime: '5 mins',
        rating: 4.8,
        reviews: 450,
        vegetarian: true
    },
    {
        id: 78,
        fullDescription: 'Flavorful naan bread topped with minced garlic and fresh coriander, baked in a tandoor until golden and crispy. Brushed with butter for an extra kick of flavor.',
        ingredients: ['Refined Flour', 'Minced Garlic', 'Fresh Coriander', 'Butter', 'Yoghurt', 'Salt'],
        features: ['✓ Strong garlic flavor', '✓ Crispy & soft', '✓ Freshly baked', '✓ Aromatic', '✓ Spicy curry companion'],
        prepTime: '6 mins',
        rating: 4.9,
        reviews: 512,
        vegetarian: true
    },
    {
        id: 79,
        fullDescription: 'Rustic and healthy flatbread made from whole wheat flour, baked in a tandoor. It has a slightly crispy texture and a smoky flavor from the clay oven.',
        ingredients: ['Whole Wheat Flour (Atta)', 'Water', 'Salt'],
        features: ['✓ Whole wheat goodness', '✓ Tandoori smoky flavor', '✓ Healthy choice', '✓ Vegan friendly', '✓ Daily staple'],
        prepTime: '4 mins',
        rating: 4.6,
        reviews: 320,
        vegetarian: true
    },
    {
        id: 80,
        fullDescription: 'An ultra-thin, soft flatbread that is folded like a handkerchief (roomal). It is light, airy, and perfect for scooping up rich gravies and kebabs.',
        ingredients: ['Refined Flour', 'Wheat Flour', 'Milk', 'Salt', 'Oil'],
        features: ['✓ Paper thin', '✓ Soft like silk', '✓ Handkerchief bread', '✓ Light to eat', '✓ Best with Kebabs'],
        prepTime: '5 mins',
        rating: 4.7,
        reviews: 280,
        vegetarian: true
    },
    {
        id: 81,
        fullDescription: 'A crispy, flaky, and layered naan that is crushed (chur-chur) before serving to enhance its texture. Stuffed with spices and topped with butter.',
        ingredients: ['Refined Flour', 'Spices', 'Ghee/Butter', 'Coriander', 'Potatoes/Paneer (optional filling)'],
        features: ['✓ Extra crispy & flaky', '✓ Crushed texture', '✓ Rich & heavy', '✓ Amritsari specialty', '✓ Served with Chole'],
        prepTime: '8 mins',
        rating: 4.8,
        reviews: 190,
        vegetarian: true
    },
    {
        id: 82,
        fullDescription: 'A multi-layered whole wheat flatbread prepared in a tandoor. Each layer is brushed with ghee to ensure it is crispy on the outside and soft on the inside.',
        ingredients: ['Whole Wheat Flour', 'Ghee', 'Carom Seeds (Ajwain)', 'Salt'],
        features: ['✓ Multi-layered (Lachha)', '✓ Crispy & flaky', '✓ Whole wheat', '✓ Tandoori baked', '✓ Rich taste'],
        prepTime: '6 mins',
        rating: 4.7,
        reviews: 240,
        vegetarian: true
    },
    {
        id: 83,
        fullDescription: 'Soft leavened bread stuffed with a spiced mixture of crumbly paneer, herbs, and onions. Baked in a tandoor and finished with butter.',
        ingredients: ['Refined Flour', 'Paneer (Cottage Cheese)', 'Onions', 'Green Chilies', 'Coriander', 'Spices', 'Butter'],
        features: ['✓ Stuffed with Paneer', '✓ Soft & delicious', '✓ High protein', '✓ Mildly spiced', '✓ Kids favorite'],
        prepTime: '8 mins',
        rating: 4.9,
        reviews: 310,
        vegetarian: true
    },
    {
        id: 84,
        fullDescription: 'Delicious kulcha stuffed with a spicy mixture of grated cauliflower (gobhi) and herbs. A crunchy and flavorful bread that pairs well with raita.',
        ingredients: ['Refined Flour', 'Cauliflower', 'Ginger', 'Green Chilies', 'Spices', 'Butter', 'Coriander'],
        features: ['✓ Stuffed with Gobhi', '✓ Crunchy texture', '✓ Flavorful stuffing', '✓ Tandoori baked', '✓ Perfect breakfast'],
        prepTime: '8 mins',
        rating: 4.7,
        reviews: 180,
        vegetarian: true
    },
    {
        id: 85,
        fullDescription: 'Flavorful kulcha stuffed with chopped onions and spices. The sweetness of the onions combined with the spices makes for a savory delight.',
        ingredients: ['Refined Flour', 'Onions', 'Carom Seeds', 'Green Chilies', 'Coriander', 'Spices', 'Butter'],
        features: ['✓ Stuffed with Onions', '✓ Sweet & savory', '✓ Crunch of onions', '✓ Golden brown', '✓ Best with Chole'],
        prepTime: '8 mins',
        rating: 4.8,
        reviews: 220,
        vegetarian: true
    },
    {
        id: 86,
        fullDescription: 'A classic Amritsari specialty! Kulcha stuffed with a spicy mashed potato filling. Crisp on the outside, soft and spicy on the inside.',
        ingredients: ['Refined Flour', 'Potatoes', 'Pomegranate Seeds (Anardana)', 'Green Chilies', 'Ginger', 'Coriander', 'Butter'],
        features: ['✓ Stuffed with Aloo', '✓ Authentic Amritsari', '✓ Spicy potato filling', '✓ Filling bread', '✓ Comfort food'],
        prepTime: '8 mins',
        rating: 4.9,
        reviews: 350,
        vegetarian: true
    },
    {
        id: 87,
        fullDescription: 'Spicy naan topped with chopped green chilies and coriander. For those who love an extra kick of heat with their meal.',
        ingredients: ['Refined Flour', 'Green Chilies', 'Coriander', 'Garlic (optional)', 'Butter'],
        features: ['✓ Spicy kick', '✓ Topped with Chilies', '✓ Fiery flavor', '✓ Not for faint hearted', '✓ Tandoori baked'],
        prepTime: '6 mins',
        rating: 4.6,
        reviews: 150,
        vegetarian: true
    },
    {
        id: 88,
        fullDescription: 'A unique sweet and savory naan stuffed with nuts, raisins, and a sweetened cheese or khoya mixture. A perfect way to balance a spicy meal.',
        ingredients: ['Refined Flour', 'Cheese/Khoya', 'Almonds', 'Cashews', 'Raisins', 'Coconut', 'Provisions', 'Sugar/Honey'],
        features: ['✓ Sweet & Savory', '✓ Stuffed with dry fruits', '✓ Kashmiri style', '✓ Rich & nutty', '✓ Unique taste'],
        prepTime: '8 mins',
        rating: 4.8,
        reviews: 130,
        vegetarian: true
    },
    {
        id: 123,
        fullDescription: 'The ultimate bread platter for sharing! Includes a basket of our finest Tandoori Roti, Garlic Naan, Butter Naan, and Onion Kulcha. Perfect for family dining.',
        ingredients: ['Assorted Breads', 'Butter', 'Garlic', 'Onions', 'Wheat Flour', 'Refined Flour'],
        features: ['✓ Assortment of 4 breads', '✓ Shareable basket', '✓ Variety of tastes', '✓ Value for money', '✓ Freshly baked'],
        prepTime: '12 mins',
        rating: 4.9,
        reviews: 400,
        vegetarian: true
    },
    {
        id: 102,
        fullDescription: 'A cooling, refreshing, and delicious yogurt drink made with ripe Alphonso mango pulp and churned yoghurt. A perfect summer drink.',
        ingredients: ['Yoghurt', 'Mango Pulp', 'Sugar', 'Cardamom', 'Ice'],
        features: ['✓ Made with Alphonso mango', '✓ Rich & creamy', '✓ Chilled & refreshing', '✓ No preservatives', '✓ Summer special'],
        prepTime: '5 mins',
        rating: 4.8,
        reviews: 320,
        vegetarian: true
    },
    {
        id: 103,
        fullDescription: 'Spiced buttermilk, traditionally known as Masala Chaas. A light and refreshing drink made with diluted yoghurt and flavored with roasted cumin and mint.',
        ingredients: ['Yoghurt', 'Water', 'Roasted Cumin Powder', 'Black Salt', 'Mint Leaves', 'Coriander'],
        features: ['✓ Disgestive aid', '✓ Light & refreshing', '✓ Cooling effect', '✓ Low calorie', '✓ Traditional recipe'],
        prepTime: '3 mins',
        rating: 4.7,
        reviews: 210,
        vegetarian: true
    },
    {
        id: 104,
        fullDescription: 'Thick, creamy, and sweet Punjabi Lassi served in a traditional style with a dollop of fresh cream (malai) on top.',
        ingredients: ['Yoghurt', 'Sugar', 'Malai (Cream)', 'Cardamom', 'Rose Water'],
        features: ['✓ Thick & creamy', '✓ Topped with Malai', '✓ Traditional Punjabi style', '✓ Sweet & filling', '✓ Served chilled'],
        prepTime: '5 mins',
        rating: 4.9,
        reviews: 350,
        vegetarian: true
    },
    {
        id: 105,
        fullDescription: 'A tangy and spicy summer cooler made from raw green mangoes. It is known for its heat-resistant properties and delicious chatpata taste.',
        ingredients: ['Raw Mango', 'Mint', 'Cumin Powder', 'Black Salt', 'Sugar/Jaggery', 'Water'],
        features: ['✓ Made from raw mangoes', '✓ Tangy & spicy', '✓ Heat buster', '✓ Digestive', '✓ Street food classic'],
        prepTime: '5 mins',
        rating: 4.8,
        reviews: 180,
        vegetarian: true
    },
    {
        id: 106,
        fullDescription: 'A fizzy and spicy soda drink flavored with Jal Jeera masala. A perfect digestive drink to have after a heavy meal.',
        ingredients: ['Soda Water', 'Jal Jeera Masala', 'Lemon Juice', 'Mint', 'Boondi (optional)'],
        features: ['✓ Fizzy & spicy', '✓ Digestive', '✓ Refreshing', '✓ Masala flavor', '✓ Instant energy'],
        prepTime: '2 mins',
        rating: 4.6,
        reviews: 150,
        vegetarian: true
    },
    {
        id: 107,
        fullDescription: 'A rich and colorful dessert drink made with rose syrup, vermicelli, sweet basil seeds, and chilled milk. Topped with a scoop of ice cream.',
        ingredients: ['Milk', 'Rose Syrup', 'Falooda Sev', 'Basil Seeds', 'Ice Cream', 'Nuts'],
        features: ['✓ Rich dessert drink', '✓ Rose flavored', '✓ Chewy texture', '✓ Cooling properties', '✓ Contains ice cream'],
        prepTime: '8 mins',
        rating: 4.9,
        reviews: 280,
        vegetarian: true
    },
    {
        id: 108,
        fullDescription: 'Thick and creamy Mango Shake made with fresh mangoes and full-cream milk. A seasonal favorite loved by all ages.',
        ingredients: ['Fresh Mangoes', 'Milk', 'Sugar', 'Ice Cream (optional)', 'Nuts'],
        features: ['✓ Fresh mangoes used', '✓ Thick & tasty', '✓ No artificial flavors', '✓ Vitamin rich', '✓ Breakfast or snack'],
        prepTime: '5 mins',
        rating: 4.8,
        reviews: 310,
        vegetarian: true
    },
    {
        id: 109,
        fullDescription: 'Classic Vanilla Shake made with premium vanilla ice cream and milk. Smooth, creamy, and simply delicious.',
        ingredients: ['Vanilla Ice Cream', 'Milk', 'Sugar', 'Whipped Cream (optional)'],
        features: ['✓ Classic flavor', '✓ Smooth texture', '✓ Kids favorite', '✓ Made with ice cream', '✓ Served chilled'],
        prepTime: '5 mins',
        rating: 4.7,
        reviews: 200,
        vegetarian: true
    },
    {
        id: 110,
        fullDescription: 'Indulgent Chocolate Shake made with rich cocoa and chocolate ice cream. A treat for all chocolate lovers.',
        ingredients: ['Chocolate Ice Cream', 'Milk', 'Cocoa Powder', 'Chocolate Syrup', 'Choco Chips'],
        features: ['✓ Rich chocolate taste', '✓ Thick consistency', '✓ Topped with syrup', '✓ Indulgent treat', '✓ Mood lifter'],
        prepTime: '5 mins',
        rating: 4.8,
        reviews: 340,
        vegetarian: true
    },
    {
        id: 111,
        fullDescription: 'Refreshing Rose Shake with the soothing aroma and flavor of rose. Pink, pretty, and perfect for a hot day.',
        ingredients: ['Milk', 'Rose Syrup', 'Sugar', 'Ice Cream', 'Rose Petals'],
        features: ['✓ Floral aroma', '✓ Cooling', '✓ Pink color', '✓ Sweet & subtle', '✓ Unique flavor'],
        prepTime: '5 mins',
        rating: 4.6,
        reviews: 160,
        vegetarian: true
    },
    {
        id: 112,
        fullDescription: 'Chilled creamy coffee blended with milk and sugar. Frothy and energizing, perfect for coffee lovers.',
        ingredients: ['Coffee', 'Milk', 'Sugar', 'Ice', 'Chocolate Powder (garnish)'],
        features: ['✓ Energizing', '✓ Creamy texture', '✓ Strong coffee kick', '✓ Chilled', '✓ Café style'],
        prepTime: '5 mins',
        rating: 4.7,
        reviews: 250,
        vegetarian: true
    },
    {
        id: 113,
        fullDescription: 'Royal Saffron Milk loaded with nuts and dried fruits. A warm (or chilled) healthy drink that is rich in flavor and nutrition.',
        ingredients: ['Milk', 'Saffron (Kesar)', 'Almonds', 'Cashews', 'Pistachios', 'Cardamom', 'Sugar'],
        features: ['✓ Royal drink', '✓ Loaded with nuts', '✓ Saffron infused', '✓ Healthy & tasty', '✓ Traditional recipe'],
        prepTime: '10 mins',
        rating: 4.9,
        reviews: 190,
        vegetarian: true
    },
    {
        id: 114,
        fullDescription: 'Authentic Indian Masala Chai infused with fresh ginger and cardamom. Strong, aromatic, and refreshing.',
        ingredients: ['Tea Leaves', 'Milk', 'Water', 'Fresh Ginger', 'Cardamom', 'Sugar'],
        features: ['✓ Fresh ginger used', '✓ Strong & aromatic', '✓ Indian street style', '✓ Warm & cozy', '✓ Perfect tea break'],
        prepTime: '10 mins',
        rating: 4.8,
        reviews: 420,
        vegetarian: true
    },
    {
        id: 115,
        fullDescription: 'Hot freshly brewed coffee. A simple yet perfect pick-me-up beverage.',
        ingredients: ['Coffee Powder', 'Milk', 'Sugar', 'Water'],
        features: ['✓ Hot & fresh', '✓ Instant energy', '✓ Classic taste', '✓ Comfort warm drink', '✓ Customizable sugar'],
        prepTime: '5 mins',
        rating: 4.5,
        reviews: 150,
        vegetarian: true
    },
    {
        id: 116,
        fullDescription: 'Chilled can/bottle of Coca-Cola.',
        ingredients: ['Carbonated Water', 'Sugar', 'Caffeine', 'Flavorings'],
        features: ['✓ Chilled', '✓ Fizzy', '✓ Classic Cola taste', '✓ Refreshing', '✓ Standard serving'],
        prepTime: '1 min',
        rating: 4.5,
        reviews: 100,
        vegetarian: true
    },
    {
        id: 117,
        fullDescription: 'Chilled can/bottle of Sprite.',
        ingredients: ['Carbonated Water', 'Sugar', 'Lemon-Lime Flavorings'],
        features: ['✓ Chilled', '✓ Lemon-Lime flavor', '✓ Fizzy & clear', '✓ Refreshing', '✓ Standard serving'],
        prepTime: '1 min',
        rating: 4.5,
        reviews: 90,
        vegetarian: true
    },
    {
        id: 118,
        fullDescription: 'Chilled Limca, a lemon-lime flavored carbonated soft drink popular in India.',
        ingredients: ['Carbonated Water', 'Sugar', 'Lemon Flavorings'],
        features: ['✓ Lemony zing', '✓ Sharp fizz', '✓ Thirst quencher', '✓ Popular in India', '✓ Chilled'],
        prepTime: '1 min',
        rating: 4.6,
        reviews: 110,
        vegetarian: true
    },
    {
        id: 119,
        fullDescription: 'Chilled Thums Up, a strong and fizzy cola drink known for its spicy kick. The taste of bold India.',
        ingredients: ['Carbonated Water', 'Sugar', 'Caffeine', 'Spices/Flavorings'],
        features: ['✓ Strong Cola', '✓ Spicy kick', '✓ Extra fizzy', '✓ "Taste the Thunder"', '✓ Cult favorite'],
        prepTime: '1 min',
        rating: 4.8,
        reviews: 180,
        vegetarian: true
    },
    {
        id: 120,
        fullDescription: 'Chilled Fanta, an orange-flavored carbonated soft drink.',
        ingredients: ['Carbonated Water', 'Sugar', 'Orange Flavorings'],
        features: ['✓ Orange flavor', '✓ Sweet & fruity', '✓ Bright color', '✓ Kids favorite', '✓ Chilled'],
        prepTime: '1 min',
        rating: 4.5,
        reviews: 95,
        vegetarian: true
    },
    {
        id: 121,
        fullDescription: 'Packaged drinking water bottle.',
        ingredients: ['Treated Water', 'Minerals'],
        features: ['✓ Pure & safe', '✓ Hydrating', '✓ Sealed bottle', '✓ Essential', '✓ Chilled option'],
        prepTime: '0 mins',
        rating: 5.0,
        reviews: 50,
        vegetarian: true
    },
    {
        id: 122,
        fullDescription: 'A spicy twist to regular soda! Carbonated water mixed with special masala, lemon, and black salt. A zesty refresher.',
        ingredients: ['Soda Water', 'Chat Masala', 'Black Salt', 'Lemon', 'Ice'],
        features: ['✓ Fizzy & spicy', '✓ Digestive', '✓ Zesty flavor', '✓ Street style', '✓ Refreshing'],
        prepTime: '2 mins',
        rating: 4.7,
        reviews: 130,
        vegetarian: true
    },
    {
        id: 57,
        fullDescription: 'Melt-in-the-mouth vegetable and paneer dumplings (koftas) simmered in a rich, creamy, and mildly sweet white cashew-based gravy.',
        ingredients: ['Paneer', 'Potatoes', 'Cashews', 'Fresh Cream', 'Raisins', 'Cardamom', 'White Pepper', 'Khoya'],
        features: ['✓ Rich white gravy', '✓ Melt-in-mouth koftas', '✓ Mild & sweet', '✓ Royal delicacy', '✓ Special occasion dish'],
        prepTime: '25 mins',
        rating: 4.8,
        reviews: 220,
        vegetarian: true
    },
    {
        id: 58,
        fullDescription: 'Smoky grilled paneer tikka pieces tossed in a spicy, rich tomato-onion gravy. Combines the flavor of tandoori paneer with a delicious curry.',
        ingredients: ['Grilled Paneer Tikka', 'Onions', 'Tomatoes', 'Yoghurt', 'Tandoori Masala', 'Ginger-Garlic', 'Capsicum'],
        features: ['✓ Smoky tandoori flavor', '✓ Spicy masala gravy', '✓ Grilled paneer', '✓ Robust taste', '✓ Unique fusion'],
        prepTime: '25 mins',
        rating: 4.8,
        reviews: 195,
        vegetarian: true
    },
    {
        id: 127,
        fullDescription: 'A rustic and earthy dish made with fresh mustard greens (sarson) and spinach, cooked with spices and served with cubes of paneer.',
        ingredients: ['Mustard Greens (Sarson)', 'Spinach', 'Paneer', 'Ginger', 'Garlic', 'Green Chilies', 'Corn Flour (Makki Atta)', 'Ghee'],
        features: ['✓ Authentic Punjabi', '✓ Winter special', '✓ Nutrient rich', '✓ Earthy flavors', '✓ Best with Makki Roti'],
        prepTime: '25 mins',
        rating: 4.6,
        reviews: 110,
        vegetarian: true
    },
    {
        id: 128,
        fullDescription: 'Traditional Sarson Ka Saag, a winter staple in North India. A lush green curry made from mustard greens and spices, topped with a dollop of white butter.',
        ingredients: ['Mustard Greens (Sarson)', 'Spinach', 'Bathua', 'Ginger', 'Garlic', 'Green Chilies', 'Butter (White Makkhan)'],
        features: ['✓ Traditional recipe', '✓ Superfood ingredients', '✓ Rich in iron', '✓ Topped with butter', '✓ Pure harvest taste'],
        prepTime: '25 mins',
        rating: 4.7,
        reviews: 150,
        vegetarian: true
    },
    {
        id: 129,
        fullDescription: 'Protein-rich Soya Chaap chunks cooked in a spicy and rich North Indian style onion-tomato gravy. A perfect vegetarian alternative to meat curries.',
        ingredients: ['Soya Chaap', 'Onions', 'Tomatoes', 'Yoghurt', 'Ginger-Garlic', 'Kashmiri Red Chili', 'Garam Masala', 'Coriander'],
        features: ['✓ High protein veg', '✓ Meat-like texture', '✓ Rich gravy', '✓ Spicy & Masaledar', '✓ Satisfying meal'],
        prepTime: '20 mins',
        rating: 4.6,
        reviews: 130,
        vegetarian: true
    },
    {
        id: 89,
        fullDescription: 'Classic Aloo Parantha stuffed with a spicy mixture of mashed potatoes, onions, and herbs. Served with cooling raita, tangy pickle, and a side of flavorful aloo baji.',
        ingredients: ['Whole Wheat Flour', 'Potatoes', 'Onions', 'Green Chilies', 'Coriander', 'Spices', 'Ghee'],
        features: ['✓ Stuffed with spiced potatoes', '✓ Served with Raita, Pickle, Aloo Baji', '✓ Home-style taste', '✓ Filling breakfast', '✓ Freshly made'],
        prepTime: '15 mins',
        rating: 4.8,
        reviews: 210,
        vegetarian: true
    },
    {
        id: 90,
        fullDescription: 'Crispy Gobhi Parantha stuffed with grated cauliflower seasoned with aromatic spices. Served with cooling raita, tangy pickle, and a side of flavorful aloo baji.',
        ingredients: ['Whole Wheat Flour', 'Cauliflower (Gobhi)', 'Ginger', 'Green Chilies', 'Spices', 'Ghee'],
        features: ['✓ Stuffed with grated cauliflower', '✓ Served with Raita, Pickle, Aloo Baji', '✓ Crispy texture', '✓ Winter special', '✓ Healthy & tasty'],
        prepTime: '15 mins',
        rating: 4.7,
        reviews: 180,
        vegetarian: true
    },
    {
        id: 91,
        fullDescription: 'Rich and protein-packed Paneer Parantha stuffed with crumbled cottage cheese and spices. Served with cooling raita, tangy pickle, and a side of flavorful aloo baji.',
        ingredients: ['Whole Wheat Flour', 'Paneer (Cottage Cheese)', 'Onions', 'Green Chilies', 'Coriander', 'Spices', 'Ghee'],
        features: ['✓ Stuffed with fresh Paneer', '✓ Served with Raita, Pickle, Aloo Baji', '✓ Protein rich', '✓ Soft & delicious', '✓ Kids favorite'],
        prepTime: '15 mins',
        rating: 4.9,
        reviews: 250,
        vegetarian: true
    },
    {
        id: 93,
        fullDescription: 'A cheesy delight! Whole wheat parantha stuffed with a generous amount of melted cheese and herbs. Served with cooling raita, tangy pickle, and a side of flavorful aloo baji.',
        ingredients: ['Whole Wheat Flour', 'Mozzarella/Cheddar Cheese', 'Herbs', 'Chili Flakes', 'Butter'],
        features: ['✓ Oozing with Cheese', '✓ Served with Raita, Pickle, Aloo Baji', '✓ Fusion flavor', '✓ Kids favorite', '✓ Cheesy goodness'],
        prepTime: '15 mins',
        rating: 4.8,
        reviews: 300,
        vegetarian: true
    },
    {
        id: 65,
        fullDescription: 'Flavorful soya chaap marinated in authentic Amritsari spices, grilled to perfection and wrapped in a soft roomali roti with crunchy onions and mint chutney.',
        ingredients: ['Soya Chaap', 'Amritsari Masala', 'Onions', 'Mint Chutney', 'Yoghurt', 'Roomali Roti'],
        features: ['✓ Authentic Amritsari taste', '✓ High protein vegetarian', '✓ Grilled texture', '✓ Freshly made', '✓ Tangy & Spicy'],
        prepTime: '15 mins',
        rating: 4.5,
        reviews: 110,
        vegetarian: true
    },
    {
        id: 66,
        fullDescription: 'Spicy and tangy mashed potato filling seasoned with chat masala, wrapped in a crispy paratha with onions and chutneys. A classic Indian street food favorite.',
        ingredients: ['Potatoes', 'Onions', 'Chat Masala', 'Tamarind Chutney', 'Green Chutney', 'Paratha', 'Spices'],
        features: ['✓ Spicy & Tangy', '✓ Comfort food', '✓ Crispy paratha', '✓ Kid-friendly', '✓ quick bite'],
        prepTime: '12 mins',
        rating: 4.4,
        reviews: 95,
        vegetarian: true
    },
    {
        id: 67,
        fullDescription: 'Juicy paneer cubes cooked on a tawa (griddle) with aromatic spices, bell peppers, and onions, wrapped in a warm soft roll. A delicious vegetarian option.',
        ingredients: ['Paneer', 'Capsicum', 'Onions', 'Tomatoes', 'Tawa Masala', 'Roti/Paratha', 'Butter'],
        features: ['✓ Paneer lover\'s choice', '✓ Fresh veggies', '✓ Tawa style cooking', '✓ Soft & juicy', '✓ Balanced meal'],
        prepTime: '15 mins',
        rating: 4.7,
        reviews: 140,
        vegetarian: true
    },
    {
        id: 68,
        fullDescription: 'Double the eggs, double the taste! Two egg omelets layered inside a flaky paratha, rolled with crunchy onions, green chilies, and tangy sauces.',
        ingredients: ['2 Eggs', 'Onions', 'Green Chilies', 'Tomato Ketchup', 'Chili Sauce', 'Paratha', 'Oil'],
        features: ['✓ Double Egg power', '✓ High protein', '✓ Filling snack', '✓ Street style flavor', '✓ Crispy & soft'],
        prepTime: '10 mins',
        rating: 4.6,
        reviews: 180,
        vegetarian: false
    },
    {
        id: 69,
        fullDescription: 'Succulent chicken pieces marinated in a refreshing fresh mint (pudina) and coriander chutney, grilled and wrapped in a soft roll. A burst of fresh flavors.',
        ingredients: ['Chicken', 'Mint (Pudina)', 'Coriander', 'Yoghurt', 'Onions', 'Roti/Paratha', 'Spices'],
        features: ['✓ Refreshing mint flavor', '✓ Grilled chicken', '✓ Healthy twist', '✓ Aromatic', '✓ Light & tasty'],
        prepTime: '15 mins',
        rating: 4.7,
        reviews: 160,
        vegetarian: false
    },
    {
        id: 70,
        fullDescription: 'Spicy minced chicken (keema) cooked with aromatic spices and green peas, stuffed in a roll with crunchy onions and chutneys. A hearty and flavorful treat.',
        ingredients: ['Chicken Keema', 'Green Peas', 'Onions', 'Spices', 'Green Chutney', 'Paratha', 'Lemon Juice'],
        features: ['✓ Flavorful keema', '✓ Spicy kick', '✓ Meat lover\'s favorite', '✓ Hearty filling', '✓ Rich taste'],
        prepTime: '15 mins',
        rating: 4.8,
        reviews: 200,
        vegetarian: false
    },
    {
        id: 59,
        fullDescription: 'Traditional home-style Chicken Curry cooked with bone-in chicken pieces in a thin, spicy onion-tomato gravy. Flavored with whole spices and garnished with fresh coriander.',
        ingredients: ['Chicken (Bone-in)', 'Onions', 'Tomatoes', 'Ginger-Garlic', 'Turmeric', 'Red Chili Powder', 'Garam Masala', 'Coriander'],
        features: ['✓ Traditional recipe', '✓ Home-style taste', '✓ Bone-in flavor', '✓ Spicy gravy', '✓ Comfort food'],
        prepTime: '25 mins',
        rating: 4.6,
        reviews: 210,
        vegetarian: false
    },
    {
        id: 60,
        fullDescription: 'The world-famous Butter Chicken! Tender boneless tandoori chicken pieces simmered in a rich, creamy, and buttery tomato gravy. Mildly spiced and slightly sweet.',
        ingredients: ['Boneless Chicken', 'Butter', 'Fresh Cream', 'Tomato Puree', 'Cashews', 'Kasuri Methi', 'Honey', 'Mild Spices'],
        features: ['✓ World famous dish', '✓ Rich & creamy', '✓ Buttery goodness', '✓ Mild & sweet', '✓ Best with Naan'],
        prepTime: '25 mins',
        rating: 4.9,
        reviews: 500,
        vegetarian: false
    },
    {
        id: 61,
        fullDescription: 'A robust and spicy Goat Curry made with tender bone-in goat meat slow-cooked in a thick masala gravy until it falls off the bone. A true meat lover\'s delight.',
        ingredients: ['Goat Meat (Bone-in)', 'Onions', 'Tomatoes', 'Ginger-Garlic', 'Whole Spices', 'Mustard Oil', 'Kashmiri Chili'],
        features: ['✓ Slow-cooked', '✓ Tender meat', '✓ Rich spicy gravy', '✓ Bone-in flavor', '✓ Special occasion dish'],
        prepTime: '35 mins',
        rating: 4.8,
        reviews: 320,
        vegetarian: false
    },
    {
        id: 62,
        fullDescription: 'Dry-style Karahi Chicken (Sukha) cooked in a wok with chunky bell peppers, onions, and tomatoes. The gravy is thick and clings to the meat, packed with the flavor of roasted spices.',
        ingredients: ['Chicken', 'Capsicum', 'Onions', 'Tomatoes', 'Karahi Masala', 'Whole Coriander', 'Dried Red Chilies', 'Ginger Juliennes'],
        features: ['✓ Semi-dry gravy', '✓ Wok-cooked', '✓ Intense flavors', '✓ Spicy kick', '✓ Best appetizer/side'],
        prepTime: '25 mins',
        rating: 4.7,
        reviews: 180,
        vegetarian: false
    },
    {
        id: 63,
        fullDescription: 'Classic Chicken Tikka Masala featuring grilled marinated chicken chunks (tikka) in a spiced curry sauce. The sauce is creamy and orange-colored, offering a perfect balance of spice and creaminess.',
        ingredients: ['Chicken Tikka', 'Yoghurt', 'Cream', 'Tomato Puree', 'Onions', 'Garlic', 'Ginger', 'Tikka Masala Spice'],
        features: ['✓ Grilled chicken', '✓ Creamy spicy sauce', '✓ UK favorite', '✓ Boneless meat', '✓ Rich flavor profile'],
        prepTime: '25 mins',
        rating: 4.8,
        reviews: 400,
        vegetarian: false
    },
    {
        id: 64,
        fullDescription: 'Minced chicken (Keema) cooked with green peas (Matar) in a dry, spiced masala. A versatile dish that pairs perfectly with pav (bread) or roti.',
        ingredients: ['Minced Chicken (Keema)', 'Green Peas', 'Onions', 'Tomatoes', 'Ginger-Garlic', 'Green Chilies', 'Garam Masala', 'Coriander'],
        features: ['✓ Minced meat', '✓ Quick & tasty', '✓ High protein', '✓ Street food vibe', '✓ Versatile dish'],
        prepTime: '20 mins',
        rating: 4.6,
        reviews: 250,
        vegetarian: false
    },
    {
        id: 130,
        fullDescription: 'Tender chicken pieces cooked in a nutritious and flavorful spinach (palak) gravy. A healthy twist on the classic chicken curry.',
        ingredients: ['Chicken', 'Spinach (Palak)', 'Onions', 'Tomatoes', 'Ginger-Garlic', 'Cream', 'Whole Spices'],
        features: ['✓ Healthy spinach base', '✓ High protein', '✓ Unique flavor', '✓ Iron rich', '✓ Colorful dish'],
        prepTime: '25 mins',
        rating: 4.7,
        reviews: 160,
        vegetarian: false
    },
    {
        id: 131,
        fullDescription: 'Spicy Kadai Chicken cooked with fresh ground spices, bell peppers, and onions in a traditional iron wok (kadai). Known for its robust and spicy flavor profile.',
        ingredients: ['Chicken', 'Capsicum', 'Onions', 'Tomatoes', 'Kadai Masala', 'Coriander Seeds', 'Red Chilies', 'Ginger'],
        features: ['✓ Spicy & robust', '✓ Fresh ground spices', '✓ Crunchy veggies', '✓ Wok flavor', '✓ North Indian classic'],
        prepTime: '25 mins',
        rating: 4.7,
        reviews: 210,
        vegetarian: false
    },
    {
        id: 132,
        fullDescription: 'Juicy chicken pieces marinated in fresh mint (pudina) and coriander chutney, grilled to perfection and rolled in a flaky paratha lined with a freshly cooked egg.',
        ingredients: ['Chicken Tikka', 'Egg', 'Paratha', 'Mint Chutney', 'Onions', 'Lemon Juice', 'Chaat Masala', 'Green Chilies'],
        features: ['✓ Minty fresh flavor', '✓ Includes Egg', '✓ Grilled chicken', '✓ Flaky paratha', '✓ Perfect meal-on-the-go'],
        prepTime: '15 mins',
        rating: 4.8,
        reviews: 95,
        vegetarian: false
    },
    {
        id: 133,
        fullDescription: 'A hearty roll stuffed with spicy minced chicken (keema) and a layer of egg inside a crisp paratha. Loaded with crunchy onions and tangy sauces for a burst of flavor.',
        ingredients: ['Chicken Keema', 'Egg', 'Paratha', 'Onions', 'Capsicum', 'Tomato Ketchup', 'Green Chutney', 'Spice Mix'],
        features: ['✓ Spicy Keema filling', '✓ Includes Egg', '✓ High protein', '✓ Rich flavors', '✓ Filling snack'],
        prepTime: '15 mins',
        rating: 4.7,
        reviews: 110,
        vegetarian: false
    }
];

function ProductDetail() {
    const { id } = useParams();
    const [allMenuItems, setAllMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/menu');
                if (response.ok) {
                    const data = await response.json();
                    setAllMenuItems(data);
                } else {
                    console.error('Failed to fetch menu items');
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) {
        return <div style={{ padding: '150px 20px', textAlign: 'center', fontSize: '1.2rem', color: '#8B1538' }}>Loading product details...</div>;
    }

    const basicProduct = allMenuItems.find(item => item.id === parseInt(id));
    const richInfo = richProductData.find(item => item.id === parseInt(id));

    // Merge data, defaulting to basic info if rich info is missing
    const product = basicProduct ? {
        ...basicProduct,
        ...(richInfo || {}),
        rating: richInfo?.rating || 4.5,
        reviews: richInfo?.reviews || '50+',
        features: richInfo?.features || ['✓ Authentic Taste', '✓ Fresh Ingredients', '✓ Served Hot'],
        ingredients: richInfo?.ingredients || [],
        prepTime: richInfo?.prepTime || '15 mins',
        fullDescription: richInfo?.fullDescription || basicProduct.description
    } : null;

    // State management
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [spiceLevel, setSpiceLevel] = useState('medium');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return (
            <div className="product-not-found">
                <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <h2>Product not found</h2>
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    // Related products (same category)
    const relatedProducts = allMenuItems
        .filter(item => item.category === product.category && item.id !== product.id)
        .slice(0, 4);

    // Product images (for demo, using emoji variations or single image)
    const productImages = product.image.startsWith('/')
        ? [product.image, product.image, product.image]
        : [product.image, '🥘', '🍽️'];

    // Add to Cart Handler
    const handleAddToCart = () => {
        const itemSpiceLevel = product.hot ? spiceLevel : null;
        addToCart(product, quantity, itemSpiceLevel);

        // Show notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    return (
        <div className="desi-product-page-wrapper">
            {/* Notification Toast */}
            {showNotification && (
                <div className="cart-notification">
                    ✅ Added to cart successfully!
                </div>
            )}

            <div className="desi-product-page">
                <div className="desi-container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="breadcrumb-separator">›</span>
                        <Link to="/menu">Menu</Link>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-category">{product.category}</span>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-current">{product.name}</span>
                    </nav>

                    {/* Back to Menu Button */}
                    <Link to="/menu" className="back-to-menu-btn">
                        ← Back to Menu
                    </Link>

                    <div className="desi-product-layout">
                        {/* Left: Product Image */}
                        <div className="desi-image-section">
                            <div className="desi-main-image">
                                {productImages[selectedImage].startsWith('/') || productImages[selectedImage].startsWith('http') ? (
                                    <img src={productImages[selectedImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                                ) : (
                                    <span className="desi-product-emoji">{productImages[selectedImage]}</span>
                                )}
                                {product.hot && <span className="spicy-badge">🌶️ Spicy</span>}
                            </div>

                            {/* Functional Thumbnails */}
                            <div className="desi-thumbnails">
                                {productImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`desi-thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        {img.startsWith('/') || img.startsWith('http') ? (
                                            <img src={img} alt={`${product.name} view ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                        ) : (
                                            img
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Right: Product Details */}
                        <div className="desi-details-section">
                            <h1 className="desi-product-title">{product.name}</h1>

                            <div className="desi-section">
                                <h3 className="desi-section-title">Description</h3>
                                <p className="desi-text">
                                    {product.fullDescription || product.description}
                                </p>
                            </div>

                            {/* Ingredients Section */}
                            {product.ingredients && product.ingredients.length > 0 && (
                                <div className="desi-section ingredients-section">
                                    <h3 className="desi-section-title">
                                        {product.category === 'thali' ? '📦 What\'s Inside' : '🥘 Ingredients'}
                                    </h3>
                                    <div className="ingredients-grid">
                                        {product.ingredients.map((ingredient, index) => (
                                            <span key={index} className="ingredient-tag">
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Raw Ingredients Section (for Thalis) */}
                            {product.rawIngredients && product.rawIngredients.length > 0 && (
                                <div className="desi-section raw-ingredients-section">
                                    <h3 className="desi-section-title">🥘 Ingredients</h3>
                                    <div className="ingredients-grid">
                                        {product.rawIngredients.map((ingredient, index) => (
                                            <span key={index} className="ingredient-tag">
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Features/Benefits Section */}
                            {product.features && product.features.length > 0 && (
                                <div className="desi-section features-section">
                                    <h3 className="desi-section-title">✨ What Makes it Special</h3>
                                    <ul className="features-list">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="feature-item">{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Prep Time Badge */}


                            {/* Spice Level Selector (only for spicy items) */}


                            {/* Rating & Reviews */}
                            <div className="product-rating">
                                <div className="stars">
                                    {'⭐'.repeat(Math.floor(product.rating))}
                                    {product.rating % 1 !== 0 && '⭐'}
                                </div>
                                <span className="rating-text">{product.rating}/5.0</span>
                                <span className="review-count">({product.reviews} reviews)</span>
                            </div>

                            {/* Dietary Badges */}


                            {/* Variant Selector */}
                            {product.variants && (
                                <div className="variant-selector" style={{ marginBottom: '20px' }}>
                                    <h3 className="desi-section-title" style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Select Size:</h3>
                                    <div className="variant-options" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        {product.variants.map((variant, index) => (
                                            <button
                                                key={index}
                                                className={`variant-btn ${selectedVariant === index ? 'active' : ''}`}
                                                onClick={() => setSelectedVariant(index)}
                                                style={{
                                                    padding: '8px 16px',
                                                    border: selectedVariant === index ? '2px solid #333' : '1px solid #ddd',
                                                    borderRadius: '20px',
                                                    background: selectedVariant === index ? '#fff' : '#f9f9f9',
                                                    color: '#333',
                                                    fontWeight: '600',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {variant.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector & Price */}
                            <div className="desi-price-section">
                                <div className="price-quantity">
                                    <div className="desi-price">
                                        {product.variants ? product.variants[selectedVariant].price : product.price}
                                    </div>
                                </div>
                                <Link to="/contact" className="desi-add-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                                    Contact to Order
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    {relatedProducts.length > 0 && (
                        <div className="related-products">
                            <h2 className="related-title">You May Also Like</h2>
                            <div className="related-grid">
                                {relatedProducts.map((item) => (
                                    <Link to={`/product/${item.id}`} key={item.id} className="related-card">
                                        <div className="related-image">
                                            {item.image.startsWith('/') || item.image.startsWith('http') ? (
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <span className="related-emoji">{item.image}</span>
                                            )}
                                        </div>
                                        <h3 className="related-name">{item.name}</h3>
                                        <div className="related-rating">
                                            {'⭐'.repeat(4)} 4.5
                                        </div>
                                        <p className="related-price">{item.price}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
