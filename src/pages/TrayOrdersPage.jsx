import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

  .tray-page-root * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes heroBgZoom {
    0%   { transform: scale(1); }
    100% { transform: scale(1.08); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ringPulse {
    0%   { box-shadow: 0 0 0 0   rgba(212,175,55,0.55); }
    60%  { box-shadow: 0 0 0 18px rgba(212,175,55,0); }
    100% { box-shadow: 0 0 0 0   rgba(212,175,55,0); }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.96) translateY(16px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* scroll reveal */
  .tray-reveal {
    opacity: 0; transform: translateY(36px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .tray-reveal.visible { opacity: 1; transform: translateY(0); }

  /* tray size cards */
  .tray-size-card {
    background: #fff;
    border: 2px solid rgba(212,175,55,0.12);
    border-radius: 24px;
    padding: 3rem 2.5rem;
    cursor: pointer;
    transition: all 0.38s cubic-bezier(.4,0,.2,1);
    position: relative; overflow: hidden;
  }
  .tray-size-card::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg,rgba(212,175,55,0.07) 0%,transparent 65%);
    opacity:0; transition: opacity 0.38s;
  }
  .tray-size-card:hover::before, .tray-size-card.active::before { opacity:1; }
  .tray-size-card:hover { transform:translateY(-6px); box-shadow:0 24px 50px rgba(0,0,0,0.09); border-color:rgba(212,175,55,0.38); }
  .tray-size-card.active { border-color:#D4AF37; box-shadow:0 24px 60px rgba(212,175,55,0.18); transform:translateY(-6px); }
  .tray-card-sel-badge {
    position:absolute; top:1.1rem; right:1.1rem;
    background:#D4AF37; color:#fff;
    font-size:0.75rem; font-weight:700; letter-spacing:1px;
    padding:4px 13px; border-radius:100px; text-transform:uppercase;
    opacity:0; transform:scale(0.75); transition:all 0.28s ease;
  }
  .tray-size-card.active .tray-card-sel-badge { opacity:1; transform:scale(1); }

  /* feature cards */
  .tray-feature-card {
    display:flex; flex-direction:column; align-items:center; gap:1rem;
    padding:2.5rem 1.5rem; border-radius:20px; background:#fff;
    transition: all 0.32s ease;
  }
  .tray-feature-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.07); }

  /* contact banner */
  .tray-contact-banner {
    background:#fff; border-radius:22px;
    padding:2.8rem 3.5rem;
    display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:2rem;
    box-shadow:0 12px 40px rgba(0,0,0,0.06);
    border:1px solid rgba(212,175,55,0.18);
    transition: transform 0.36s ease, box-shadow 0.36s ease;
  }
  .tray-contact-banner:hover { transform:translateY(-4px); box-shadow:0 20px 50px rgba(0,0,0,0.10); }
  .tray-phone-pulse {
    width:76px; height:76px; border-radius:50%;
    background:rgba(212,175,55,0.10);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    animation: ringPulse 2.4s ease-out infinite;
  }
  .tray-phone-num {
    font-size:2.6rem; font-weight:800;
    color:#D4AF37; text-decoration:none;
    font-family:'Playfair Display',serif;
    display:inline-block;
    transition: transform 0.28s ease, opacity 0.28s ease;
  }
  .tray-phone-num:hover { transform:scale(1.04); opacity:0.85; }

  /* CTA enquiry button */
  .tray-enquiry-btn {
    display:inline-flex; align-items:center; gap:12px;
    background: linear-gradient(135deg,#D4AF37 0%,#b8962e 100%);
    color:#fff; font-family:'Inter',sans-serif;
    font-weight:700; font-size:1.05rem; letter-spacing:0.5px;
    padding:1.1rem 3rem; border-radius:100px; border:none; cursor:pointer;
    box-shadow:0 10px 30px rgba(212,175,55,0.38);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .tray-enquiry-btn:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(212,175,55,0.50); }
  .tray-enquiry-btn:active { transform:translateY(0); }

  /* ── MODAL ── */
  .tray-modal-overlay {
    position:fixed; inset:0; z-index:9999;
    background:rgba(10,5,0,0.72);
    backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center;
    padding:1.5rem;
    animation: overlayIn 0.22s ease both;
  }
  .tray-modal-box {
    background:#1A0E08;
    border-radius:16px;
    width:100%; max-width:480px;
    padding:2rem 2rem 1.8rem;
    position:relative;
    border:1px solid rgba(212,175,55,0.15);
    box-shadow:0 40px 100px rgba(0,0,0,0.6);
    animation: modalIn 0.32s cubic-bezier(.4,0,.2,1) both;
  }
  .tray-modal-close {
    position:absolute; top:1.2rem; right:1.3rem;
    width:36px; height:36px; border-radius:50%;
    background:rgba(255,255,255,0.07); border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    color:rgba(255,255,255,0.55); font-size:1.1rem;
    transition: background 0.2s, color 0.2s;
  }
  .tray-modal-close:hover { background:rgba(255,255,255,0.14); color:#fff; }

  /* form elements inside modal */
  .tray-form-label {
    display:block;
    color:rgba(212,175,55,0.9);
    font-size:0.7rem; font-weight:700; letter-spacing:2px;
    text-transform:uppercase; font-family:'Inter',sans-serif;
    margin-bottom:0.45rem;
  }
  .tray-form-label span { color:rgba(255,255,255,0.35); font-weight:400; letter-spacing:0; text-transform:none; font-size:0.7rem; }
  .tray-form-input {
    width:100%; background:rgba(255,255,255,0.06);
    border:1.5px solid rgba(255,255,255,0.1);
    border-radius:8px; padding:9px 13px;
    color:#fff; font-size:0.9rem; font-family:'Inter',sans-serif;
    outline:none; transition: border-color 0.25s, background 0.25s;
  }
  .tray-form-input::placeholder { color:rgba(255,255,255,0.28); }
  .tray-form-input:focus { border-color:rgba(212,175,55,0.6); background:rgba(255,255,255,0.09); }
  .tray-form-textarea { resize:vertical; min-height:80px; }
  .tray-submit-btn {
    width:100%; padding:0.85rem;
    background:linear-gradient(135deg,#D4AF37,#c49b28);
    border:none; border-radius:8px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    color:#fff; font-family:'Inter',sans-serif;
    font-weight:700; font-size:0.85rem; letter-spacing:2px; text-transform:uppercase;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow:0 6px 24px rgba(212,175,55,0.35);
  }
  .tray-submit-btn:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(212,175,55,0.50); }

  /* ── RESPONSIVE ── */
  @media(max-width:768px){
    /* contact banner: horizontal row stays intact but wraps cleanly */
    .tray-contact-banner {
      padding:1.8rem;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
      flex-wrap:nowrap;
      gap:1rem;
    }
    .tray-phone-num { font-size:1.6rem; }
    .tray-sizes-grid { grid-template-columns:1fr !important; }
    .tray-features-grid { grid-template-columns:repeat(2,1fr) !important; }
    .tray-modal-box { padding:1.6rem 1.2rem 1.4rem; max-width:100%; border-radius:14px; }
    .tray-modal-form-row { grid-template-columns:1fr !important; }
  }
  @media(max-width:520px){
    /* contact banner: stack on very small screens, centered */
    .tray-contact-banner {
      flex-direction:column;
      align-items:flex-start;
      gap:1.2rem;
    }
    .tray-contact-banner-left { flex-direction:row !important; align-items:center; gap:1rem; }
    .tray-contact-banner-right { align-self:stretch; }
    .tray-phone-num { font-size:1.9rem; display:block; }
    .tray-features-grid { grid-template-columns:repeat(2,1fr) !important; }
  }
  @media(max-width:420px){
    .tray-features-grid { grid-template-columns:1fr !important; }
    .tray-modal-box { padding:1.3rem 1rem 1.2rem; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────── */
function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
            { threshold: 0.14 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const traySizes = [
    {
        id: 'small', icon: '🍱',
        name: 'Small Tray', capacity: '15 – 18 Guests', 
        description: 'Perfect for intimate family gatherings, kitty parties, and small office lunches.',
        tags: ['Family Friendly', 'Budget Pick'],
    },
    {
        id: 'large', icon: '🥘',
        name: 'Large Tray', capacity: '30 – 35 Guests',
        description: 'Ideal for weddings, big celebrations, corporate banquets, and cultural events.',
        tags: ['Most Popular', 'Best Value'],
    },
];

const features = [
    { icon: '🌿', title: 'Fresh Ingredients',  desc: 'Sourced daily from trusted local markets'       },
    { icon: '🍳',  title: 'Expert Chefs',       desc: 'Crafted by Delhi finest culinary artisans'      },
    { icon: '🚀', title: 'On-Time Delivery',    desc: 'Punctual service, every single time'            },
    { icon: '✨', title: 'Custom Menu',          desc: 'Curated to match your taste and dietary needs'  },
];

/* ─────────────────────────────────────────────────────────────
   WHATSAPP MODAL FORM
───────────────────────────────────────────────────────────── */
const EnquiryModal = ({ onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', guests: '', message: '' });

    // close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [onClose]);

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = (e) => {
        e.preventDefault();
        const phone = '17329860129';
        const text = `Namaste Chatpati Delhi! 🙏\n\n*Tray Order Enquiry*\n\n👤 Name: ${form.name}\n📧 Email: ${form.email || 'N/A'}\n📞 Phone: ${form.phone}\n📅 Event Date: ${form.date}\n👥 Guests: ${form.guests}\n💬 Message: ${form.message || 'N/A'}\n\nThank you!`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
        onClose();
    };

    return (
        <div className="tray-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="tray-modal-box">
                {/* close btn */}
                <button className="tray-modal-close" onClick={onClose} aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>

                {/* heading */}
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', color:'#D4AF37', marginBottom:'0.35rem' }}>
                    Send a Message
                </h2>
                <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.88rem', fontFamily:"'Inter',sans-serif", marginBottom:'1.5rem', lineHeight:1.55 }}>
                    Fill in the form below and we'll reach you on WhatsApp instantly.
                </p>

                <form onSubmit={submit}>
                    {/* row 1 */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem', marginBottom:'0.8rem' }}>
                        <div>
                            <label className="tray-form-label">Your Name</label>
                            <input className="tray-form-input" name="name" value={form.name} onChange={handle} placeholder="e.g. Rahul Sharma" required />
                        </div>
                        <div>
                            <label className="tray-form-label">Email <span>(Optional)</span></label>
                            <input className="tray-form-input" name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" />
                        </div>
                    </div>

                    {/* row 2 — phone full width */}
                    <div style={{ marginBottom:'0.8rem' }}>
                        <label className="tray-form-label">Phone Number</label>
                        <input className="tray-form-input" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+91 98765 43210" required />
                    </div>

                    {/* row 3 — date + guests */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem', marginBottom:'0.8rem' }} className="tray-modal-form-row">
                        <div>
                            <label className="tray-form-label">Event Date</label>
                            <input className="tray-form-input" name="date" type="date" value={form.date} onChange={handle} required />
                        </div>
                        <div>
                            <label className="tray-form-label">Guests</label>
                            <input className="tray-form-input" name="guests" type="number" value={form.guests} onChange={handle} placeholder="e.g. 30" required />
                        </div>
                    </div>

                    {/* message */}
                    <div style={{ marginBottom:'1.2rem' }}>
                        <label className="tray-form-label">Your Message</label>
                        <textarea className="tray-form-input tray-form-textarea" name="message" value={form.message} onChange={handle} placeholder="Tell us how we can help you..." />
                    </div>

                    <button className="tray-submit-btn" type="submit">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.656zm6.757-4.242c1.472.873 3.123 1.335 4.814 1.336 5.203 0 9.437-4.234 9.44-9.438.002-2.52-.981-4.89-2.767-6.678s-4.159-2.77-6.679-2.772c-5.204 0-9.438 4.234-9.44 9.439-.001 1.747.48 3.447 1.391 4.969l-.913 3.336 3.414-.896zm12.367-9.032c-.327-.164-1.93-.953-2.23-1.062-.3-.109-.518-.164-.736.164-.218.327-.845 1.062-1.036 1.281-.19.219-.382.246-.708.082-.328-.164-1.383-.51-2.635-1.627-1.003-.895-1.681-2.001-1.876-2.328-.196-.328-.021-.505.143-.668.148-.147.328-.382.491-.574.164-.19.219-.328.328-.546.109-.219.055-.409-.027-.573-.082-.164-.736-1.775-1.009-2.43-.265-.639-.536-.554-.736-.564l-.627-.012c-.218 0-.573.082-.873.409-.3.327-1.145 1.118-1.145 2.727s1.173 3.164 1.336 3.382c.164.218 2.303 3.516 5.577 4.925.779.335 1.386.535 1.859.686.781.249 1.492.214 2.054.131.627-.093 1.93-.791 2.196-1.52.266-.728.266-1.352.186-1.482-.08-.13-.306-.213-.633-.377z"/>
                        </svg>
                        Send on WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
const TrayOrdersPage = () => {
    const [selectedSize, setSelectedSize] = useState('small');
    const [modalOpen, setModalOpen]       = useState(false);

    const refFeatures = useReveal();
    const refContact  = useReveal();
    const refCta      = useReveal();

    return (
        <div className="tray-page-root">
            <style>{pageStyles}</style>
            {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} />}

            {/* ── HERO ───────────────────────────────────────── */}
            <section style={{ position:'relative', height:'520px', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, backgroundImage:"url('/images/hero-3.png')", backgroundSize:'cover', backgroundPosition:'center', animation:'heroBgZoom 18s ease-in-out infinite alternate' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(139,21,56,0.68) 100%)' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,transparent,#D4AF37,transparent)' }} />

                <div style={{ position:'relative', zIndex:2, padding:'0 1.5rem' }}>
                    <p style={{ color:'#D4AF37', fontSize:'0.9rem', fontWeight:700, letterSpacing:'5px', textTransform:'uppercase', fontFamily:"'Inter',sans-serif", marginBottom:'1.2rem', animation:'fadeUp 0.8s ease both' }}>
                        Catering for Every Occasion
                    </p>
                    <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.8rem,6vw,5rem)', color:'#fff', fontWeight:800, lineHeight:1.1, margin:'0 0 1.3rem', animation:'fadeUp 0.9s 0.1s ease both' }}>
                        Tray Orders
                    </h1>
                    <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'clamp(1rem,2vw,1.25rem)', fontFamily:"'Inter',sans-serif", maxWidth:'520px', margin:'0 auto 2.4rem', lineHeight:1.75, animation:'fadeUp 1s 0.2s ease both' }}>
                        Authentic Delhi street flavours, perfectly portioned &amp; beautifully presented for your group.
                    </p>
                    {/* Speak with Jimmy */}
                    <a
                        href="tel:7329860129"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '1rem',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(212,175,55,0.45)',
                            borderRadius: '100px',
                            padding: '0.85rem 2rem 0.85rem 0.85rem',
                            textDecoration: 'none',
                            animation: 'fadeUp 1.1s 0.3s ease both',
                            transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
                        }}
                        onMouseOver={e => { e.currentTarget.style.background='rgba(212,175,55,0.18)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                        onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.transform='translateY(0)'; }}
                    >
                        {/* avatar circle */}
                        <div style={{
                            width: '46px', height: '46px', borderRadius: '50%',
                            background: 'linear-gradient(135deg,#D4AF37,#b8962e)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.25rem', flexShrink: 0,
                            animation: 'ringPulse 2.4s ease-out infinite',
                        }}>
                            📞
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif", margin: '0 0 2px 0' }}>
                                Speak with Jimmy
                            </p>
                            <p style={{ color: '#D4AF37', fontSize: '1.25rem', fontWeight: 800, fontFamily: "'Playfair Display',serif", margin: 0, letterSpacing: '0.5px' }}>
                                732 986 0129
                            </p>
                        </div>
                    </a>
                </div>
            </section>

            {/* ── TRAY SIZE SELECTOR ─────────────────────────── */}
            <section style={{ background:'var(--cream,#FDF8F0)', padding:'7rem 1.5rem' }}>
                <div style={{ maxWidth:'900px', margin:'0 auto' }}>
                    <div style={{ textAlign:'center', marginBottom:'4rem' }}>
                        <p style={{ color:'#D4AF37', fontSize:'0.85rem', fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', fontFamily:"'Inter',sans-serif", marginBottom:'0.9rem' }}>Choose Your Scale</p>
                        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3rem)', color:'var(--primary-maroon,#8B1538)' }}>Select Tray Size</h2>
                        <div style={{ width:'56px', height:'3px', background:'linear-gradient(90deg,#D4AF37,#f5e27a)', borderRadius:'10px', margin:'1.4rem auto 0' }} />
                    </div>

                    <div className="tray-sizes-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'2rem' }}>
                        {traySizes.map(size => (
                            <div key={size.id} className={`tray-size-card ${selectedSize === size.id ? 'active' : ''}`} onClick={() => setSelectedSize(size.id)}>
                                <span className="tray-card-sel-badge">Selected</span>
                                <div style={{ fontSize:'3.5rem', marginBottom:'1.4rem' }}>{size.icon}</div>
                                <div style={{ display:'inline-block', background:'rgba(212,175,55,0.11)', color:'#b8962e', fontSize:'0.8rem', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', padding:'5px 14px', borderRadius:'100px', marginBottom:'1.2rem', fontFamily:"'Inter',sans-serif" }}>{size.capacity}</div>
                                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.9rem', color:'var(--primary-maroon,#8B1538)', marginBottom:'0.7rem' }}>{size.name}</h3>
                                <p style={{ color:'#666', fontSize:'1rem', lineHeight:1.65, fontFamily:"'Inter',sans-serif", marginBottom:'1.5rem' }}>{size.description}</p>
                                <div style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--primary-maroon,#8B1538)', fontFamily:"'Playfair Display',serif", marginBottom:'1.5rem' }}>{size.price}</div>
                                <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                                    {size.tags.map(t => (
                                        <span key={t} style={{ background: selectedSize === size.id ? '#D4AF37' : 'rgba(212,175,55,0.1)', color: selectedSize === size.id ? '#fff' : '#b8962e', fontSize:'0.78rem', fontWeight:600, padding:'4px 12px', borderRadius:'100px', fontFamily:"'Inter',sans-serif", transition:'all 0.3s' }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ───────────────────────────────────── */}
            <section style={{ background:'#fff', padding:'4rem 1.5rem' }}>
                <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
                    <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
                        <p style={{ color:'#D4AF37', fontSize:'0.78rem', fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', fontFamily:"'Inter',sans-serif", marginBottom:'0.6rem' }}>Why Us</p>
                        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'var(--primary-maroon,#8B1538)' }}>The Chatpati Delhi Promise</h2>
                        <div style={{ width:'48px', height:'3px', background:'linear-gradient(90deg,#D4AF37,#f5e27a)', borderRadius:'10px', margin:'1rem auto 0' }} />
                    </div>
                    <div ref={refFeatures} className="tray-reveal tray-features-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
                        {features.map((f, i) => (
                            <div key={i} className="tray-feature-card" style={{ transitionDelay:`${i*0.08}s`, padding:'1.5rem 1rem' }}>
                                <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'rgba(212,175,55,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem' }}>{f.icon}</div>
                                <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1rem', color:'var(--primary-maroon,#8B1538)', textAlign:'center' }}>{f.title}</h4>
                                <p style={{ color:'#777', fontSize:'0.85rem', lineHeight:1.55, fontFamily:"'Inter',sans-serif", textAlign:'center' }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACT BANNER + CTA ───────────────────────── */}
            <section style={{ background:'var(--cream,#FDF8F0)', padding:'7rem 1.5rem' }}>
                <div style={{ maxWidth:'900px', margin:'0 auto' }}>



                    {/* CTA card */}
                    <div ref={refCta} className="tray-reveal" style={{ background:'var(--primary-maroon,#8B1538)', borderRadius:'24px', padding:'4rem 3rem', textAlign:'center', position:'relative', overflow:'hidden', boxShadow:'0 30px 70px rgba(139,21,56,0.22)' }}>
                        {/* decorative rings */}
                        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(212,175,55,0.06)', pointerEvents:'none' }} />
                        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(212,175,55,0.05)', pointerEvents:'none' }} />
                        <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'linear-gradient(90deg,#b8962e,#D4AF37,#f5e27a,#D4AF37,#b8962e)', backgroundSize:'200% auto', animation:'shimmer 4s linear infinite' }} />

                        <div style={{ position:'relative', zIndex:1 }}>
                            <p style={{ color:'rgba(212,175,55,0.85)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', fontFamily:"'Inter',sans-serif", marginBottom:'1rem' }}>Ready to Order?</p>
                            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,2.8rem)', color:'#fff', marginBottom:'1.2rem', lineHeight:1.2 }}>Book Your Tray Order</h2>
                            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'1.05rem', fontFamily:"'Inter',sans-serif", maxWidth:'460px', margin:'0 auto 2.5rem', lineHeight:1.75 }}>
                                Fill in a quick form and our team will get back to you on WhatsApp with a personalised quote.
                            </p>
                            <button className="tray-enquiry-btn" onClick={() => setModalOpen(true)} style={{ margin:'0 auto' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.656zm6.757-4.242c1.472.873 3.123 1.335 4.814 1.336 5.203 0 9.437-4.234 9.44-9.438.002-2.52-.981-4.89-2.767-6.678s-4.159-2.77-6.679-2.772c-5.204 0-9.438 4.234-9.44 9.439-.001 1.747.48 3.447 1.391 4.969l-.913 3.336 3.414-.896zm12.367-9.032c-.327-.164-1.93-.953-2.23-1.062-.3-.109-.518-.164-.736.164-.218.327-.845 1.062-1.036 1.281-.19.219-.382.246-.708.082-.328-.164-1.383-.51-2.635-1.627-1.003-.895-1.681-2.001-1.876-2.328-.196-.328-.021-.505.143-.668.148-.147.328-.382.491-.574.164-.19.219-.328.328-.546.109-.219.055-.409-.027-.573-.082-.164-.736-1.775-1.009-2.43-.265-.639-.536-.554-.736-.564l-.627-.012c-.218 0-.573.082-.873.409-.3.327-1.145 1.118-1.145 2.727s1.173 3.164 1.336 3.382c.164.218 2.303 3.516 5.577 4.925.779.335 1.386.535 1.859.686.781.249 1.492.214 2.054.131.627-.093 1.93-.791 2.196-1.52.266-.728.266-1.352.186-1.482-.08-.13-.306-.213-.633-.377z"/>
                                </svg>
                                Get a Free Quote
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default TrayOrdersPage;
