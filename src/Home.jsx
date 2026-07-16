import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'
import { addToCart } from './utils/cart'
import { menuItems } from './data/menuData'

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
                                <a 
                                    href="https://www.clover.com/online-ordering/chatpati-delhi-reston" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-secondary"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid var(--accent-gold)',
                                        color: 'var(--accent-gold)'
                                    }}
                                >
                                    🛵 Delivery & Pickup
                                </a>
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
                                const itemCat = item.category === 'sizzling' ? 'tandoor' : item.category;
                                const matchesCategory = itemCat === cat.id;
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
                                                <div className={isVeg(item) ? "veg-symbol" : "non-veg-symbol"}></div>
                                                <div className="product-image">
                                                    {item.image && typeof item.image === 'string' && (item.image.trim().startsWith('/') || item.image.trim().startsWith('http') || item.image.trim().startsWith('data:')) ? (
                                                        <img src={item.image.trim()} alt={item.name} onError={(e) => { e.target.style.display = 'none'; if(e.target.nextSibling) e.target.nextSibling.style.display = 'inline'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <span className="product-emoji">{item.image ? item.image.trim() : '🥘'}</span>
                                                    )}
                                                    <span className="product-emoji fallback-emoji" style={{ display: 'none' }}>🥘</span>
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
