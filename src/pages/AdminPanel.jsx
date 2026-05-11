import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { menuItems as localMenuItems } from '../data/menuData';

const categories = ['all', 'chaat', 'mumbai', 'snacks', 'sizzling', 'biryani', 'curry', 'bread', 'parantha', 'rolls', 'sweets', 'drinks'];

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'chaat',
    image: '',
    hot: false,
    description: '',
    veg: true,
    username: '',
    password: ''
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
    }
  }, [isAuthenticated]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        console.warn('API error, falling back to local data');
        setItems(localMenuItems);
        setError(null);
      }
    } catch (err) {
      console.warn('Backend not running, using local data:', err.message);
      setItems(localMenuItems);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      ...item,
      username: '',
      password: ''
    });
    setShowModal(true);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`/api/menu/${deleteTargetId}`, { method: 'DELETE' });
      showNotification('Item deleted successfully');
      setShowConfirmModal(false);
      setDeleteTargetId(null);
      fetchItems();
    } catch (err) {
      showNotification('Failed to delete item', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId 
      ? `/api/menu/${editingId}` 
      : '/api/menu';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setShowModal(false);
        setEditingId(null);
        showNotification(editingId ? 'Item updated successfully' : 'New item added successfully');
        setFormData({ name: '', price: '', category: 'chaat', image: '', hot: false, description: '', veg: true, username: '', password: '' });
        fetchItems();
      }
    } catch (err) {
      showNotification('Error saving item', 'error');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      showNotification('Uploading image...', 'info');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      if (data.imageUrl) {
        setFormData({ ...formData, image: data.imageUrl });
        showNotification('Image uploaded successfully!');
      }
    } catch (err) {
      showNotification('Image upload failed', 'error');
    }
  };

  const filteredItems = items.filter(item => {
    const name = item.name || '';
    const category = item.category || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <div className="login-split-container">
        {/* Left Side: Branding */}
        <div className="login-left-panel">
          <div className="panel-content">
            <div className="logo-huge">CPD</div>
            <h1>Chatpati Delhi</h1>
            <div className="divider-gold"></div>
            <h3>Master Culinary Control</h3>
            <p>Welcome to the Royal Management Suite. Manage your menu, track statistics, and maintain the authentic flavors of Delhi from one central dashboard.</p>
            
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span>Real-time Menu Updates</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Product Statistics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <span>Secure Access Control</span>
              </div>
            </div>
          </div>
          <div className="panel-footer">
            <p>© 2026 Chatpati Delhi Hospitality Group | Version 2.0</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-right-panel">
          <div className="login-box-clean">
            <div className="login-header-clean">
              <h2>Administrator Login</h2>
              <p>Please enter your credentials to continue</p>
            </div>

            <form className="login-form-clean" onSubmit={(e) => {
              e.preventDefault();
              if (formData.username === 'admin@chatpatidelhi.com' && formData.password === 'Chatpati@2026') {
                setIsAuthenticated(true);
              } else {
                showNotification('Invalid credentials provided', 'error');
              }
            }}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="text" 
                  placeholder="admin@chatpatidelhi.com" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})} 
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  required
                />
              </div>
              
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <span className="forgot-pass">Forgot Password?</span>
              </div>

              <button type="submit" className="login-btn-premium">
                <span>Sign In to Dashboard</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Toast Notification */}
      {notification && (
        <div className={`admin-toast ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="logo-mini">CPD</div>
          <h3>Admin Panel</h3>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">📦 Menu Items</button>
          <button className="nav-item">📊 Statistics</button>
          <button className="nav-item">⚙️ Settings</button>
          <div className="sidebar-divider"></div>
          <button className="nav-item logout" onClick={() => setIsAuthenticated(false)}>🚪 Logout</button>
        </nav>
      </aside>

      <main className="admin-content">
        <header className="content-header">
          <div className="header-title">
            <h1>Menu Management</h1>
            <p>Manage 120+ authentic Delhi street food items</p>
          </div>
          <button className="add-item-btn" onClick={() => {
            setEditingId(null);
            setFormData({ name: '', price: '', category: 'chaat', image: '', hot: false, description: '', veg: true, username: '', password: '' });
            setShowModal(true);
          }}>+ New Item</button>
        </header>

        <section className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">🍲</div>
            <div className="stat-info">
              <span className="stat-label">Total Dishes</span>
              <span className="stat-value">{items.length}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon veg">🌿</div>
            <div className="stat-info">
              <span className="stat-label">Vegetarian</span>
              <span className="stat-value">{items.filter(i => i.veg).length}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon hot">🔥</div>
            <div className="stat-info">
              <span className="stat-label">Featured</span>
              <span className="stat-value">{items.filter(i => i.hot).length}</span>
            </div>
          </div>
        </section>

        <section className="management-controls">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </section>

        <div className="table-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item Details</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td>
                      <div className="item-cell">
                        <div className="item-preview">
                          {(item.image && (item.image.startsWith('/') || item.image.startsWith('http'))) ? <img src={item.image} alt="" /> : <span>{item.image || '🥘'}</span>}
                        </div>
                        <div className="item-text">
                          <strong>{item.name}</strong>
                          <p>{((item.description || "").replace(/<[^>]*>/g, "") || "").substring(0, 50)}{(item.description || "").length > 50 ? "..." : ""}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge-cat ${item.category}`}>{item.category}</span></td>
                    <td className="item-price">{item.price}</td>
                    <td>
                      <div className="status-tags">
                        {item.veg && <span className="tag-veg">Veg</span>}
                        {item.hot && <span className="tag-hot">Hot</span>}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <button className="btn-icon edit" title="Edit" onClick={() => handleEdit(item)}>✏️</button>
                      <button className="btn-icon delete" title="Delete" onClick={() => handleDeleteClick(item.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredItems.length === 0 && (
              <div className="empty-state">
                <p>No items found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <button className="close-modal" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group full">
                  <label>Item Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    required 
                    placeholder="e.g. Special Samosa"
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input 
                    type="text" 
                    value={formData.price} 
                    required 
                    placeholder="e.g. $8.95"
                    onChange={(e) => setFormData({...formData, price: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group full">
                  <label>Image URL, Emoji, or Upload Local</label>
                  <div className="upload-group">
                    <input 
                      type="text" 
                      value={formData.image} 
                      placeholder="/images/dish.png or 🥘"
                      onChange={(e) => setFormData({...formData, image: e.target.value})} 
                    />
                    <div className="file-input-wrapper">
                      <div className="file-input-btn">📁 Upload</div>
                      <input type="file" accept="image/*" onChange={handleFileUpload} />
                    </div>
                  </div>
                </div>
                <div className="form-group full">
                  <label>Description</label>
                  <textarea 
                    value={formData.description} 
                    rows="3"
                    placeholder="Describe the dish..."
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
                <div className="form-group-row">
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={formData.veg} 
                      onChange={(e) => setFormData({...formData, veg: e.target.checked})} 
                    />
                    <span>Vegetarian</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={formData.hot} 
                      onChange={(e) => setFormData({...formData, hot: e.target.checked})} 
                    />
                    <span>Spicy / Hot</span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="modal-container confirm-modal">
            <div className="modal-header">
              <h2>Confirm Deletion</h2>
              <button className="close-modal" onClick={() => setShowConfirmModal(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ padding: '2rem', textAlign: 'center' }}>
              <div className="confirm-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className="btn-primary delete-confirm-btn" style={{ background: '#e74c3c' }} onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
