import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/menuData';
import '../index.css';
import '../dietary.css';


function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [dietaryFilter, setDietaryFilter] = useState('all');
    const [sizzlingFilter, setSizzlingFilter] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('/api/menu');
                if (response.ok) {
                    const data = await response.json();
                    setMenuItems(data);
                } else {
                    console.error('Failed to fetch menu items');
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const isVeg = (item) => {
        if (item.veg !== undefined) return item.veg;
        // Infer from name if not explicitly defined
        const nonVegKeywords = ['chicken', 'goat', 'lamb', 'fish', 'egg', 'keema', 'mutton', 'prawn', 'non veg', 'non-veg'];
        const lowerName = item.name.toLowerCase();
        const lowerDesc = item.description ? item.description.toLowerCase() : '';

        return !nonVegKeywords.some(keyword => lowerName.includes(keyword) || lowerDesc.includes(keyword));
    };

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesDietary = true;
        if (dietaryFilter === 'veg') {
            matchesDietary = isVeg(item);
        } else if (dietaryFilter === 'non-veg') {
            matchesDietary = !isVeg(item);
        }

        return matchesCategory && matchesSearch && matchesDietary;
    });

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
                            onClick={() => setSelectedCategory(cat.id)}
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
                                            setSelectedCategory(cat.id);
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
                    <div>
                        {/* Get unique categories from filtered items */}
                        {Array.from(new Set(filteredItems.map(item => item.category))).map(categorySlug => {
                            const categoryName = categories.find(cat => cat.id === categorySlug)?.name || categorySlug;
                            let categoryItems = filteredItems.filter(item => item.category === categorySlug);

                            // Special filter for 'sizzling' category
                            if (categorySlug === 'sizzling' && sizzlingFilter !== 'all') {
                                categoryItems = categoryItems.filter(item => {
                                    if (sizzlingFilter === 'veg') return isVeg(item);
                                    if (sizzlingFilter === 'non-veg') return !isVeg(item);
                                    return true;
                                });
                            }

                            if (categoryItems.length === 0 && sizzlingFilter === 'all') return null;

                            return (
                                <div key={categorySlug} className="category-section" style={{ marginBottom: '4rem' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: '2rem',
                                        gap: '1rem'
                                    }}>
                                        <h3 className="royal-category-title" style={{ margin: 0 }}>
                                            {categoryName}
                                        </h3>

                                        {/* Local Filter for Sizzling Section */}
                                        {categorySlug === 'sizzling' && (
                                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                                <button
                                                    onClick={() => setSizzlingFilter('all')}
                                                    className={`royal-filter-btn ${sizzlingFilter === 'all' ? 'active' : ''}`}
                                                    style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                                                >All</button>
                                                <button
                                                    onClick={() => setSizzlingFilter('veg')}
                                                    className={`royal-filter-btn ${sizzlingFilter === 'veg' ? 'active' : ''}`}
                                                    style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', border: sizzlingFilter === 'veg' ? '1px solid #2ecc71' : '' }}
                                                >Veg</button>
                                                <button
                                                    onClick={() => setSizzlingFilter('non-veg')}
                                                    className={`royal-filter-btn ${sizzlingFilter === 'non-veg' ? 'active' : ''}`}
                                                    style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', border: sizzlingFilter === 'non-veg' ? '1px solid #e74c3c' : '' }}
                                                >Non-Veg</button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="royal-product-grid">
                                        {categoryItems.map((item) => (
                                            <div key={item.id} className="royal-product-card">
                                                {item.hot && <span className="royal-badge-hot">Hot</span>}
                                                <div className={`royal-diet-symbol ${isVeg(item) ? "veg" : "non-veg"}`}></div>
                                                
                                                <div className="royal-product-img-wrapper">
                                                    {item.image.startsWith('/') || item.image.startsWith('http') ? (
                                                        <img src={item.image} alt={item.name} />
                                                    ) : (
                                                        <span className="royal-product-emoji">{item.image}</span>
                                                    )}
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
