import '../index.css';
import './Royal.css';

function AboutPage() {
    return (
        <div className="royal-menu-wrapper">
            <div className="container">
                
                {/* Hero Header */}
                <div className="royal-title-container" style={{ marginBottom: '4rem' }}>
                    <span className="royal-subtitle">Our Journey</span>
                    <h1 className="royal-title">The People & The Passion</h1>
                    <div className="royal-title-divider"><span>✦</span></div>
                </div>

                {/* Group Section */}
                <div className="royal-about-group-section">
                    <div className="royal-about-group-image">
                        <div className="royal-image-frame">
                            <img 
                                src="/images/about-group.jpg" 
                                alt="Founders of Chatpati Delhi" 
                                className="royal-group-img"
                                onError={(e) => { e.target.src = '/avatar.png'; }}
                            />
                            <div className="royal-image-overlay"></div>
                        </div>
                    </div>
                    
                    <div className="royal-about-text-content">
                        <p className="royal-about-lead" style={{ lineHeight: '1.9', fontSize: '1.1rem' }}>
                            Founded by Jimmy, Hema Singh, Pradeep Singh, and Abhijit Pingle, Chatpati Delhi was built with a shared vision of bringing authentic Indian cuisine, rich traditions, and heartfelt hospitality to every guest. Rooted in passion, dedication, and a commitment to excellence, the founders created a space where culture, flavor, and community come together to deliver a truly memorable dining experience. Every detail at Chatpati Delhi reflects their collective passion for quality, innovation, and serving food with warmth and authenticity.
                        </p>
                    </div>
                </div>

                {/* Mission & Legacy */}
                <div className="royal-mission-section">
                    <div className="royal-mission-card">
                        <div className="royal-mission-icon">📜</div>
                        <h3>Our Story</h3>
                        <p>
                            Chatpati Delhi was born from a simple idea — bringing the true taste of Delhi street food to your table. 
                            What started as a small passion project has grown into a nationally recognized culinary destination, 
                            all while staying true to our cultural roots and authentic flavors.
                        </p>
                    </div>
                    <div className="royal-mission-card">
                        <div className="royal-mission-icon">🎯</div>
                        <h3>Our Mission</h3>
                        <p>
                            We are committed to preserving traditional recipes and authentic flavors passed down through generations. 
                            Transparency, quality, and long-term relationships lie at the heart of everything we do.
                        </p>
                    </div>
                </div>

                {/* Coming Soon / Services */}
                <div className="royal-services-highlight">
                    <div className="royal-services-label">Expansion in Progress</div>
                    <h2 className="royal-services-title">New Horizons</h2>
                    <div className="royal-services-grid">
                        {[
                            { name: 'Catering Services', desc: 'Nationwide premium event catering' },
                            { name: 'Live Food Stalls', desc: 'Bring the street food experience to you' },
                            { name: 'Sweets Bulk Orders', desc: 'Artisanal gift boxes for every occasion' }
                        ].map((s, i) => (
                            <div key={i} className="royal-service-item">
                                <span className="royal-service-dot">✦</span>
                                <div className="royal-service-text">
                                    <h4>{s.name}</h4>
                                    <p>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AboutPage;

