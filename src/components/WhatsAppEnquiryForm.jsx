import React, { useState } from 'react';

const WhatsAppEnquiryForm = ({ type = 'General Inquiry', dark = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        guests: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const phoneNumber = '17329601887';
        const text = `Namaste Chatpati Delhi! 🙏\n\nI would like to enquire about a *${type}*.\n\n*Details:*\n👤 Name: ${formData.name}\n📅 Date: ${formData.date}\n👥 Guests: ${formData.guests}\n💬 Message: ${formData.message}\n\nThank you!`;
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className={`royal-contact-form-card ${dark ? 'dark-mode' : ''}`} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '2.2rem', marginBottom: '1rem' }}>
                Enquire via WhatsApp
            </h3>
            <p style={{ color: dark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Fill in the details below and we'll chat on WhatsApp instantly!
            </p>

            <form onSubmit={handleSubmit} className="royal-form">
                <div className="royal-form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="royal-form-label" style={{ 
                        color: dark ? '#ffffff' : '#0b0705', 
                        display: 'block', 
                        marginBottom: '0.8rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.95rem',
                        opacity: '1'
                    }}>
                        Your Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="royal-form-input"
                        style={{ 
                            background: dark ? 'rgba(255,255,255,0.15)' : '#fff', 
                            color: dark ? '#fff' : '#000',
                            border: dark ? '2px solid rgba(212,175,55,0.4)' : '1px solid #ccc',
                            padding: '14px 18px',
                            borderRadius: '10px',
                            width: '100%',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                        required
                    />
                </div>

                <div className="royal-form-row" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <div className="royal-form-group" style={{ flex: 1, minWidth: '200px' }}>
                        <label className="royal-form-label" style={{ 
                            color: dark ? '#ffffff' : '#0b0705', 
                            display: 'block', 
                            marginBottom: '0.8rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontSize: '0.95rem',
                            opacity: '1'
                        }}>
                            Event Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="royal-form-input"
                            style={{ 
                                background: dark ? 'rgba(255,255,255,0.15)' : '#fff', 
                                color: dark ? '#fff' : '#000',
                                border: dark ? '2px solid rgba(212,175,55,0.4)' : '1px solid #ccc',
                                padding: '14px 18px',
                                borderRadius: '10px',
                                width: '100%',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>
                    <div className="royal-form-group" style={{ flex: 1, minWidth: '200px' }}>
                        <label className="royal-form-label" style={{ 
                            color: dark ? '#ffffff' : '#0b0705', 
                            display: 'block', 
                            marginBottom: '0.8rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontSize: '0.95rem',
                            opacity: '1'
                        }}>
                            Expected Guests
                        </label>
                        <input
                            type="number"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            placeholder="e.g. 50"
                            className="royal-form-input"
                            style={{ 
                                background: dark ? 'rgba(255,255,255,0.15)' : '#fff', 
                                color: dark ? '#fff' : '#000',
                                border: dark ? '2px solid rgba(212,175,55,0.4)' : '1px solid #ccc',
                                padding: '14px 18px',
                                borderRadius: '10px',
                                width: '100%',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>
                </div>

                <div className="royal-form-group" style={{ marginBottom: '2.5rem' }}>
                    <label className="royal-form-label" style={{ 
                        color: dark ? '#ffffff' : '#0b0705', 
                        display: 'block', 
                        marginBottom: '0.8rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.95rem',
                        opacity: '1'
                    }}>
                        Your Message / Special Requests
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your event..."
                        className="royal-form-input royal-form-textarea"
                        style={{ 
                            background: dark ? 'rgba(255,255,255,0.15)' : '#fff', 
                            color: dark ? '#fff' : '#000',
                            border: dark ? '2px solid rgba(212,175,55,0.4)' : '1px solid #ccc',
                            padding: '14px 18px',
                            borderRadius: '10px',
                            width: '100%',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                        rows="4"
                    ></textarea>
                </div>

                <button type="submit" className="royal-btn-primary" style={{ 
                    width: '100%', 
                    textAlign: 'center', 
                    padding: '1.2rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px',
                    fontSize: '1.1rem',
                    background: '#25D366',
                    borderColor: '#25D366'
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.656zm6.757-4.242c1.472.873 3.123 1.335 4.814 1.336 5.203 0 9.437-4.234 9.44-9.438.002-2.52-.981-4.89-2.767-6.678s-4.159-2.77-6.679-2.772c-5.204 0-9.438 4.234-9.44 9.439-.001 1.747.48 3.447 1.391 4.969l-.913 3.336 3.414-.896zm12.367-9.032c-.327-.164-1.93-.953-2.23-1.062-.3-.109-.518-.164-.736.164-.218.327-.845 1.062-1.036 1.281-.19.219-.382.246-.708.082-.328-.164-1.383-.51-2.635-1.627-1.003-.895-1.681-2.001-1.876-2.328-.196-.328-.021-.505.143-.668.148-.147.328-.382.491-.574.164-.19.219-.328.328-.546.109-.219.055-.409-.027-.573-.082-.164-.736-1.775-1.009-2.43-.265-.639-.536-.554-.736-.564l-.627-.012c-.218 0-.573.082-.873.409-.3.327-1.145 1.118-1.145 2.727s1.173 3.164 1.336 3.382c.164.218 2.303 3.516 5.577 4.925.779.335 1.386.535 1.859.686.781.249 1.492.214 2.054.131.627-.093 1.93-.791 2.196-1.52.266-.728.266-1.352.186-1.482-.08-.13-.306-.213-.633-.377z" />
                    </svg>
                    Enquire on WhatsApp
                </button>
            </form>
        </div>
    );
};

export default WhatsAppEnquiryForm;
