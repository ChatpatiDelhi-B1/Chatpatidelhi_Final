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
