import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { addToCart } from './utils/cart'
import { menuItems as localMenuItems } from './data/menuData'
import { richProductData } from './ProductDetail'
import { useMenu } from './context/MenuContext'

function App() {
    const [scrolled, setScrolled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
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
        { id: 'chaat', name: 'Chaat', icon: '🥗' },
        { id: 'mumbai', name: 'Mumbai Local', icon: '🚂' },
        { id: 'snacks', name: 'Snacks', icon: '🍢' },
        { id: 'tandoor', name: 'Tandoor', icon: '🔥' },
        { id: 'sizzling', name: 'Sizzling', icon: '🍳' },
        { id: 'biryani', name: 'Biryani', icon: '🍛' },
        { id: 'thali', name: 'Thalis', icon: '🍱' },
        { id: 'curry', name: 'Curry', icon: '🍲' },
        { id: 'bread', name: 'Bread', icon: '🥖' },
        { id: 'parantha', name: 'Paranthas', icon: '🫓' },
        { id: 'rolls', name: 'Rolls', icon: '🌯' },
        { id: 'sweets', name: 'Sweets', icon: '🍮' },
        { id: 'drinks', name: 'Drinks', icon: '🥤' },
    ];

    const { menuItems, loading } = useMenu();

    const filteredItems = selectedCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);



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
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <nav className="nav">
                        <div className="logo-container">
                            <img
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='95' fill='%23D4AF37'/%3E%3Ccircle cx='100' cy='100' r='85' fill='white'/%3E%3Ccircle cx='100' cy='100' r='75' fill='%23D4AF37'/%3E%3Ctext x='100' y='95' text-anchor='middle' fill='white' font-size='40' font-weight='bold' font-family='Arial'%3ECPD%3C/text%3E%3Ctext x='100' y='50' text-anchor='middle' fill='%23D4AF37' font-size='16' font-family='Arial'%3ECHATPATI DELHI%3C/text%3E%3Ctext x='100' y='160' text-anchor='middle' fill='%23D4AF37' font-size='12' font-family='Arial'%3EFOOD SERVED WITH LOVE%3C/text%3E%3C/svg%3E"
                                alt="Chatpati Delhi Logo"
                                className="logo"
                            />
                            <div className="brand-text">
                                <h1>Chatpati Delhi</h1>
                                <p>Food Served With Love</p>
                            </div>
                        </div>
                        <ul className="nav-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#menu">Menu</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                        <button className="mobile-menu-btn">☰</button>
                    </nav>
                </div>
            </header>

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

                    {/* Category Filters */}
                    <div className="category-filters">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                <span className="category-icon">{cat.icon}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    <div className="product-grid">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="product-card">
                                {item.hot && <span className="badge-hot">Hot</span>}
                                <div className="product-image">
                                    {typeof item.image === 'string' && (item.image.trim().startsWith('/') || item.image.trim().startsWith('http') || item.image.trim().startsWith('data:')) ? (
                                        <img src={item.image.trim()} alt={item.name} onError={(e) => { e.target.style.display = 'none'; if(e.target.nextSibling) e.target.nextSibling.style.display = 'inline'; }} />
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
                                Chatpati Delhi was born from a simple idea — bringing the true taste of Delhi street food to your table.
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
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>Chatpati Delhi</h3>
                            <p>Authentic Delhi street food served with love. Experience the vibrant flavors of India.</p>
                            <div className="social-links">
                                <a href="#" className="social-link">📘</a>
                                <a href="#" className="social-link">📷</a>
                                <a href="#" className="social-link">🐦</a>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h3>Quick Links</h3>
                            <a href="#home">Home</a>
                            <a href="#menu">Menu</a>
                            <a href="#about">About Us</a>
                            <a href="#contact">Contact</a>
                        </div>
                        <div className="footer-section">
                            <h3>Hours</h3>
                            <p>Monday - Friday<br />11:00 AM - 10:00 PM</p>
                            <p>Saturday - Sunday<br />10:00 AM - 11:00 PM</p>
                        </div>
                        <div className="footer-section">
                            <h3>Contact</h3>
                            <p>📍 3201 NJ-27, Franklin Park,<br />NJ 08823</p>
                            <p>📞 +1 (732) 499-9387</p>
                            <p>📧 info@chatpatidelhi.com</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 Chatpati Delhi. All rights reserved. Food Served With Love ❤️</p>
                    </div>
                </div>
            </footer>

            {/* Product Detail Modal */}
            {showModal && selectedProduct && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleCloseModal}>×</button>

                        <div className="modal-body">
                            <div className="modal-image">
                                {typeof selectedProduct.image === 'string' && (selectedProduct.image.trim().startsWith('/') || selectedProduct.image.trim().startsWith('http') || selectedProduct.image.trim().startsWith('data:')) ? (
                                    <img src={selectedProduct.image.trim()} alt={selectedProduct.name} onError={(e) => { e.target.style.display = 'none'; if(e.target.nextSibling) e.target.nextSibling.style.display = 'inline'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span className="modal-emoji">{selectedProduct.image ? selectedProduct.image.trim() : '🥘'}</span>
                                )}
                                <span className="modal-emoji fallback-emoji" style={{ display: 'none' }}>🥘</span>
                            </div>

                            <div className="modal-details">
                                <a href="#menu" className="back-link" onClick={handleCloseModal}>← Back to Products</a>
                                <h2 className="modal-title">{selectedProduct.name}</h2>

                                <div className="modal-section">
                                    <h3>Description</h3>
                                    <div dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></div>
                                </div>

                                {(() => {
                                    const richInfo = richProductData.find(p => p.id === Number(selectedProduct.id));
                                    if (richInfo && richInfo.fullDescription) {
                                        return (
                                            <div className="modal-section" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)', marginTop: '1.5rem', paddingTop: '1.5rem' }}>
                                                <h3>Detailed Explanation</h3>
                                                <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>{richInfo.fullDescription}</p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="modal-section">
                                            <h3>Details</h3>
                                            <p>Authentic Delhi-style {selectedProduct.name.toLowerCase()} prepared with traditional recipes and fresh ingredients. Perfect for food lovers who appreciate genuine flavors.</p>
                                        </div>
                                    );
                                })()}

                                <div className="modal-info-box">
                                    <div className="info-row">
                                        <span className="info-label">Category:</span>
                                        <span className="info-value">{selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Availability:</span>
                                        <span className="info-value availability-badge">In Stock</span>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <div className="modal-price">{selectedProduct.price}</div>
                                    <button className="btn-add-to-cart">🛒 Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
