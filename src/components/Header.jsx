import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCartCount } from '../utils/cart';
import CartPanel from './CartPanel';
import '../index.css';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // initialize cart count
        setCartCount(getCartCount());

        const handleCartUpdate = (e) => {
            setCartCount((e && e.detail && typeof e.detail.count === 'number') ? e.detail.count : getCartCount());
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const [cartOpen, setCartOpen] = useState(false);

    return (
        <>
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <nav className="nav">
                        <div className="logo-container">
                            <Link to="/" className="logo-link">
                                <img
                                    src="/images/logo.png"
                                    alt="Chatpati Delhi Logo"
                                    className="logo"
                                />
                                <div className="brand-text">
                                    <h1>Chatpati Delhi</h1>
                                    <p>Food Served With Love</p>
                                </div>
                            </Link>
                        </div>
                        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
                            <li><NavLink to="/" onClick={() => setMobileOpen(false)} end>Home</NavLink></li>
                            <li><NavLink to="/menu" onClick={() => setMobileOpen(false)}>Menu</NavLink></li>
                            <li><NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink></li>
                            <li><NavLink to="/articles" onClick={() => setMobileOpen(false)}>Articles</NavLink></li>
                            <li><NavLink to="/certificates" onClick={() => setMobileOpen(false)}>Certificates</NavLink></li>
                            <li className="dropdown-container">
                                <NavLink to="/catering" onClick={() => setMobileOpen(false)}>
                                    Caterings <span className="arrow-icon">▼</span>
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/sweet-box" onClick={() => setMobileOpen(false)}>Sweet Box</NavLink></li>
                                    <li><NavLink to="/live-stations" onClick={() => setMobileOpen(false)}>Live Stations</NavLink></li>
                                    <li><NavLink to="/tray-orders" onClick={() => setMobileOpen(false)}>Tray Orders</NavLink></li>
                                </ul>
                            </li>
                            <li><NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink></li>
                        </ul>
                        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <a 
                                href="https://www.clover.com/online-ordering/chatpati-delhi-reston" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="order-online-btn"
                                style={{
                                    background: 'var(--accent-gold)',
                                    color: 'var(--primary-maroon)',
                                    padding: '8px 16px',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                                }}
                            >
                                🛵 Order Online
                            </a>
                            <button
                                className="cart-btn"
                                onClick={() => setCartOpen(true)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    padding: '5px'
                                }}
                            >
                                🛒
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        background: 'var(--accent-gold)',
                                        color: 'var(--primary-maroon)',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <button
                                className="mobile-menu-btn"
                                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileOpen}
                                onClick={() => setMobileOpen((v) => !v)}
                            >
                                {mobileOpen ? '✕' : '☰'}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}

export default Header;
