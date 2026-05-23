import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Original styles for the hero section
import './Royal.css'; // Import the new royal styling

// Counter Component for animated numbers
function Counter({ end, suffix = "", duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
}

function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [reviewSlide, setReviewSlide] = useState(0);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('/api/menu');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) setMenuItems(data);
                }
            } catch (error) {
                console.warn('Backend not running on Home, using fallback details:', error.message);
            }
        };
        fetchMenuItems();
    }, []);

    // Find the signature items from the fetched menu items or use hardcoded fallbacks
    const getSignatureItem = (id, fallbackName, fallbackPrice, fallbackImg, fallbackDesc) => {
        const dbItem = menuItems.find(item => {
            return item.id === id || item.name.toLowerCase().includes(fallbackName.toLowerCase());
        });

        if (dbItem) {
            return {
                id: dbItem.id,
                name: dbItem.name,
                price: dbItem.price,
                image: dbItem.image,
                description: dbItem.description,
                veg: dbItem.veg !== undefined ? (dbItem.veg === true || dbItem.veg === 'true' || dbItem.veg === 1 || dbItem.veg === '1') : true,
                hot: dbItem.hot === true || dbItem.hot === 'true' || dbItem.hot === 1
            };
        }

        return {
            id: id,
            name: fallbackName,
            price: fallbackPrice,
            image: fallbackImg,
            description: fallbackDesc,
            veg: true,
            hot: true
        };
    };

    const choleBhature = getSignatureItem(30, "Chole Bhature", "$12.95", "/images/Snacks/Chole Bhature.png", "Spicy, flavorful chickpea curry served with two oversized, fluffy deep-fried leavened breads.");
    const rajKachori = getSignatureItem(10, "Raj Kachori", "$9.95", "/images/Raj Kachori.png", "The ultimate 'King of Chaat'—a large, crispy shell overflowing with a royal medley of potatoes, sprouts, chutneys, and yogurt.");
    const vadaPav = getSignatureItem(20, "Vada Pav", "$9.95", "/images/Mumbai Local/Karjat Vada Pav.png", "Bite into the heart of Mumbai with our authentic Karjat Vada Pav. Sandwiched inside a soft pav bun.");


    const heroSlides = [
        {
            tag: "🏆 Award Winning",
            title: "Authentic",
            titleAccent: "Delhi Street Food",
            subtitle: "Experience the vibrant flavors of Delhi's finest chaats and traditional dishes, crafted with passion.",
            img: "/images/hero-1.png",
            highlight: "Chole Bhature",
            highlightImg: "/images/Snacks/Chole Bhature.png"
        },
        {
            tag: "❤️ Served With Love",
            title: "Every Bite,",
            titleAccent: "A Delhi Story",
            subtitle: "Every dish prepared with care and passion by our expert chefs, keeping alive the tradition.",
            img: "/images/hero-2.png",
            highlight: "Raj Kachori",
            highlightImg: "/images/Raj Kachori.png"
        },
        {
            tag: "✨ 120+ Menu Items",
            title: "Taste the",
            titleAccent: "Magic of Delhi",
            subtitle: "From traditional chaats to royal thalis — over 120 authentic items to satisfy every craving.",
            img: "/images/hero-3.png",
            highlight: "Purani Delhi Biryani",
            highlightImg: "/images/Biriyani/Purani Delhi Chicken Biryani.png"
        }
    ];

    const stats = [
        { value: 5000, suffix: '+', label: 'Happy Customers' },
        { value: 120, suffix: '+', label: 'Royal Dishes' },
        { value: 5, suffix: '.0', label: 'Google Rating' },
        { value: 10, suffix: '+', label: 'Years of Legacy' },
    ];

    const realReviews = [
        {
            name: 'Shilpi P.',
            source: 'Google Review',
            text: '5 stars! The weather was perfect—snowy, cold, and damp, which made the authentic, fresh flavors and spices at Chatpati Delhi taste even better. It was a perfect flavor tango. Highly recommend!',
            rating: 5
        },
        {
            name: 'Malou C.',
            source: 'Google Review',
            text: 'Boy, was the food worth the wait. Dishes came out fast and everything we tried had great balance of sour, sweet, spice and freshness. Most striking was the customer service. 11/10 would recommend!',
            rating: 5
        },
        {
            name: 'Rohith K.',
            source: 'Google Review',
            text: "Want to say it's hard to find a fault with this restaurant. Everything is so damn good! Outside definitely ask the waiters for their recommendations as all of them are spot on.",
            rating: 5
        }
    ];

    // Auto slide hero
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    // Auto slide reviews
    useEffect(() => {
        const timer = setInterval(() => {
            setReviewSlide((prev) => (prev + 1) % realReviews.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [realReviews.length]);

    return (
        <div className="royal-page">
            
            {/* --- HERO SECTION (Original Split Layout) --- */}
            <section className="hero-section">
                {/* Background images with Ken Burns effect */}
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-bg-layer ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url('${slide.img}')` }}
                    />
                ))}

                {/* Dark cinematic overlay */}
                <div className="hero-overlay" />

                {/* Content */}
                <div className="hero-inner container">
                    {/* LEFT: Text content */}
                    <div className="hero-text-col">
                        <div className="hero-tag">
                            {heroSlides[currentSlide].tag}
                        </div>

                        <h1 className="hero-heading">
                            <span className="hero-heading-main">{heroSlides[currentSlide].title}</span>
                            <br />
                            <span className="hero-heading-accent">{heroSlides[currentSlide].titleAccent}</span>
                        </h1>

                        <p className="hero-desc">{heroSlides[currentSlide].subtitle}</p>

                        <div className="hero-social-proof">
                            <div className="hero-stars">⭐⭐⭐⭐⭐ <span>5.0 on Google</span></div>
                            <div className="hero-divider-dot" />
                            <div className="hero-review-count">5,000+ Happy Customers</div>
                        </div>

                        <div className="hero-cta-row">
                            <Link to="/menu" className="hero-btn-primary">
                                <span>Explore Menu</span>
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>
                            <a href="https://www.clover.com/online-ordering/chatpati-delhi-reston" target="_blank" rel="noopener noreferrer" className="hero-btn-ghost" style={{display:'none'}}></a>
                        </div>

                        <div className="hero-dots">
                            {heroSlides.map((_, i) => (
                                <button
                                    key={i}
                                    className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Floating food card */}
                    <div className="hero-visual-col">
                        <div className="hero-food-card">
                            <div className="hero-food-card-img">
                                <img
                                    src={heroSlides[currentSlide].highlightImg}
                                    alt={heroSlides[currentSlide].highlight}
                                />
                            </div>
                            <div className="hero-food-card-info">
                                <span className="hero-food-card-label">Today's Special</span>
                                <h3 className="hero-food-card-name">{heroSlides[currentSlide].highlight}</h3>
                                <Link to="/menu" className="hero-food-card-cta">Order Now →</Link>
                            </div>
                        </div>

                        {/* Floating badges */}
                        <div className="hero-badge hero-badge-nyt">
                            <span className="badge-emoji">🏆</span>
                            <div>
                                <div className="badge-title">NYT Top 50</div>
                                <div className="badge-sub">Best Indian Restaurant</div>
                            </div>
                        </div>

                        <div className="hero-badge hero-badge-rating">
                            <span className="badge-emoji">⭐</span>
                            <div>
                                <div className="badge-title">5.0 Rating</div>
                                <div className="badge-sub">Google Reviews</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="hero-scroll-indicator">
                    <span>Scroll to explore</span>
                    <div className="scroll-mouse"><div className="scroll-wheel" /></div>
                </div>
            </section>

            {/* --- ROYAL STATS --- */}
            <section className="royal-section" style={{ padding: '2.5rem 1rem', background: '#080503', borderTop: '1px solid rgba(212, 175, 55, 0.1)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                <div className="royal-stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="royal-stat-card">
                            <div className="royal-stat-value">
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="royal-stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- HERITAGE / ABOUT SECTION --- */}
            <section className="royal-section">
                <div className="royal-about">
                    <div className="royal-about-img-wrapper">
                        <img src="/images/hero-1.png" alt="Royal Cooking" className="royal-about-img" />
                    </div>
                    <div className="royal-about-text">
                        <div className="royal-title-container" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                            <span className="royal-subtitle">Our Heritage</span>
                            <h2 className="royal-title">The Culinary Legacy</h2>
                            <div className="royal-title-divider" style={{ justifyContent: 'flex-start' }}>
                                <span>✦</span>
                            </div>
                        </div>
                        <p>
                            At Chatpati Delhi, we believe that food is not just a meal, but a grand celebration of culture, history, and royal traditions. Rooted in the bustling streets and majestic palaces of Old Delhi, our recipes have been passed down through generations.
                        </p>
                        <p>
                            We meticulously source the finest spices and ingredients, ensuring that every dish we serve is a masterpiece of flavor, crafted with unwavering dedication and passion.
                        </p>
                        <div className="royal-signature">Chatpati Delhi</div>
                    </div>
                </div>
            </section>

            {/* --- ROYAL FEATURES --- */}
            <section className="royal-section" style={{ background: 'linear-gradient(to bottom, #0b0705, #140d0a)' }}>
                <div className="royal-title-container">
                    <span className="royal-subtitle">The Royal Standard</span>
                    <h2 className="royal-title">Why Choose Us</h2>
                    <div className="royal-title-divider">
                        <span>✦</span>
                    </div>
                </div>
                <div className="royal-features">
                    <div className="royal-feature-card">
                        <span className="royal-feature-icon">👑</span>
                        <h3 className="royal-feature-title">Premium Ingredients</h3>
                        <p className="royal-feature-desc">We use only the finest, hand-picked ingredients and exotic spices to ensure an unparalleled dining experience.</p>
                    </div>
                    <div className="royal-feature-card">
                        <span className="royal-feature-icon">✨</span>
                        <h3 className="royal-feature-title">Authentic Recipes</h3>
                        <p className="royal-feature-desc">Our recipes are closely guarded secrets, preserving the true essence and authenticity of Delhi's royal kitchens.</p>
                    </div>
                    <div className="royal-feature-card">
                        <span className="royal-feature-icon">🥂</span>
                        <h3 className="royal-feature-title">Elegant Ambiance</h3>
                        <p className="royal-feature-desc">Experience a sophisticated atmosphere where impeccable service meets a warm, welcoming environment.</p>
                    </div>
                </div>
            </section>

            {/* --- SIGNATURE DISHES --- */}
            <section className="royal-section">
                <div className="royal-title-container">
                    <span className="royal-subtitle">Chef's Masterpieces</span>
                    <h2 className="royal-title">Signature Delicacies</h2>
                    <div className="royal-title-divider">
                        <span>✦</span>
                    </div>
                </div>
                <div className="royal-product-grid">
                    {/* Royal Chole Bhature */}
                    <div className="royal-product-card">
                        <div style={{position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '5px', zIndex: 2}}>
                            {choleBhature.hot && <span className="royal-badge-hot" style={{position: 'relative', top: 0, left: 0}}>Hot</span>}
                        </div>
                        <div className={`royal-diet-symbol ${choleBhature.veg ? "veg" : "non-veg"}`}></div>
                        
                        <div className="royal-product-img-wrapper">
                            {choleBhature.image && typeof choleBhature.image === 'string' && (choleBhature.image.startsWith('/') || choleBhature.image.startsWith('http') || choleBhature.image.startsWith('data:')) ? (
                                <img src={choleBhature.image} alt={choleBhature.name} />
                            ) : (
                                <span className="royal-product-emoji">{choleBhature.image || '🥘'}</span>
                            )}
                        </div>
                        
                        <div className="royal-product-info">
                            <h3 className="royal-product-title">{choleBhature.name}</h3>
                            <p className="royal-product-desc" dangerouslySetInnerHTML={{ __html: choleBhature.description }}></p>
                            <div className="royal-product-footer">
                                <span className="royal-product-price">{choleBhature.price}</span>
                                <Link to={`/product/${choleBhature.id}`} className="royal-product-btn">
                                    Discover
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Majestic Raj Kachori */}
                    <div className="royal-product-card">
                        <div style={{position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '5px', zIndex: 2}}>
                            {rajKachori.hot && <span className="royal-badge-hot" style={{position: 'relative', top: 0, left: 0}}>Hot</span>}
                        </div>
                        <div className={`royal-diet-symbol ${rajKachori.veg ? "veg" : "non-veg"}`}></div>
                        
                        <div className="royal-product-img-wrapper">
                            {rajKachori.image && typeof rajKachori.image === 'string' && (rajKachori.image.startsWith('/') || rajKachori.image.startsWith('http') || rajKachori.image.startsWith('data:')) ? (
                                <img src={rajKachori.image} alt={rajKachori.name} />
                            ) : (
                                <span className="royal-product-emoji">{rajKachori.image || '🥘'}</span>
                            )}
                        </div>
                        
                        <div className="royal-product-info">
                            <h3 className="royal-product-title">{rajKachori.name}</h3>
                            <p className="royal-product-desc" dangerouslySetInnerHTML={{ __html: rajKachori.description }}></p>
                            <div className="royal-product-footer">
                                <span className="royal-product-price">{rajKachori.price}</span>
                                <Link to={`/product/${rajKachori.id}`} className="royal-product-btn">
                                    Discover
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Karjat Vada Pav */}
                    <div className="royal-product-card">
                        <div style={{position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '5px', zIndex: 2}}>
                            {vadaPav.hot && <span className="royal-badge-hot" style={{position: 'relative', top: 0, left: 0}}>Hot</span>}
                        </div>
                        <div className={`royal-diet-symbol ${vadaPav.veg ? "veg" : "non-veg"}`}></div>
                        
                        <div className="royal-product-img-wrapper">
                            {vadaPav.image && typeof vadaPav.image === 'string' && (vadaPav.image.startsWith('/') || vadaPav.image.startsWith('http') || vadaPav.image.startsWith('data:')) ? (
                                <img src={vadaPav.image} alt={vadaPav.name} />
                            ) : (
                                <span className="royal-product-emoji">{vadaPav.image || '🥘'}</span>
                            )}
                        </div>
                        
                        <div className="royal-product-info">
                            <h3 className="royal-product-title">{vadaPav.name}</h3>
                            <p className="royal-product-desc" dangerouslySetInnerHTML={{ __html: vadaPav.description }}></p>
                            <div className="royal-product-footer">
                                <span className="royal-product-price">{vadaPav.price}</span>
                                <Link to={`/product/${vadaPav.id}`} className="royal-product-btn">
                                    Discover
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Link to="/menu" className="royal-btn royal-btn-outline">View Full Menu</Link>
                </div>
            </section>

            {/* --- MENU CATEGORIES --- */}
            <section className="royal-section" style={{ background: 'linear-gradient(to bottom, #0b0705, #110a07)' }}>
                <div className="royal-title-container">
                    <span className="royal-subtitle">Something For Everyone</span>
                    <h2 className="royal-title">Explore Our Menu</h2>
                    <div className="royal-title-divider"><span>✦</span></div>
                </div>

                <div className="menu-categories-grid">
                    {[
                        { name: 'Chatpati Chaat', items: '15+ Items', img: '/images/chats/Golgappe.png', tag: '🥗', desc: 'Golgappe, Bhalle, Tikki & more' },
                        { name: 'Biryani Ki Kahani', items: '3 Varieties', img: '/images/Biriyani/Purani Delhi Chicken Biryani.png', tag: '🍛', desc: 'Veg, Chicken & Goat Biryani' },
                        { name: 'Mumbai Local', items: '9 Items', img: '/images/Kadak Pav Bhaji.png', tag: '🚂', desc: 'Vada Pav, Pav Bhaji & more' },
                        { name: 'Roll Baby Roll', items: '6 Rolls', img: '/images/Rolls/Tawa Paneer Roll.png', tag: '🌯', desc: 'Paneer, Chicken, Egg Rolls' },
                        { name: 'Meethe Me', items: '8 Sweets', img: '/images/Sweets/Gulab Jamun.png', tag: '🍮', desc: 'Kulfi, Rasmalai, Gulab Jamun' },
                        { name: 'Snacks Ka Chaska', items: '7 Items', img: '/images/Snacks/Chole Bhature.png', tag: '🍢', desc: 'Chole Bhature, Pakode & more' },
                    ].map((cat, i) => (
                        <Link to="/menu" key={i} className="menu-category-card">
                            <div className="menu-cat-img-wrap">
                                <img src={cat.img} alt={cat.name} />
                                <span className="menu-cat-badge">{cat.items}</span>
                            </div>
                            <div className="menu-cat-content">
                                <span className="menu-cat-emoji">{cat.tag}</span>
                                <h3 className="menu-cat-name">{cat.name}</h3>
                                <p className="menu-cat-desc">{cat.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/menu" className="royal-btn royal-btn-outline">View Full Menu →</Link>
                </div>
            </section>

            {/* --- POPULAR PICKS --- */}
            <section className="royal-section" style={{ background: '#080503', padding: '5rem 1.5rem' }}>
                <div className="royal-title-container">
                    <span className="royal-subtitle">Customer Favourites</span>
                    <h2 className="royal-title">Popular Picks</h2>
                    <div className="royal-title-divider"><span>✦</span></div>
                </div>

                <div className="popular-picks-strip">
                    {[
                        { name: 'Golgappe (12 Pcs)', price: '$13.95', img: '/images/chats/Golgappe.png', tag: '🔥 Bestseller' },
                        { name: 'Raj Kachori', price: '$9.95', img: '/images/Raj Kachori.png', tag: "👑 Chef's Pick" },
                        { name: 'Chicken Biryani', price: '$16.95', img: '/images/Biriyani/Purani Delhi Chicken Biryani.png', tag: '🔥 Bestseller' },
                        { name: 'Chole Bhature', price: '$12.95', img: '/images/Snacks/Chole Bhature.png', tag: '❤️ Fan Fav' },
                        { name: 'Chandni Chowk Ke Bhalle', price: '$8.95', img: '/images/Chandni Chowk Ke Bhalle.png', tag: '✨ Must Try' },
                        { name: 'Kadak Pav Bhaji', price: '$11.95', img: '/images/Kadak Pav Bhaji.png', tag: '🔥 Spicy Hit' },
                        { name: 'Kulfi Falooda', price: '$6.95', img: '/images/Kulfi Falooda.png', tag: '🍨 Sweet Hit' },
                        { name: 'Tawa Paneer Roll', price: '$12.95', img: '/images/Rolls/Tawa Paneer Roll.png', tag: '❤️ Fan Fav' },
                    ].map((item, i) => (
                        <Link to="/menu" key={i} className="popular-pick-card">
                            <div className="pick-img-wrap">
                                <img src={item.img} alt={item.name} />
                                <span className="pick-tag">{item.tag}</span>
                            </div>
                            <div className="pick-info">
                                <h4 className="pick-name">{item.name}</h4>
                                <div className="pick-footer">
                                    <span className="pick-price">{item.price}</span>
                                    <span className="pick-order-btn">Order</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="royal-section" style={{ background: 'url("/images/hero-2.png") center/cover fixed' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 7, 5, 0.9)' }} />
                
                <div className="royal-title-container">
                    <span className="royal-subtitle">Words of Praise</span>
                    <h2 className="royal-title">Guest Experiences</h2>
                    <div className="royal-title-divider">
                        <span>✦</span>
                    </div>
                </div>
                
                <div className="royal-reviews">
                    <div className="royal-reviews-container">
                        {realReviews.map((review, index) => (
                            <div 
                                key={index} 
                                className={`royal-review-slide ${index === reviewSlide ? 'active' : ''}`}
                            >
                                <div className="royal-review-card">
                                    <div className="royal-quote-icon">"</div>
                                    <div className="royal-review-stars">
                                        {'★'.repeat(review.rating)}
                                    </div>
                                    <p className="royal-review-text">{review.text}</p>
                                    <div className="royal-review-author-box">
                                        <div className="royal-review-avatar">{review.name.charAt(0)}</div>
                                        <div>
                                            <div className="royal-review-author">{review.name}</div>
                                            <div className="royal-review-source">{review.source}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="royal-review-dots">
                        {realReviews.map((_, i) => (
                            <button
                                key={i}
                                className={`royal-review-dot ${i === reviewSlide ? 'active' : ''}`}
                                onClick={() => setReviewSlide(i)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- VISIT US --- */}
            <section className="royal-section">
                <div className="royal-title-container">
                    <span className="royal-subtitle">Experience The Magic</span>
                    <h2 className="royal-title">Visit Chatpati Delhi</h2>
                    <div className="royal-title-divider">
                        <span>✦</span>
                    </div>
                </div>
                
                <div className="royal-visit-container">
                    <div className="royal-visit-info">
                        <div className="visit-block">
                            <h3 className="visit-title">Location</h3>
                            <p>3201 NJ-27, <br />Franklin Park, NJ 08823</p>
                        </div>
                        <div className="visit-block">
                            <h3 className="visit-title">Opening Hours</h3>
                            <p>
                                <strong>Monday:</strong> Closed<br />
                                <strong>Tue – Thu:</strong> 11:00 AM – 9:30 PM<br />
                                <strong>Fri – Sat:</strong> 11:00 AM – 10:00 PM<br />
                                <strong>Sunday:</strong> 11:00 AM – 9:30 PM
                            </p>
                        </div>
                        <div className="visit-block">
                            <h3 className="visit-title">Contact Us</h3>
                            <p>Phone: <span className="nowrap">+1 (732) 960 1887</span><br />
                            Email: <span className="nowrap">info@chatpatidelhi.com</span></p>
                        </div>
                        <Link to="/contact" className="royal-btn">Get Directions</Link>
                    </div>
                    <div className="royal-visit-map">
                        <div className="map-placeholder">
                            <img src="/images/hero-3.png" alt="Chatpati Delhi Location" />
                            <div className="map-overlay">
                                <span>Find Us on Maps</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default HomePage;

