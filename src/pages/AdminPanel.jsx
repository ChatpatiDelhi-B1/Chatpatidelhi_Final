import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useMenu } from '../context/MenuContext';
import { categories } from '../data/menuData';
import './AdminPanel.css';

function AdminPanel() {
    const { menuItems, refreshMenu } = useMenu();
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // CRUD state
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    // Modal & Form state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'chaat',
        image_url: '',
        veg: true,
        hot: false,
        cold: false
    });
    const [imageFile, setImageFile] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formError, setFormError] = useState('');

    // Check current auth session
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Load data when session is active
    useEffect(() => {
        if (session) {
            fetchDbItems();
        }
    }, [session]);

    const fetchDbItems = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error('Error loading DB items:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Login Handler
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setErrorMessage('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        } catch (error) {
            setErrorMessage(error.message || 'Invalid email or password');
        } finally {
            setLoginLoading(false);
        }
    };

    // Logout Handler
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    // Open Modal for Add
    const handleAddClick = () => {
        setEditingItem(null);
        setFormData({
            name: '',
            price: '',
            description: '',
            category: 'chaat',
            image_url: '',
            veg: true,
            hot: false,
            cold: false
        });
        setImageFile(null);
        setFormError('');
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleEditClick = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            price: item.price,
            description: item.description || '',
            category: item.category,
            image_url: item.image_url || '',
            veg: item.veg ?? true,
            hot: item.hot ?? false,
            cold: item.cold ?? false
        });
        setImageFile(null);
        setFormError('');
        setIsModalOpen(true);
    };

    // Delete Handler
    const handleDeleteClick = async (id, imageUrl) => {
        if (!window.confirm('Are you absolutely sure you want to delete this menu item?')) return;

        try {
            setLoading(true);

            // 1. Delete from Supabase Database
            const { error: dbError } = await supabase
                .from('menu_items')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;

            // 2. Try to clean up image from storage bucket if it exists and is ours
            if (imageUrl && imageUrl.includes('/storage/v1/object/public/product-images/')) {
                const pathParts = imageUrl.split('/product-images/');
                if (pathParts.length > 1) {
                    const fileName = pathParts[1];
                    await supabase.storage.from('product-images').remove([fileName]);
                }
            }

            alert('Menu item deleted successfully! ✅');
            fetchDbItems();
            refreshMenu();
        } catch (error) {
            alert('Delete failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Form Change Handlers
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Submit Add/Edit Form
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setFormError('');

        try {
            let finalImageUrl = formData.image_url;

            // 1. Handle File Upload if selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(filePath, imageFile, { upsert: true });

                if (uploadError) throw new Error('Image upload failed: ' + uploadError.message);

                const { data: { publicUrl } } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(filePath);

                finalImageUrl = publicUrl;
            }

            const itemPayload = {
                name: formData.name,
                price: formData.price,
                description: formData.description,
                category: formData.category,
                image_url: finalImageUrl,
                veg: formData.veg,
                hot: formData.hot,
                cold: formData.cold
            };

            if (editingItem) {
                // Update
                const { error } = await supabase
                    .from('menu_items')
                    .update(itemPayload)
                    .eq('id', editingItem.id);

                if (error) throw error;
                alert('Product updated successfully! 📝');
            } else {
                // Insert
                const { error } = await supabase
                    .from('menu_items')
                    .insert([itemPayload]);

                if (error) throw error;
                alert('New product added successfully! 🎉');
            }

            setIsModalOpen(false);
            fetchDbItems();
            refreshMenu();
        } catch (error) {
            setFormError(error.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    // Filter items
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Render Login Screen if not logged in
    if (!session) {
        return (
            <div className="admin-login-wrapper">
                <div className="admin-login-card">
                    <div className="admin-login-header">
                        <h2>Chatpati Delhi</h2>
                        <p>👑 Admin Panel Access 👑</p>
                    </div>
                    {errorMessage && <div className="admin-login-error">{errorMessage}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="admin-login-field">
                            <label>Admin Email</label>
                            <input
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="admin-login-field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="admin-login-btn" disabled={loginLoading}>
                            {loginLoading ? 'Authenticating...' : 'Secure Log In'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Render Admin Dashboard
    return (
        <div className="admin-dashboard-wrapper">
            <div className="container">
                <div className="admin-header-row">
                    <div>
                        <h2 className="admin-title">Menu Management Console</h2>
                        <p className="admin-subtitle">Add, edit, or remove dishes instantly</p>
                    </div>
                    <div className="admin-header-actions">
                        <button className="admin-add-btn" onClick={handleAddClick}>
                            <span>✦</span> Add New Dish
                        </button>
                        <button className="admin-logout-btn" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Filters / Search Bar */}
                <div className="admin-filters-card">
                    <div className="admin-search-box">
                        <input
                            type="text"
                            placeholder="Search dishes by name or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="admin-category-selector">
                        <button 
                            className={`admin-cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('all')}
                        >
                            All Categories
                        </button>
                        {categories.filter(c => c.id !== 'all').map(cat => (
                            <button
                                key={cat.id}
                                className={`admin-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Table */}
                <div className="admin-table-container">
                    {loading ? (
                        <div className="admin-spinner-box">
                            <div className="admin-spinner"></div>
                            <p>Querying Postgres Database...</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="admin-empty-state">
                            <p>No products found matching your search. Create one to get started!</p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Dietary</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td className="admin-cell-image">
                                            <div className="admin-img-preview">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name} />
                                                ) : (
                                                    <span className="admin-emoji-fallback">🥘</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="admin-cell-info">
                                            <strong className="admin-item-name">{item.name}</strong>
                                            <p className="admin-item-desc" dangerouslySetInnerHTML={{ __html: item.description || 'No description' }}></p>
                                        </td>
                                        <td className="admin-cell-category">
                                            <span className="admin-cat-tag">{categories.find(c => c.id === item.category)?.name || item.category}</span>
                                        </td>
                                        <td className="admin-cell-price">{item.price}</td>
                                        <td className="admin-cell-diet">
                                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                                <span className={`admin-badge ${item.veg ? 'veg' : 'nonveg'}`}>
                                                    {item.veg ? '● Veg' : '▲ Non-Veg'}
                                                </span>
                                                {item.hot && <span className="admin-badge hot">🌶️ Spicy</span>}
                                                {item.cold && <span className="admin-badge cold">❄️ Cold</span>}
                                            </div>
                                        </td>
                                        <td className="admin-cell-actions">
                                            <div className="admin-action-row">
                                                <button className="admin-edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                                                <button className="admin-delete-btn" onClick={() => handleDeleteClick(item.id, item.image_url)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Form Modal (Add / Edit) */}
            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-card">
                        <div className="admin-modal-header">
                            <h3>{editingItem ? 'Edit Product Details' : 'Add New Product'}</h3>
                            <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
                        </div>
                        {formError && <div className="admin-modal-error">{formError}</div>}
                        
                        <form onSubmit={handleFormSubmit} className="admin-form">
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Product Name <span className="required">*</span></label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        placeholder="e.g. Aloo Paratha" 
                                        required 
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Price <span className="required">*</span></label>
                                    <input 
                                        type="text" 
                                        name="price" 
                                        value={formData.price} 
                                        onChange={handleInputChange} 
                                        placeholder="e.g. $11.95" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Category <span className="required">*</span></label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} required>
                                        {categories.filter(c => c.id !== 'all').map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="admin-form-group">
                                    <label>Upload Product Image (Recommended)</label>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                    />
                                    <p className="admin-input-tip">Upload an image file (.png, .jpg, .webp). It goes straight to the Supabase Storage CDN.</p>
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Or Provide Image URL Link (Fallback)</label>
                                <input 
                                    type="text" 
                                    name="image_url" 
                                    value={formData.image_url} 
                                    onChange={handleInputChange} 
                                    placeholder="e.g. /images/paranthas/Aloo Paratha.png" 
                                />
                            </div>

                            <div className="admin-form-group">
                                <label>Description</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter description..." 
                                    rows="3"
                                />
                            </div>

                            <div className="admin-form-group-checkboxes">
                                <label className="admin-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        name="veg" 
                                        checked={formData.veg} 
                                        onChange={handleInputChange} 
                                    />
                                    Is Vegetarian? (Green Dot)
                                </label>
                                <label className="admin-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        name="hot" 
                                        checked={formData.hot} 
                                        onChange={handleInputChange} 
                                    />
                                    Is Spicy / Hot? (Spicy Badge)
                                </label>
                                <label className="admin-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        name="cold" 
                                        checked={formData.cold} 
                                        onChange={handleInputChange} 
                                    />
                                    Is Cold? (Cold Badge)
                                </label>
                            </div>

                            <div className="admin-modal-actions">
                                <button type="button" className="admin-cancel-btn" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-submit-btn" disabled={submitLoading}>
                                    {submitLoading ? 'Saving changes...' : editingItem ? 'Save Updates' : 'Add to Menu'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPanel;
