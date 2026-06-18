import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

  .ls-page * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes lsHeroBgZoom {
    0%   { transform: scale(1); }
    100% { transform: scale(1.07); }
  }
  @keyframes lsFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lsRingPulse {
    0%   { box-shadow: 0 0 0 0   rgba(212,175,55,0.55); }
    60%  { box-shadow: 0 0 0 18px rgba(212,175,55,0); }
    100% { box-shadow: 0 0 0 0   rgba(212,175,55,0); }
  }
  @keyframes lsModalIn {
    from { opacity: 0; transform: scale(0.96) translateY(16px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
  @keyframes lsOverlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lsShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .ls-reveal {
    opacity: 0; transform: translateY(36px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ls-reveal.visible { opacity: 1; transform: translateY(0); }

  /* station cards */
  .ls-station-card {
    display: flex;
    gap: 3rem;
    align-items: center;
    flex-wrap: wrap;
    padding: 3rem 0;
    border-bottom: 1px solid rgba(212,175,55,0.12);
  }
  .ls-station-card:last-child { border-bottom: none; }
  .ls-station-img {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.10);
    transition: box-shadow 0.4s ease, transform 0.4s ease;
  }
  .ls-station-img:hover { transform: translateY(-4px); box-shadow: 0 28px 60px rgba(0,0,0,0.15); }

  /* contact banner */
  .ls-contact-banner {
    background: #fff;
    border-radius: 22px;
    padding: 2.4rem 3rem;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2rem;
    box-shadow: 0 12px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(212,175,55,0.18);
    transition: transform 0.36s ease, box-shadow 0.36s ease;
  }
  .ls-contact-banner:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.10); }
  .ls-phone-pulse {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(212,175,55,0.10);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    animation: lsRingPulse 2.4s ease-out infinite;
  }
  .ls-phone-num {
    font-size: 2.4rem; font-weight: 800;
    color: #D4AF37; text-decoration: none;
    font-family: 'Playfair Display', serif;
    display: inline-block;
    transition: transform 0.28s ease, opacity 0.28s ease;
  }
  .ls-phone-num:hover { transform: scale(1.04); opacity: 0.85; }

  /* CTA button */
  .ls-enquiry-btn {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, #D4AF37 0%, #b8962e 100%);
    color: #fff; font-family: 'Inter', sans-serif;
    font-weight: 700; font-size: 1rem; letter-spacing: 0.5px;
    padding: 1rem 2.8rem; border-radius: 100px; border: none; cursor: pointer;
    box-shadow: 0 10px 30px rgba(212,175,55,0.38);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .ls-enquiry-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(212,175,55,0.50); }

  /* Modal */
  .ls-modal-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(10,5,0,0.72);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: lsOverlayIn 0.22s ease both;
  }
  .ls-modal-box {
    background: #1A0E08;
    border-radius: 16px;
    width: 100%; max-width: 480px;
    padding: 2rem 2rem 1.8rem;
    position: relative;
    border: 1px solid rgba(212,175,55,0.15);
    box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    animation: lsModalIn 0.32s cubic-bezier(.4,0,.2,1) both;
  }
  .ls-modal-close {
    position: absolute; top: 1rem; right: 1.2rem;
    width: 34px; height: 34px; border-radius: 50%;
    background: rgba(255,255,255,0.07); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.55);
    transition: background 0.2s, color 0.2s;
  }
  .ls-modal-close:hover { background: rgba(255,255,255,0.14); color: #fff; }

  /* form */
  .ls-form-label {
    display: block;
    color: rgba(212,175,55,0.9);
    font-size: 0.7rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; font-family: 'Inter', sans-serif;
    margin-bottom: 0.45rem;
  }
  .ls-form-label span { color: rgba(255,255,255,0.35); font-weight: 400; letter-spacing: 0; text-transform: none; font-size: 0.7rem; }
  .ls-form-input {
    width: 100%; background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 8px; padding: 9px 13px;
    color: #fff; font-size: 0.9rem; font-family: 'Inter', sans-serif;
    outline: none; transition: border-color 0.25s, background 0.25s;
  }
  .ls-form-input::placeholder { color: rgba(255,255,255,0.28); }
  .ls-form-input:focus { border-color: rgba(212,175,55,0.6); background: rgba(255,255,255,0.09); }
  .ls-form-textarea { resize: vertical; min-height: 80px; }
  .ls-submit-btn {
    width: 100%; padding: 0.85rem;
    background: linear-gradient(135deg, #D4AF37, #c49b28);
    border: none; border-radius: 8px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    color: #fff; font-family: 'Inter', sans-serif;
    font-weight: 700; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 6px 24px rgba(212,175,55,0.35);
  }
  .ls-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(212,175,55,0.50); }

  /* responsive */
  @media(max-width: 768px) {
    .ls-station-card { flex-direction: column !important; gap: 2rem; padding: 2.5rem 0; }
    .ls-contact-banner { padding: 1.8rem; flex-direction: row; align-items: center; flex-wrap: nowrap; gap: 1rem; }
    .ls-phone-num { font-size: 1.6rem; }
    .ls-modal-box { padding: 1.6rem 1.2rem 1.4rem; max-width: 100%; }
    .ls-modal-form-row { grid-template-columns: 1fr !important; }
  }
  @media(max-width: 520px) {
    .ls-contact-banner { flex-direction: column; align-items: flex-start; gap: 1rem; }
    .ls-phone-num { font-size: 1.8rem; display: block; }
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
            { threshold: 0.12 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

/* ─────────────────────────────────────────────────────────────
   WHATSAPP ICON SVG
───────────────────────────────────────────────────────────── */
const WaIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.656zm6.757-4.242c1.472.873 3.123 1.335 4.814 1.336 5.203 0 9.437-4.234 9.44-9.438.002-2.52-.981-4.89-2.767-6.678s-4.159-2.77-6.679-2.772c-5.204 0-9.438 4.234-9.44 9.439-.001 1.747.48 3.447 1.391 4.969l-.913 3.336 3.414-.896zm12.367-9.032c-.327-.164-1.93-.953-2.23-1.062-.3-.109-.518-.164-.736.164-.218.327-.845 1.062-1.036 1.281-.19.219-.382.246-.708.082-.328-.164-1.383-.51-2.635-1.627-1.003-.895-1.681-2.001-1.876-2.328-.196-.328-.021-.505.143-.668.148-.147.328-.382.491-.574.164-.19.219-.328.328-.546.109-.219.055-.409-.027-.573-.082-.164-.736-1.775-1.009-2.43-.265-.639-.536-.554-.736-.564l-.627-.012c-.218 0-.573.082-.873.409-.3.327-1.145 1.118-1.145 2.727s1.173 3.164 1.336 3.382c.164.218 2.303 3.516 5.577 4.925.779.335 1.386.535 1.859.686.781.249 1.492.214 2.054.131.627-.093 1.93-.791 2.196-1.52.266-.728.266-1.352.186-1.482-.08-.13-.306-.213-.633-.377z"/>
    </svg>
);

/* ─────────────────────────────────────────────────────────────
   ENQUIRY MODAL
───────────────────────────────────────────────────────────── */
const EnquiryModal = ({ onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', guests: '', message: '' });

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [onClose]);

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = (e) => {
        e.preventDefault();
        const phone = '17325168407';
        const text = `Namaste Chatpati Delhi! 🙏\n\n*Live Station Booking Enquiry*\n\n👤 Name: ${form.name}\n📧 Email: ${form.email || 'N/A'}\n📞 Phone: ${form.phone}\n📅 Event Date: ${form.date}\n👥 Guests: ${form.guests}\n💬 Message: ${form.message || 'N/A'}\n\nThank you!`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
        onClose();
    };

    return (
        <div className="ls-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="ls-modal-box">
                <button className="ls-modal-close" onClick={onClose} aria-label="Close">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>

                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', color:'#D4AF37', marginBottom:'0.35rem' }}>
                    Send a Message
                </h2>
                <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.88rem', fontFamily:"'Inter',sans-serif", marginBottom:'1.5rem', lineHeight:1.55 }}>
                    Fill in the form below and we'll reach you on WhatsApp instantly.
                </p>

                <form onSubmit={submit}>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem', marginBottom:'0.8rem' }} className="ls-modal-form-row">
                        <div>
                            <label className="ls-form-label">Your Name</label>
                            <input className="ls-form-input" name="name" value={form.name} onChange={handle} placeholder="e.g. Rahul Sharma" required />
                        </div>
                        <div>
                            <label className="ls-form-label">Email <span>(Optional)</span></label>
                            <input className="ls-form-input" name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" />
                        </div>
                    </div>

                    <div style={{ marginBottom:'0.8rem' }}>
                        <label className="ls-form-label">Phone Number</label>
                        <input className="ls-form-input" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+91 98765 43210" required />
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem', marginBottom:'0.8rem' }} className="ls-modal-form-row">
                        <div>
                            <label className="ls-form-label">Event Date</label>
                            <input className="ls-form-input" name="date" type="date" value={form.date} onChange={handle} required />
                        </div>
                        <div>
                            <label className="ls-form-label">Guests</label>
                            <input className="ls-form-input" name="guests" type="number" value={form.guests} onChange={handle} placeholder="e.g. 100" required />
                        </div>
                    </div>

                    <div style={{ marginBottom:'1.2rem' }}>
                        <label className="ls-form-label">Your Message</label>
                        <textarea className="ls-form-input ls-form-textarea" name="message" value={form.message} onChange={handle} placeholder="Tell us about your event..." />
                    </div>

                    <button className="ls-submit-btn" type="submit">
                        <WaIcon size={20} /> Send on WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const stations = [
    {
        id: 'ls-1',
        name: 'Golgappe Live Station',
        description: 'The ultimate interactive street food experience. Our expert servers provide fresh, crispy puris with multiple flavored waters.',
        features: ['Live Interaction', 'Custom Spice Levels', 'Variety of Pani'],
        image: '/images/golgappa.jpeg'
    },
    {
        id: 'ls-2',
        name: 'Karjat Vada Pav Stall',
        description: 'Authentic Mumbai street vibes with hot, fresh vadas served in buttery pav with traditional chutneys.',
        features: ['Hot & Fresh', 'Traditional Chutneys', 'Authentic Taste'],
        image: '/images/Mumbai Local/Karjat Vada Pav.png'
    },
    {
        id: 'ls-3',
        name: 'Live Chatpati Chaat',
        description: "Customized Papri Chaat and Sev Puri made exactly to your guests' preference.",
        features: ['Made-to-Order', 'Fresh Ingredients', 'Visual Appeal'],
        image: '/images/Chandni Chowk Ke Bhalle.png'
    }
];

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
const LiveStationsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const refContact = useReveal();
    const refCta     = useReveal();

    return (
        <div className="ls-page">
            <style>{pageStyles}</style>
            {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} />}

            {/* ── HERO ──────────────────────────────────────── */}
            <section style={{ position:'relative', height:'520px', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, backgroundImage:"url('/images/hero-1.png')", backgroundSize:'cover', backgroundPosition:'center', animation:'lsHeroBgZoom 18s ease-in-out infinite alternate' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(139,21,56,0.68) 100%)' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,transparent,#D4AF37,transparent)' }} />

                <div style={{ position:'relative', zIndex:2, padding:'0 1.5rem' }}>
                    <p style={{ color:'#D4AF37', fontSize:'0.9rem', fontWeight:700, letterSpacing:'5px', textTransform:'uppercase', fontFamily:"'Inter',sans-serif", marginBottom:'1.2rem', animation:'lsFadeUp 0.8s ease both' }}>
                        Interactive Dining Experience
                    </p>
                    <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.8rem,6vw,5rem)', color:'#fff', fontWeight:800, lineHeight:1.1, margin:'0 0 1.3rem', animation:'lsFadeUp 0.9s 0.1s ease both' }}>
                        Live Food Stations
                    </h1>
                    <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'clamp(1rem,2vw,1.25rem)', fontFamily:"'Inter',sans-serif", maxWidth:'520px', margin:'0 auto 2.4rem', lineHeight:1.75, animation:'lsFadeUp 1s 0.2s ease both' }}>
                        Bring the vibrant street markets of Delhi to your event — live, fresh &amp; unforgettable.
                    </p>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="ls-enquiry-btn"
                        style={{ animation:'lsFadeUp 1.1s 0.3s ease both' }}
                    >
                        <WaIcon size={18} /> Book a Live Station
                    </button>
                </div>
            </section>

            {/* ── STATION CARDS ─────────────────────────────── */}
            <section style={{ background:'var(--cream,#FDF8F0)', padding:'6rem 1.5rem' }}>
                <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
                    <div style={{ textAlign:'center', marginBottom:'4rem' }}>
                        <p style={{ color:'#D4AF37', fontSize:'0.85rem', fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', fontFamily:"'Inter',sans-serif", marginBottom:'0.8rem' }}>Interactive Dining</p>
                        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3rem)', color:'var(--primary-maroon,#8B1538)' }}>Experience the Magic</h2>
                        <p style={{ color:'#777', fontSize:'1.05rem', fontFamily:"'Inter',sans-serif", marginTop:'1rem', maxWidth:'540px', margin:'1rem auto 0', lineHeight:1.7 }}>Our live stations add a touch of spectacle and ultimate freshness to any occasion.</p>
                        <div style={{ width:'56px', height:'3px', background:'linear-gradient(90deg,#D4AF37,#f5e27a)', borderRadius:'10px', margin:'1.4rem auto 0' }} />
                    </div>

                    {stations.map((station, idx) => (
                        <div key={station.id} className="ls-station-card" style={{ flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' }}>
                            {/* image */}
                            <div style={{ flex:'1', minWidth:'300px' }}>
                                <div className="ls-station-img">
                                    <img src={station.image} alt={station.name} style={{ width:'100%', height:'380px', objectFit:'cover', display:'block' }} />
                                </div>
                            </div>
                            {/* text */}
                            <div style={{ flex:'1', minWidth:'300px' }}>
                                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.2rem', color:'var(--primary-maroon,#8B1538)', marginBottom:'1.2rem', lineHeight:1.2 }}>{station.name}</h3>
                                <p style={{ fontSize:'1.05rem', color:'#555', marginBottom:'2rem', lineHeight:1.8, fontFamily:"'Inter',sans-serif" }}>{station.description}</p>
                                <ul style={{ listStyle:'none', padding:0, display:'flex', flexWrap:'wrap', gap:'0.8rem', marginBottom:'2.5rem' }}>
                                    {station.features.map((f, i) => (
                                        <li key={i} style={{ background:'rgba(212,175,55,0.08)', padding:'0.5rem 1.2rem', borderRadius:'100px', fontWeight:600, color:'#b8962e', border:'1px solid rgba(212,175,55,0.3)', fontSize:'0.9rem', fontFamily:"'Inter',sans-serif" }}>
                                            ✓ {f}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => setModalOpen(true)} className="ls-enquiry-btn">
                                    <WaIcon size={18} /> Book This Station
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CONTACT BANNER + CTA ──────────────────────── */}
            <section style={{ background:'#fff', padding:'6rem 1.5rem' }}>
                <div style={{ maxWidth:'900px', margin:'0 auto' }}>

                    {/* contact strip */}
                    <div ref={refContact} className="ls-reveal ls-contact-banner" style={{ marginBottom:'3rem' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'1.2rem', flex:'1 1 200px', minWidth:0 }}>
                            <div className="ls-phone-pulse" style={{ flexShrink:0 }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            </div>
                            <div style={{ minWidth:0 }}>
                                <p style={{ color:'#D4AF37', fontSize:'0.72rem', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', fontFamily:"'Inter',sans-serif", marginBottom:'0.2rem' }}>Direct Contact</p>
                                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.3rem,3vw,1.9rem)', color:'var(--primary-maroon,#8B1538)', marginBottom:'0.2rem', lineHeight:1.2 }}>Speak with Abhijit</h3>
                                <p style={{ color:'#777', fontSize:'0.88rem', fontFamily:"'Inter',sans-serif", lineHeight:1.5 }}>Our live station specialist is ready to plan your perfect event experience.</p>
                            </div>
                        </div>
                        <div style={{ flexShrink:0 }}>
                            <a href="tel:7325168407" className="ls-phone-num">732 516 8407</a>
                            <p style={{ color:'#aaa', fontSize:'0.78rem', fontFamily:"'Inter',sans-serif", marginTop:'3px' }}>Tap to call</p>
                        </div>
                    </div>

                    {/* CTA card */}
                    <div ref={refCta} className="ls-reveal" style={{ background:'var(--primary-maroon,#8B1538)', borderRadius:'24px', padding:'4rem 3rem', textAlign:'center', position:'relative', overflow:'hidden', boxShadow:'0 30px 70px rgba(139,21,56,0.22)' }}>
                        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(212,175,55,0.06)', pointerEvents:'none' }} />
                        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(212,175,55,0.05)', pointerEvents:'none' }} />
                        <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'linear-gradient(90deg,#b8962e,#D4AF37,#f5e27a,#D4AF37,#b8962e)', backgroundSize:'200% auto', animation:'lsShimmer 4s linear infinite' }} />

                        <div style={{ position:'relative', zIndex:1 }}>
                            <p style={{ color:'rgba(212,175,55,0.85)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', fontFamily:"'Inter',sans-serif", marginBottom:'1rem' }}>Ready to Book?</p>
                            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,2.8rem)', color:'#fff', marginBottom:'1.2rem', lineHeight:1.2 }}>Book Your Live Station</h2>
                            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'1.05rem', fontFamily:"'Inter',sans-serif", maxWidth:'460px', margin:'0 auto 2.5rem', lineHeight:1.75 }}>
                                Fill in a quick form and our team will get back to you on WhatsApp with a personalised proposal.
                            </p>
                            <button className="ls-enquiry-btn" onClick={() => setModalOpen(true)} style={{ margin:'0 auto' }}>
                                <WaIcon size={18} /> Get a Free Quote
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default LiveStationsPage;
