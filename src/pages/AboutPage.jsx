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
                        <p className="royal-about-lead">
                            Welcome to Chatpati Delhi, a premier culinary destination where the soul of Old Delhi meets modern sophistication. Inspired by the bold, vibrant, and unapologetic flavors of India’s capital, we were founded with a singular vision: to bring the true essence of Indian street food to the United States.
                        </p>
                        
                        <div className="royal-founders-description">
                            <p>
                                <strong>Jimmy Poonawala</strong> leads the restaurant’s day-to-day activities and manages tray orders, meticulously ensuring that every guest receives seamless, world-class service through operational excellence.
                            </p>
                            <p>
                                <strong>Hema Singh</strong> is the creative force behind the kitchen, our culinary visionary known for inventing the restaurant’s signature spices and handcrafted masalas that bring authentic Indian flavors to every dish.
                            </p>
                            <p>
                                <strong>Pradeep Singh</strong> oversees the restaurant’s daily operations with a relentless focus on efficiency, consistency, and delivering an outstanding guest experience that honors our high standards.
                            </p>
                            <p>
                                <strong>Abhijit Pingle</strong> manages live stations and premium catering services across the USA, creating interactive and memorable culinary experiences that celebrate tradition and innovation for events of all scales.
                            </p>
                        </div>
                        
                        <p className="royal-about-conclusion">
                            Together, the founders of Chatpati Delhi are redefining modern Indian dining by blending tradition, innovation, and unparalleled hospitality in every meal served.
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

