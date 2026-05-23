import React from 'react';
import '../index.css';

const SweetBoxPage = () => {
    return (
        <div className="sweet-box-page">
            {/* Hero Section */}
            <section className="page-hero" style={{ backgroundImage: "url('/images/hero-sweets.png')" }}>
                <div className="container">
                    <h1 className="page-hero-title">Custom Sweet Boxes</h1>
                    <p className="page-hero-subtitle">Handcrafted traditional sweets, packaged with love for your special occasions.</p>
                </div>
            </section>

            {/* Coming Soon Section */}
            <section style={{
                background: 'var(--cream)',
                padding: '8rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
            }}>
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 2rem' }}>
                    {/* Icon */}
                    <div style={{
                        fontSize: '5rem',
                        marginBottom: '1.5rem',
                        animation: 'float 3s ease-in-out infinite',
                    }}>
                        🍬
                    </div>

                    {/* Badge */}
                    <span style={{
                        display: 'inline-block',
                        background: 'var(--accent-gold)',
                        color: 'var(--primary-maroon)',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '0.4rem 1.2rem',
                        borderRadius: '50px',
                        marginBottom: '1.5rem',
                    }}>
                        Coming Soon
                    </span>

                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--primary-maroon)',
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        marginBottom: '1.25rem',
                        lineHeight: '1.2',
                    }}>
                        Something Sweet<br />is on its Way!
                    </h2>

                    <p style={{
                        color: 'var(--gray)',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        marginBottom: '2.5rem',
                    }}>
                        We're crafting the perfect selection of handmade traditional sweets for you.
                        Our custom sweet box builder will be available very soon. Stay tuned!
                    </p>

                    {/* Divider */}
                    <div style={{
                        width: '60px',
                        height: '3px',
                        background: 'var(--accent-gold)',
                        margin: '0 auto 2.5rem',
                        borderRadius: '2px',
                    }} />

                    {/* Notify via WhatsApp */}
                    <a
                        href="https://wa.me/17329601887?text=Hi!%20I%20am%20interested%20in%20your%20Custom%20Sweet%20Boxes.%20Please%20let%20me%20know%20when%20it%20is%20available."
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            background: 'var(--primary-maroon)',
                            color: 'white',
                            padding: '0.85rem 2rem',
                            borderRadius: '50px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            textDecoration: 'none',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                        }}
                    >
                        💬 Get Notified on WhatsApp
                    </a>
                </div>
            </section>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
            `}</style>
        </div>
    );
};

export default SweetBoxPage;
