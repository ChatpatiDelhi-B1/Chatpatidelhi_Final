import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories, menuItems as localMenuItems } from '../data/menuData';
import '../index.css';
import '../dietary.css';
import { useMenu } from '../context/MenuContext';


function MenuPage() {
    const location = useLocation();
    const { menuItems } = useMenu();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [dietaryFilter, setDietaryFilter] = useState('all');
    const [sizzlingFilter, setSizzlingFilter] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isVeg = (item) => {
        if (item.veg !== undefined && item.veg !== null) {
            return item.veg === true || item.veg === 'true' || item.veg === 1 || item.veg === '1';
        }
        // Infer from name if not explicitly defined
        const nonVegKeywords = ['chicken', 'goat', 'lamb', 'fish', 'egg', 'keema', 'mutton', 'prawn', 'non veg', 'non-veg'];
        const lowerName = item.name.toLowerCase();
        const lowerDesc = item.description ? item.description.toLowerCase() : '';

        return !nonVegKeywords.some(keyword => lowerName.includes(keyword) || lowerDesc.includes(keyword));
    };

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());

        let matchesDietary = true;
        if (dietaryFilter === 'veg') {
            matchesDietary = isVeg(item);
        } else if (dietaryFilter === 'non-veg') {
            matchesDietary = !isVeg(item);
        }

        return matchesSearch && matchesDietary;
    });


    // Scroll to category section when navigated back with a hash
    useEffect(() => {
        const hash = location.hash;
        if (!hash) return;

        const categoryId = hash.replace('#category-section-', '');

        const attemptScroll = (tries = 0) => {
            const section = document.getElementById(`category-section-${categoryId}`);
            if (section) {
                const headerOffset = 110;
                const top = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top, behavior: 'smooth' });
                setSelectedCategory(categoryId);
            } else if (tries < 15) {
                setTimeout(() => attemptScroll(tries + 1), 30);
            }
        };

        // Small delay to let React paint the DOM first
        setTimeout(() => attemptScroll(), 30);
    }, [location.hash]);


    const handleCategoryClick = (catId) => {
        setSelectedCategory(catId);
        
        if (catId === 'all') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const section = document.getElementById(`category-section-${catId}`);
        if (section) {
            const headerOffset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="royal-menu-wrapper">
            <div className="container">
                <div className="royal-title-container">
                    <span className="royal-subtitle">A Culinary Journey</span>
                    <h2 className="royal-title">Our Royal Menu</h2>
                    <div className="royal-title-divider">
                        <span>✦</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="royal-search-wrapper">
                    <input
                        type="text"
                        placeholder="Search for dishes (e.g. Samosa, Biryani)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} style={{background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '1.2rem'}}>✕</button>
                    )}
                </div>

                {/* Dietary Filters */}
                <div className="royal-filters-container">
                    <button
                        className={`royal-filter-btn ${dietaryFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setDietaryFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`royal-filter-btn ${dietaryFilter === 'veg' ? 'active' : ''}`}
                        onClick={() => setDietaryFilter('veg')}
                    >
                        <span style={{color: '#2ecc71'}}>●</span> Veg
                    </button>
                    <button
                        className={`royal-filter-btn ${dietaryFilter === 'non-veg' ? 'active' : ''}`}
                        onClick={() => setDietaryFilter('non-veg')}
                    >
                        <span style={{color: '#e74c3c'}}>▲</span> Non-Veg
                    </button>
                </div>

                {/* Category Filters - Desktop */}
                <div className="royal-filters-container desktop-categories" style={{ gap: '0.8rem', marginBottom: '4rem' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`royal-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(cat.id)}
                        >
                            <span>{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Category Filters - Mobile Custom Dropdown */}
                <div className="mobile-category-dropdown">
                    <div className="royal-dropdown-wrapper">
                        <button
                            className="royal-dropdown-trigger"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span>
                                {categories.find(c => c.id === selectedCategory)?.icon} &nbsp;
                                {categories.find(c => c.id === selectedCategory)?.name || 'All'}
                            </span>
                            <span className={`royal-dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
                        </button>

                        {dropdownOpen && (
                            <div className="royal-dropdown-menu">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        className={`royal-dropdown-item ${selectedCategory === cat.id ? 'active' : ''}`}
                                        onClick={() => {
                                            handleCategoryClick(cat.id);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        <span>{cat.icon}</span>
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Products Grouped by Category */}
                <div className="menu-sections-wrapper">
                    {categories.filter(c => c.id !== 'all').map((cat) => {
                        let categoryItems = filteredItems.filter(item => {
                            // If the item category is 'sizzling', treat it as 'tandoor'
                            const itemCat = item.category === 'sizzling' ? 'tandoor' : item.category;
                            return itemCat === cat.id;
                        });

                        // Special filter for 'sizzling' category local toggle
                        if (cat.id === 'sizzling' && sizzlingFilter !== 'all') {
                            categoryItems = categoryItems.filter(item => {
                                if (sizzlingFilter === 'veg') return isVeg(item);
                                if (sizzlingFilter === 'non-veg') return !isVeg(item);
                                return true;
                            });
                        }

                        if (categoryItems.length === 0) return null;

                        return (
                            <div key={cat.id} id={`category-section-${cat.id}`} className="category-section" style={{ marginBottom: '5rem' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '3rem',
                                    gap: '1.5rem'
                                }}>
                                    <h3 className="royal-category-title" style={{ margin: 0, fontSize: '2.8rem' }}>
                                        {cat.name}
                                    </h3>
                                    
                                    {/* Ornamental underline for section title */}
                                    <div style={{ width: '100px', height: '2px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}></div>

                                    {/* Local Filter for Sizzling Section */}
                                    {cat.id === 'sizzling' && (
                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => setSizzlingFilter('all')}
                                                className={`royal-filter-btn ${sizzlingFilter === 'all' ? 'active' : ''}`}
                                                style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}
                                            >All</button>
                                            <button
                                                onClick={() => setSizzlingFilter('veg')}
                                                className={`royal-filter-btn ${sizzlingFilter === 'veg' ? 'active' : ''}`}
                                                style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem', border: sizzlingFilter === 'veg' ? '1px solid #2ecc71' : '' }}
                                            >Veg</button>
                                            <button
                                                onClick={() => setSizzlingFilter('non-veg')}
                                                className={`royal-filter-btn ${sizzlingFilter === 'non-veg' ? 'active' : ''}`}
                                                style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem', border: sizzlingFilter === 'non-veg' ? '1px solid #e74c3c' : '' }}
                                            >Non-Veg</button>
                                        </div>
                                    )}
                                </div>

                                <div className="royal-product-grid">
                                    {categoryItems.map((item) => (
                                        <div key={item.id} className="royal-product-card">
                                            <div style={{position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '5px', zIndex: 2}}>
                                                {item.hot && <span className="royal-badge-hot" style={{position: 'relative', top: 0, left: 0}}>Hot</span>}
                                                {(item.cold === true || item.cold === 'true' || item.cold === 1) && <span className="royal-badge-cold" style={{position: 'relative', top: 0, left: 0}}>Cold</span>}
                                            </div>
                                            <div className={`royal-diet-symbol ${isVeg(item) ? "veg" : "non-veg"}`}></div>
                                            
                                            <div className="royal-product-img-wrapper">
                                                {item.image && typeof item.image === 'string' && (item.image.trim().startsWith('/') || item.image.trim().startsWith('http') || item.image.trim().startsWith('data:')) ? (
                                                    <img src={item.image.trim()} alt={item.name} onError={(e) => { e.target.style.display = 'none'; if(e.target.nextSibling) e.target.nextSibling.style.display = 'inline'; }} />
                                                ) : (
                                                    <span className="royal-product-emoji">{item.image ? item.image.trim() : '🥘'}</span>
                                                )}
                                                <span className="royal-product-emoji fallback-emoji" style={{ display: 'none' }}>🥘</span>
                                            </div>
                                            
                                            <div className="royal-product-info">
                                                <h3 className="royal-product-title">{item.name}</h3>
                                                <p className="royal-product-desc" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                                <div className="royal-product-footer">
                                                    <span className="royal-product-price">{item.price}</span>
                                                    <Link to={`/product/${item.id}`} className="royal-product-btn">
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
        </div>
    );
}

export default MenuPage;
