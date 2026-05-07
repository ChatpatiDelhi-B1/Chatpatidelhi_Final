import '../index.css';
import './Royal.css';

const pressArticles = [
    {
        outlet: 'The New York Times',
        badge: '2025 Best Restaurants List',
        quote: '"The Chole Bhatura at Chatpati Delhi is a revelation — golden balloons of bread the size of cantaloupes, filled with the most complex chickpea stew you\'ve ever tasted."',
        author: 'Brian Gallagher',
        date: 'October 2025',
        tag: 'National Feature',
        highlight: true,
    },
    {
        outlet: 'The Peasant Wife',
        badge: 'Restaurant Revue',
        quote: '"A strip mall storefront along the Garden State\'s own Spice Route is where Chef Hema Singh leads a 14-person kitchen. It\'s not the Taj Mahal, but it\'s a wonder of tastes and right now is New Jersey\'s finest South Asian restaurant."',
        author: 'Andy Clurfeld',
        date: 'March 2025',
        tag: 'Full Review',
        highlight: false,
    },
    {
        outlet: 'NJ Monthly',
        badge: 'State Exclusive',
        quote: '"Chatpati Delhi was the only New Jersey spot to make the New York Times list of the 50 best places to eat in America. A local treasure that has become a national dining destination."',
        author: 'NJ Monthly Staff',
        date: 'September 2025',
        tag: 'State Recognition',
        highlight: false,
    },
    {
        outlet: 'NJ.com',
        badge: 'Restaurant Review',
        quote: '"If you\'re hungry for authentic Indian street food, you won\'t do any better than Chatpati Delhi. The Purani Delhi Chicken Biryani and show-stopping Chole Bhature prove it\'s a worthy inclusion on the national stage."',
        author: 'NJ.com Food Desk',
        date: 'September 2025',
        tag: 'Best of NJ',
        highlight: false,
    },
];

function PressPage() {
    return (
        <div className="royal-menu-wrapper">
            <div className="container">

                {/* Page Header */}
                <div className="royal-title-container" style={{ marginBottom: '4rem' }}>
                    <span className="royal-subtitle">As Seen In</span>
                    <h1 className="royal-title">Featured Articles</h1>
                    <div className="royal-title-divider"><span>✦</span></div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '1.5rem auto 0', lineHeight: 1.8 }}>
                        Chatpati Delhi in the National Spotlight — recognized by the country's most respected food critics and publications.
                    </p>
                </div>

                {/* NYT Full-Width Highlight */}
                <div className="royal-press-hero">
                    <div className="royal-press-hero-outlet">The New York Times</div>
                    <div className="royal-press-hero-badge">🏆 2025 Best Restaurants in America — Top 50</div>
                    <blockquote className="royal-press-hero-quote">
                        "The Chole Bhatura at Chatpati Delhi is a revelation — golden balloons of bread the size of cantaloupes, filled with the most complex chickpea stew you've ever tasted."
                    </blockquote>
                    <div className="royal-press-hero-meta">
                        <span>— Brian Gallagher</span>
                        <span className="royal-press-hero-sep">✦</span>
                        <span>October 2025</span>
                        <span className="royal-press-hero-sep">✦</span>
                        <span>National Feature</span>
                    </div>
                </div>

                {/* NYT Editorial Context */}
                <div className="royal-press-context">
                    <div className="royal-press-context-inner">
                        <p className="royal-press-context-quote">
                            "What does it mean to be a 'best restaurant'? These places all have delicious food and a mastery of craft, but also a generosity of spirit and a singular point of view. To make their selections, 14 of our reporters and editors took 76 flights to eat more than 200 meals in 33 states."
                        </p>
                        <p className="royal-press-context-attr">— The New York Times Editorial Team</p>
                    </div>
                </div>

                {/* Press Cards Grid */}
                <div className="royal-title-container" style={{ margin: '5rem 0 3rem' }}>
                    <span className="royal-subtitle">Nationally Recognized</span>
                    <h2 className="royal-title" style={{ fontSize: '2.5rem' }}>Further Coverage</h2>
                    <div className="royal-title-divider"><span>✦</span></div>
                </div>

                <div className="royal-press-grid">
                    {pressArticles.slice(1).map((article, i) => (
                        <div key={i} className="royal-press-card">
                            <div className="royal-press-card-top">
                                <div className="royal-press-card-outlet">{article.outlet}</div>
                                <span className="royal-press-card-badge">{article.tag}</span>
                            </div>
                            <blockquote className="royal-press-card-quote">
                                {article.quote}
                            </blockquote>
                            <div className="royal-press-card-meta">
                                <span className="royal-press-card-author">— {article.author}</span>
                                <span className="royal-press-card-date">{article.date}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="royal-press-cta">
                    <h3>Experience It Yourself</h3>
                    <p>Don't just take their word for it — come taste the dishes that wowed the nation.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/menu" className="royal-btn-primary" style={{ textDecoration: 'none' }}>
                            View Our Menu ✦
                        </a>
                        <a href="/contact" className="royal-press-cta-outline" style={{ textDecoration: 'none' }}>
                            Contact Us
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PressPage;
