import { useState } from 'react';
import '../index.css';
import './Royal.css';

function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const waNumber = '14752988707';
        const text = [
            `👋 *New Message from Chatpati Delhi Contact Form*`,
            ``,
            `*Name:* ${formData.name}`,
            formData.email ? `*Email:* ${formData.email}` : null,
            formData.phone ? `*Phone:* ${formData.phone}` : null,
            ``,
            `*Message:*`,
            formData.message,
        ].filter(line => line !== null).join('\n');

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const contactItems = [
        {
            icon: '📞',
            label: 'Call Us',
            value: '+1 (732) 960 1887',
            link: 'tel:+17329601887'
        },
        {
            icon: '📧',
            label: 'Email Us',
            value: 'info@chatpatidelhi.com',
            link: 'mailto:info@chatpatidelhi.com'
        },
        {
            icon: '📍',
            label: 'Find Us',
            value: '3201 NJ-27, Franklin Park, NJ 08823',
            link: 'https://maps.google.com/?q=3201+NJ-27+Franklin+Park+NJ'
        },
        {
            icon: '🕐',
            label: 'Hours',
            value: 'Mon–Sun: 11:30 AM – 10:00 PM',
            link: null
        }
    ];

    return (
        <>
        <div className="royal-menu-wrapper">
            <div className="container">

                {/* Page Header */}
                <div className="royal-title-container" style={{ marginBottom: '4rem' }}>
                    <span className="royal-subtitle">We'd Love to Hear From You</span>
                    <h1 className="royal-title">Get in Touch</h1>
                    <div className="royal-title-divider"><span>✦</span></div>
                </div>

                {/* Main Layout */}
                <div className="royal-contact-layout">

                    {/* Left: Mascot Panel + Contact Info */}
                    <div className="royal-contact-mascot-panel">

                        {/* Mascot */}
                        <div className="royal-mascot-img-wrapper">
                            <img src="/avatar.png" alt="Namaste - We're happy to help" className="royal-mascot-img" />
                        </div>

                        <h3 className="royal-mascot-tagline">Namaste! 🙏</h3>
                        <p className="royal-mascot-subtitle">We'd love to hear from you. Reach out to us anytime!</p>

                        <div className="royal-contact-cards">
                            {contactItems.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.link || undefined}
                                    target={item.link?.startsWith('http') ? '_blank' : undefined}
                                    rel="noreferrer"
                                    className="royal-contact-card"
                                    style={{ textDecoration: 'none', cursor: item.link ? 'pointer' : 'default' }}
                                >
                                    <div className="royal-contact-card-icon">{item.icon}</div>
                                    <div>
                                        <div className="royal-contact-card-label">{item.label}</div>
                                        <div className="royal-contact-card-value">{item.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div style={{ marginTop: '2rem' }}>
                            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.2rem' }}>Follow Us</p>
                            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <a href="#" className="royal-social-pill" title="Facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                                    <span>Facebook</span>
                                </a>
                                <a href="#" className="royal-social-pill" title="Instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    <span>Instagram</span>
                                </a>
                                <a href="#" className="royal-social-pill" title="Twitter">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                    <span>Twitter</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="royal-contact-form-col">
                        <div className="royal-contact-form-card">
                            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                                Send a Message
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                                Fill in the form below and we'll reach you on WhatsApp instantly.
                            </p>

                            {submitted && (
                                <div className="royal-form-success">
                                    ✅ Thank you! We'll get back to you shortly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="royal-form">
                                <div className="royal-form-row">
                                    <div className="royal-form-group">
                                        <label className="royal-form-label">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Rahul Sharma"
                                            className="royal-form-input"
                                            required
                                        />
                                    </div>
                                    <div className="royal-form-group">
                                        <label className="royal-form-label">Email Address <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400, fontSize: '0.8rem' }}>(Optional)</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="royal-form-input"
                                        />
                                    </div>
                                </div>
                                <div className="royal-form-group">
                                    <label className="royal-form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (123) 456 7890"
                                        className="royal-form-input"
                                    />
                                </div>
                                <div className="royal-form-group">
                                    <label className="royal-form-label">Your Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help you..."
                                        className="royal-form-input royal-form-textarea"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="royal-btn-primary" style={{ width: '100%', textAlign: 'center', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.774L0 32l8.448-2.01A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 01-6.772-1.854l-.486-.289-5.013 1.193 1.22-4.882-.317-.5A13.244 13.244 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333z"/><path d="M23.2 19.467c-.378-.189-2.24-1.104-2.587-1.23-.347-.125-.6-.189-.852.19-.252.377-.977 1.23-1.197 1.482-.22.252-.441.284-.819.094-.378-.19-1.597-.588-3.042-1.878-1.124-1.003-1.883-2.24-2.103-2.619-.22-.378-.023-.582.166-.77.17-.17.378-.44.567-.661.189-.22.252-.377.378-.629.126-.252.063-.472-.031-.661-.095-.189-.852-2.054-1.167-2.813-.308-.74-.62-.64-.852-.651l-.725-.013c-.252 0-.661.095-.1.944-.347.284-.1.378.661 1.198.157.219 2.354 3.596 5.706 5.044.797.344 1.42.55 1.904.703.8.254 1.529.218 2.105.132.642-.095 1.977-.808 2.257-1.589.28-.78.28-1.449.196-1.588-.083-.138-.315-.22-.693-.41z"/></svg>
                                    Send on WhatsApp
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Google Maps Embed — Real Location */}
                <div className="royal-map-section">
                    <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#D4AF37',
                        textAlign: 'center',
                        fontSize: '1.8rem',
                        marginBottom: '1.5rem'
                    }}>
                        📍 Find Us Here
                    </h3>
                    <div className="royal-map-embed-wrapper">
                        <iframe
                            title="Chatpati Delhi Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.3055297013437!2d-74.54068322385124!3d40.44618117140474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b265e9d35e6f%3A0x8fccd0fe1db1d1ad!2s3201%20NJ-27%2C%20Franklin%20Park%2C%20NJ%2008823%2C%20USA!5e0!3m2!1sen!2sin!4v1715072000000!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: '16px', display: 'block' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

            </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a
            href="https://wa.me/17329601887"
            target="_blank"
            rel="noreferrer"
            className="royal-whatsapp-float"
            title="Chat on WhatsApp"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="white">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.774L0 32l8.448-2.01A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 01-6.772-1.854l-.486-.289-5.013 1.193 1.22-4.882-.317-.5A13.244 13.244 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333z"/>
                <path d="M23.2 19.467c-.378-.189-2.24-1.104-2.587-1.23-.347-.125-.6-.189-.852.19-.252.377-.977 1.23-1.197 1.482-.22.252-.441.284-.819.094-.378-.19-1.597-.588-3.042-1.878-1.124-1.003-1.883-2.24-2.103-2.619-.22-.378-.023-.582.166-.77.17-.17.378-.44.567-.661.189-.22.252-.377.378-.629.126-.252.063-.472-.031-.661-.095-.189-.852-2.054-1.167-2.813-.308-.74-.62-.64-.852-.651l-.725-.013c-.252 0-.661.095-.1.944-.347.284-.1.378.661 1.198.157.219 2.354 3.596 5.706 5.044.797.344 1.42.55 1.904.703.8.254 1.529.218 2.105.132.642-.095 1.977-.808 2.257-1.589.28-.78.28-1.449.196-1.588-.083-.138-.315-.22-.693-.41z"/>
            </svg>
        </a>
        </>
    );
}

export default ContactPage;
