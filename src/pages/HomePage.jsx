import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

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
    const [loading, setLoading] = useState(true);

    // Fetch menu items for dynamic content
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/menu');
                if (response.ok) {
                    const data = await response.json();
                    setMenuItems(data);
                }
            } catch (error) {
                console.error('Failed to fetch items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    // Auto slide reviews
    useEffect(() => {
        const timer = setInterval(() => {
            setReviewSlide((prev) => (prev + 1) % realReviews.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

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
        { value: 99, suffix: '%', label: 'Quality Score' },
        { value: 3, suffix: '+ Years', label: 'Of Excellence' },
        { value: 120, suffix: '+', label: 'Menu Items' },
    ];

    const realReviews = [
        {
            name: 'Shilpi P.',
            source: 'Google Review',
            text: '5 stars! The weather was perfect—snowy, cold, and damp, which made the authentic, fresh flavors and spices at Chatpati Delhi taste even better. It was a perfect flavor tango. We loved the Raj Kachori, Chicken Kheema with Roomali Roti, and the Chole Bhature. Highly recommend!',
            rating: 5
        },
        {
            name: 'Malou C.',
            source: 'Google Review',
            text: 'Boy, was the food worth the wait. Dishes came out fast and everything we tried had great balance of sour, sweet, spice and freshness. Most striking was the customer service. Crew was attentive, engaging with us... this place is now our default for Indian food. 11/10 would recommend!',
            rating: 5
        },
        {
            name: 'Rohith K.',
            source: 'Google Review',
            text: "Want to say it's hard to find a fault with this restaurant. Everything is so damn good! Outside definitely ask the waiters for their recommendations as all of them are spot on. And the service is super fast too even if it's full!",
            rating: 5
        },
        {
            name: 'Jasmeet J.',
            source: 'Google Review',
            text: 'Dined in with a big group of 10. All of the items were super delicious and flavorful. Pani puri and chat papri were great! Also they have a great selection of mithai. thali comes with one dessert. Highly recommended!',
            rating: 5
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section — Premium Split Layout */}
            <section className="hero-section">
                {/* Background images with Ken Burns effect */}
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-bg-layer ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url('${slide.img}')`,
                        }}
                    />
                ))}

                {/* Dark cinematic overlay */}
                <div className="hero-overlay" />

                {/* Content */}
                <div className="hero-inner container">
                    {/* LEFT: Text content */}
                    <div className="hero-text-col">
                        {/* Slide tag / pill */}
                        <div className="hero-tag">
                            {heroSlides[currentSlide].tag}
                        </div>

                        <h1 className="hero-heading">
                            <span className="hero-heading-main">{heroSlides[currentSlide].title}</span>
                            <br />
                            <span className="hero-heading-accent">{heroSlides[currentSlide].titleAccent}</span>
                        </h1>

                        <p className="hero-desc">{heroSlides[currentSlide].subtitle}</p>

                        {/* Social proof row */}
                        <div className="hero-social-proof">
                            <div className="hero-stars">⭐⭐⭐⭐⭐ <span>5.0 on Google</span></div>
                            <div className="hero-divider-dot" />
                            <div className="hero-review-count">5,000+ Happy Customers</div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="hero-cta-row">
                            <Link to="/menu" className="hero-btn-primary">
                                <span>Explore Menu</span>
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>
                            <Link to="/contact" className="hero-btn-ghost">Book a Table</Link>
                        </div>

                        {/* Slide progress dots */}
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

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-value">
                                    <Counter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Signature Dishes Section */}
            <section id="signature" className="section signature-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Chef's Signature Selection</h2>
                        <p>Our most celebrated dishes, perfected over generations in the heart of Delhi.</p>
                    </div>

                    <div className="signature-grid">
                        <div className="sig-card">
                            <div className="sig-image">
                                <img src="/images/Snacks/Chole Bhature.png" alt="Chole Bhature" />
                                <div className="sig-badge">NYT Top 50</div>
                            </div>
                            <div className="sig-info">
                                <h3>Famous Chole Bhature</h3>
                                <p>Our award-winning fluffy bhaturas served with spicy, dark chana masala. A New York Times favorite.</p>
                                <Link to="/menu" className="sig-link">View Details →</Link>
                            </div>
                        </div>

                        <div className="sig-card">
                            <div className="sig-image">
                                <img src="/images/Raj Kachori.png" alt="Raj Kachori" />
                                <div className="sig-badge">House Special</div>
                            </div>
                            <div className="sig-info">
                                <h3>Royal Raj Kachori</h3>
                                <p>The king of chaats. A crispy large kachori bowl filled with sprouts, potatoes, chutneys, and chilled yogurt.</p>
                                <Link to="/menu" className="sig-link">View Details →</Link>
                            </div>
                        </div>

                        <div className="sig-card">
                            <div className="sig-image">
                                <img src="/images/Biriyani/Purani Delhi Chicken Biryani.png" alt="Biryani" />
                                <div className="sig-badge">Trending</div>
                            </div>
                            <div className="sig-info">
                                <h3>Purani Delhi Biryani</h3>
                                <p>Authentic slow-cooked chicken biryani with aromatic long-grain basmati and secret Delhi spices.</p>
                                <Link to="/menu" className="sig-link">View Details →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

            {/* Catering Teaser Section */}
            <section className="section catering-teaser-section">
                <div className="container">
                    <div className="catering-box">
                        <div className="catering-content">
                            <span className="section-subtitle">Host Your Event With Us</span>
                            <h2>Premium Catering Services</h2>
                            <p>From corporate lunches to grand weddings, let Chatpati Delhi bring the magic of Delhi street food to your special occasion. We offer customized menus and professional service nationwide.</p>
                            <div className="catering-features">
                                <span>✔ Live Food Stalls</span>
                                <span>✔ Bulk Sweet Orders</span>
                                <span>✔ Custom Menus</span>
                            </div>
                            <Link to="/contact" className="btn btn-primary">Enquire Now</Link>
                        </div>
                        <div className="catering-image-grid">
                            <div className="cat-img cat-img-1"></div>
                            <div className="cat-img cat-img-2"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Slideshow */}
            <section className="section reviews-slider-section">
                <div className="container">
                    <div className="section-title">
                        <span className="section-subtitle">A Customer Favorite</span>
                        <h2>What Our Guests Are Saying</h2>
                    </div>

                    <div className="review-slider-wrapper">
                        <div className="review-slides-container">
                            {realReviews.map((review, index) => (
                                <div
                                    key={index}
                                    className={`review-slide-item ${index === reviewSlide ? 'active' : ''}`}
                                >
                                    <div className="review-card-content">
                                        <div className="review-brand-logo">
                                            <img src="/images/logo.png" alt="Chatpati Delhi" />
                                            <span>Customer Review</span>
                                        </div>
                                        <div className="review-stars">{'⭐'.repeat(review.rating)}</div>
                                        <p className="review-text">"{review.text}"</p>
                                        <div className="review-author">
                                            <div className="author-init">{review.name.charAt(0)}</div>
                                            <div className="author-info">
                                                <h4>{review.name}</h4>
                                                <p>{review.source}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="review-slider-dots">
                            {realReviews.map((_, index) => (
                                <button
                                    key={index}
                                    className={`review-dot ${index === reviewSlide ? 'active' : ''}`}
                                    onClick={() => setReviewSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
