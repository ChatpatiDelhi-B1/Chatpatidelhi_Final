import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
// Cart removed from header (mobile UX simplified)
import '../index.css';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showNotes, setShowNotes] = useState(false);

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
    }, []);

    // cart removed from header UI

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
                            <li className="mobile-only-link">
                                <button className="nav-notes-btn" onClick={() => { setMobileOpen(false); setShowNotes(true); }}>Notes</button>
                            </li>
                            <li><NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink></li>
                        </ul>
                        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {/* Cart icon removed per request */}
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

            {/* CartPanel intentionally not rendered in header-only UX */}

            {/* Notes Modal */}
            {showNotes && (
                <div className="notes-modal-overlay" onClick={() => setShowNotes(false)}>
                    <div className="notes-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="notes-close-btn" onClick={() => setShowNotes(false)}>✕</button>
                        <div className="notes-modal-header">
                            <h2>Please note that we</h2>
                            <h1 className="notes-highlight">DO NOT ACCEPT</h1>
                            <h2 className="notes-cursive">reservations</h2>
                            <p>and are currently operating on a</p>
                            <h3 className="notes-banner">WALK-IN BASIS ONLY.</h3>
                        </div>
                        
                        <div className="notes-rules">
                            <div className="notes-rule-item">
                                <div className="notes-icon">👥</div>
                                <div className="notes-text">
                                    <p>At this time, we are only able to accommodate</p>
                                    <h4>PARTY OF 5-6 GUESTS,</h4>
                                    <p>subject to availability upon arrival.</p>
                                </div>
                            </div>
                            <div className="notes-rule-item">
                                <div className="notes-icon">⏱️</div>
                                <div className="notes-text">
                                    <p>To ensure a pleasant experience for all of our guests,</p>
                                    <h4 className="notes-banner-small">TABLE OCCUPANCY</h4>
                                    <p>is limited to <strong>1 HOUR.</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="notes-modal-footer">
                            <p>We appreciate your understanding</p>
                            <p>and look forward to</p>
                            <h2 className="notes-cursive">Welcoming You! 💛</h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
