import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { menuItems, categories } from '../data/menuData';
import './Royal.css';

const CateringPage = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSelectionBar, setShowSelectionBar] = useState(false);

    // Categories specifically for catering
    const cateringCategories = [
        { id: 'all', name: 'All Items' },
        { id: 'chaat', name: 'Appetizers & Chaat' },
        { id: 'mumbai', name: 'Mumbai Specials' },
        { id: 'curry', name: 'Main Course Curries' },
        { id: 'biryani', name: 'Biryani Selection' },
        { id: 'bread', name: 'Tandoori Breads' },
        { id: 'sweets', name: 'Desserts' }
    ];

    const toggleItemSelection = (item) => {
        setSelectedItems(prev => {
            const isSelected = prev.find(i => i.id === item.id);
            if (isSelected) {
                return prev.filter(i => i.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    useEffect(() => {
        setShowSelectionBar(selectedItems.length > 0);
    }, [selectedItems]);

    const clearSelection = () => {
        setSelectedItems([]);
    };

    const handleWhatsAppInquiry = () => {
        const itemList = selectedItems.map(item => `• ${item.name}`).join('\n');
        const message = `Namaste! I am interested in catering services for an event.\n\nHere are the items I've selected from your menu:\n${itemList}\n\nPlease provide a quote and availability for these items. Thank you!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/17329860129?text=${encodedMessage}`, '_blank');
    };

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="royal-page">
            <div className="royal-menu-wrapper">
                <div className="container">
                    
                    {/* Header */}
                    <div className="royal-title-container">
                        <span className="royal-subtitle">Event Planning</span>
                        <h1 className="royal-title">Catering Menu Builder</h1>
                        <div className="royal-title-divider"><span>✦</span></div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '700px', margin: '1.5rem auto 0', lineHeight: '1.8' }}>
                            Design your perfect event menu. Select the items you'd like to include, 
                            and our events team will reach out with a custom quote.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="royal-search-wrapper">
                        <div className="search-icon">🔍</div>
                        <input 
                            type="text" 
                            placeholder="Search dishes (e.g. Samosa, Chaat, Paneer...)" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button 
                                className="search-clear-btn" 
                                onClick={() => setSearchTerm('')}
                                style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: '0 15px' }}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category Filter */}
                    <div className="royal-filters-container" style={{ marginBottom: '3rem' }}>
                        {cateringCategories.map(cat => (
                            <button
                                key={cat.id}
                                className={`royal-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="royal-catering-selection-list">
                        {filteredItems.map(item => {
                            const isSelected = selectedItems.find(i => i.id === item.id);
                            return (
                                <div 
                                    key={item.id} 
                                    className={`royal-selection-horizontal-card ${isSelected ? 'selected' : ''}`}
                                    onClick={() => toggleItemSelection(item)}
                                >
                                    <div className="royal-selection-left">
                                        <div className="royal-selection-checkbox">
                                            {isSelected ? <span>✓</span> : null}
                                        </div>
                                        <div className="royal-selection-img-wrapper">
                                            <img src={item.image} alt={item.name} onError={(e) => e.target.src = '/avatar.png'} />
                                        </div>
                                    </div>
                                    <div className="royal-selection-content">
                                        <div className="royal-selection-text-wrap">
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                        <Link 
                                            to={`/product/${item.id}`} 
                                            className="royal-selection-view-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Floating Selection Bar (SA Caterers Style) */}
            <div className={`royal-selection-float-bar ${showSelectionBar ? 'visible' : ''}`}>
                <div className="container">
                    <div className="royal-float-bar-content">
                        <div className="royal-float-summary">
                            <div className="royal-float-count">{selectedItems.length}</div>
                            <div className="royal-float-text">
                                <h4>Items Selected</h4>
                                <p>Ready to customize your menu?</p>
                            </div>
                        </div>
                        <div className="royal-float-actions">
                            <button className="royal-float-clear" onClick={clearSelection}>Clear All</button>
                            <button className="royal-float-whatsapp" onClick={handleWhatsAppInquiry}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.403 0 6.556-5.332 11.89-11.891 11.89-2.015 0-3.991-.513-5.744-1.487l-6.252 1.706zm5.865-3.409l.363.214c1.452.863 3.191 1.319 4.973 1.319 5.257 0 9.535-4.278 9.535-9.535 0-2.546-1.002-4.941-2.82-6.756s-4.21-2.818-6.715-2.818c-5.257 0-9.535 4.278-9.535 9.535 0 1.907.556 3.763 1.609 5.362l.235.358-.996 3.639 3.729-.982zM16.598 13.911c-.302-.151-1.785-.881-2.062-.981-.277-.1-.478-.151-.679.151s-.779.981-.955 1.181c-.176.2-.351.226-.654.076-.302-.151-1.276-.47-2.431-1.5-.898-.801-1.503-1.791-1.68-2.091s-.019-.462.132-.612c.135-.135.302-.351.453-.527.151-.176.201-.302.302-.503.1-.2.05-.377-.025-.527s-.679-1.634-.93-2.237c-.244-.588-.492-.51-.679-.519-.176-.01-.377-.01-.578-.01s-.527.075-.804.377c-.277.302-1.056 1.031-1.056 2.514s1.081 2.916 1.232 3.117c.151.201 2.127 3.248 5.153 4.553.719.31 1.28.496 1.718.636.723.23 1.381.197 1.901.12.579-.086 1.785-.73 2.037-1.434.252-.704.252-1.307.176-1.433-.076-.126-.277-.202-.579-.352z"/></svg>
                                Enquire via WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CateringPage;
