import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppEnquiryForm from '../components/WhatsAppEnquiryForm';
import '../index.css';

const TrayOrdersPage = () => {
    const [selectedSize, setSelectedSize] = useState('small');

    const traySizes = [
        {
            id: 'small',
            name: 'Small Tray',
            capacity: '15 to 18 Peoples',
            description: 'Perfect for intimate family gatherings and small office lunches.',
            icon: '🍱'
        },
        {
            id: 'large',
            name: 'Large Tray',
            capacity: '30 to 35 Peoples',
            description: 'Ideal for parties, celebrations, and corporate events.',
            icon: '🥘'
        }
    ];

    const menuOptions = [
        {
            category: 'Delhi Chaat Specials',
            items: [
                { name: 'Bhara Samosa (2 Pcs)', description: 'Crispy pastry shells stuffed with spiced potatoes and peas.', image: '/images/bhara-samosa.png' },
                { name: 'Delhi Ki Mashoor Aloo Tikki', description: 'Crispy potato patties topped with yogurt and tangy chutneys.', image: '/images/chats/Dahi%20Aloo%20Tikki.png' },
                { name: 'Golgappe', description: 'Soft lentil dumplings soaked in thick sweet yogurt.', image: '/images/chats/Golgappe.png' }
            ]
        },
        {
            category: 'Mumbai Street Local',
            items: [
                { name: 'Vada Pav (2 Pcs)', description: 'The iconic Mumbai spicy potato burger.', image: '/images/Mumbai%20Local/Karjat%20Vada%20Pav.png' },
                { name: 'Pav Bhaji', description: 'Spicy mashed vegetable curry served with buttery buns.', image: '/images/Mumbai%20Local/Cheese%20Pav%20Bhaji%20(Amul).png' },
                { name: 'Kutchi Dabeli (2 Pcs)', description: 'Spiced potato mixture in buns with pomegranate and peanuts.', image: '/images/Mumbai%20Local/Kacchi%20Dabeli.png' }
            ]
        },
        {
            category: 'Signature Rolls & Wraps',
            items: [
                { name: 'Paneer Tikka Roll', description: 'Grilled paneer cubes wrapped in a soft roomali roti.', image: '/images/Rolls/Tawa%20Paneer%20Roll.png' },
                { name: 'Chicken Keema Roll', description: 'Spicy minced chicken wrapped in a fresh paratha.', image: '/images/Rolls/Chicken%20Keema%20Roll.png' },
                { name: 'Double Egg Roll', description: 'Freshly made paratha layered with two eggs and onions.', image: '/images/Rolls/Double%20Eggroll%20Roll.png' }
            ]
        },
        {
            category: 'Tandoor & Sizzlers',
            items: [
                { name: 'Tandoori Chicken (Half)', description: 'Classic tandoor-grilled chicken marinated in yogurt and spices.', image: '/images/sizzling/Sutli%20Chicken.png' },
                { name: 'Paneer Tikka Sizzler', description: 'Grilled paneer served on a sizzling platter with veggies.', image: '/images/Bhatti%20Paneer%20Sizzler.png' },
                { name: 'Chicken Seekh Kebab', description: 'Flavorful minced chicken skewers grilled to perfection.', image: '/images/sizzling/Mix%20Chicken%20Tikka%20Sizzler.png' }
            ]
        },
        {
            category: 'Main Course & Biryani',
            items: [
                { name: 'Dal Makhani', description: 'Slow-cooked black lentils in a creamy, buttery gravy.', image: '/images/Tadka%20Marke/Daal%20Makhanwala.png' },
                { name: 'Purani Delhi Chicken Biryani', description: 'Aromatic basmati rice cooked with succulent chicken.', image: '/images/Biriyani/Purani%20Delhi%20Chicken%20Biryani.png' },
                { name: 'Pindi Chole', description: 'Spicy chickpeas cooked in authentic Punjabi style.', image: '/images/Tadka%20Marke/Pindi%20Chole.png' }
            ]
        },
        {
            category: 'Sweet Endings',
            items: [
                { name: 'Rasmalai', description: 'Soft cheese patties soaked in thickened, sweetened milk.', image: '/images/Sweets/Rasmalai.png' },
                { name: 'Gajar Ka Halwa', description: 'Traditional slow-cooked carrot pudding with dry fruits.', image: '/images/Sweets/Gajar%20ka%20Halwa.png' },
                { name: 'Gulab Jamun (2 Pcs)', description: 'Golden milk-solid dumplings in rose-scented syrup.', image: '/images/Sweets/Gulab%20Jamun.png' }
            ]
        }
    ];

    return (
        <div className="tray-orders-page">
            <section className="page-hero" style={{ backgroundImage: "url('/images/hero-3.png')", height: '400px' }}>
                <div className="container">
                    <h1 className="page-hero-title">Tray Orders</h1>
                    <p className="page-hero-subtitle">Authentic Delhi Flavors, Perfectly Portioned for Your Group</p>
                </div>
            </section>

            <section className="section container">
                <div className="section-title">
                    <span className="section-subtitle">Choose Your Scale</span>
                    <h2>Select Tray Size</h2>
                </div>

                <div className="about-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {traySizes.map((size) => (
                        <div 
                            key={size.id} 
                            className={`about-card ${selectedSize === size.id ? 'active' : ''}`}
                            onClick={() => setSelectedSize(size.id)}
                            style={{ 
                                cursor: 'pointer', 
                                border: selectedSize === size.id ? '2px solid var(--accent-gold)' : '2px solid transparent',
                                transition: 'all 0.3s ease',
                                transform: selectedSize === size.id ? 'translateY(-5px)' : 'none'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{size.icon}</div>
                            <h3>{size.name}</h3>
                            <div style={{ color: 'var(--primary-maroon)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>
                                {size.capacity}
                            </div>
                            <p>{size.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section" style={{ background: 'var(--cream)' }}>
                <div className="container">
                    <div className="section-title">
                        <span className="section-subtitle">Tray Menu Options</span>
                        <h2>Included Delicacies</h2>
                        <p>Each tray package is carefully curated with our signature dishes</p>
                    </div>

                    {menuOptions.map((opt, idx) => (
                        <div key={idx} style={{ marginBottom: '4rem' }}>
                            <h3 style={{ borderBottom: '2px solid var(--accent-gold)', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '2rem', color: 'var(--primary-maroon)' }}>
                                {opt.category}
                            </h3>
                            <div className="product-grid">
                                {opt.items.map((item, i) => (
                                    <div key={i} className="product-card">
                                        <div className="product-image">
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">{item.name}</h4>
                                            <p className="product-description">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: '5rem', background: 'var(--primary-maroon)', padding: '4rem 2rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '1px solid rgba(212,175,55,0.2)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span className="section-subtitle" style={{ color: '#D4AF37' }}>Get a Custom Quote</span>
                            <h2 style={{ color: '#ffffff', fontFamily: "'Playfair Display', serif" }}>Tray Order Enquiry</h2>
                        </div>
                        <WhatsAppEnquiryForm type="Tray Order Enquiry" dark={true} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrayOrdersPage;
