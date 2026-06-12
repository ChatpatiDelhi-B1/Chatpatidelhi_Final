import React, { useEffect, useState } from 'react';
import { getCart, updateQuantity, removeFromCart, getCartTotal, clearCart } from '../utils/cart';
import './cart-panel.css';

export default function CartPanel({ open, onClose }) {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [step, setStep] = useState(1); // 1: Cart, 2: Form
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        date: '',
        time: '',
        address: '',
        message: ''
    });

    useEffect(() => {
        const refresh = () => {
            const c = getCart();
            setItems(c);
            setTotal(getCartTotal());
        };

        refresh();
        const handler = () => refresh();
        window.addEventListener('cartUpdated', handler);
        return () => window.removeEventListener('cartUpdated', handler);
    }, []);

    const changeQty = (id, qty, spiceLevel = null) => {
        updateQuantity(id, qty, spiceLevel);
        const c = getCart();
        setItems(c);
        setTotal(getCartTotal());
    };

    const removeItem = (id, spiceLevel = null) => {
        removeFromCart(id, spiceLevel);
        const c = getCart();
        setItems(c);
        setTotal(getCartTotal());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const sendToWhatsApp = () => {
        const adminNumber = "17329601887"; // Admin Number (USA)

        // Get and increment order number from localStorage
        const lastOrderNum = parseInt(localStorage.getItem('cpd_order_id') || '0');
        const nextOrderNum = lastOrderNum + 1;
        localStorage.setItem('cpd_order_id', nextOrderNum.toString());

        // Format as #001, #002, etc.
        const orderId = nextOrderNum.toString().padStart(3, '0');

        // Spacious Layout
        let message = `CHATPATI DELHI\n`;
        message += `Authentic Indian Catering\n`;
        message += `========================\n\n`;

        message += `ORDER RECEIPT #${orderId}\n`;
        message += `DATE : ${formData.date}\n`;
        message += `TIME : ${formData.time}\n\n`;

        message += `CUSTOMER DETAILS\n`;
        message += `*NAME :* ${formData.name}\n`;
        message += `*MOB  :* ${formData.mobile}\n`;
        message += `*LOC  :* ${formData.address}\n\n`;

        message += `ORDER SUMMARY\n`;
        items.forEach((it, index) => {
            message += `${index + 1}. ${it.name} : ${it.quantity} x ${it.price}\n`;
            if (it.spiceLevel) message += `   (Spice: ${it.spiceLevel})\n`;
        });

        message += `\nTOTAL AMOUNT : $${total.toFixed(2)}\n`;

        if (formData.message) {
            message += `\nNOTE: ${formData.message}\n`;
        }

        message += `\nSent via Website Cart`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${adminNumber}?text=${encodedMessage}`, '_blank');

        // NEW: Clear cart and reset form after sending
        clearCart();
        setFormData({
            name: '',
            mobile: '',
            date: '',
            time: '',
            address: '',
            message: ''
        });
        setStep(1);
        onClose();
    };

    return (
        <aside className={`cart-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
            <div className="cart-panel-header">
                <h3>
                    {step === 1
                        ? 'Your Cart'
                        : `Order Details (Order ${(parseInt(localStorage.getItem('cpd_order_id') || '0') + 1).toString().padStart(3, '0')})`
                    }
                </h3>
                <button className="close-panel" onClick={onClose} aria-label="Close cart">×</button>
            </div>

            <div className="cart-panel-body">
                {step === 1 ? (
                    <>
                        {items.length === 0 && <div className="empty">Your cart is empty</div>}
                        {items.map((it, index) => (
                            <div key={`${it.id}-${it.spiceLevel || 'none'}-${index}`} className="cart-item">
                                <div className="ci-image">
                                    {it.image && typeof it.image === 'string' && (it.image.trim().startsWith('/') || it.image.trim().startsWith('http') || it.image.trim().startsWith('data:')) ? (
                                        <img src={it.image.trim()} alt={it.name} onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                    ) : (
                                        <span style={{ fontSize: '2rem' }}>{it.image ? (typeof it.image === 'string' ? it.image.trim() : it.image) : '🍽️'}</span>
                                    )}
                                    <span className="fallback-emoji" style={{ display: 'none', fontSize: '2rem' }}>🍽️</span>
                                </div>
                                <div className="ci-content">
                                    <div className="ci-details">
                                        <div className="ci-name">
                                            {it.name}
                                            {it.spiceLevel && <span className="spice-indicator"> ({it.spiceLevel})</span>}
                                        </div>
                                        <div className="ci-price">{it.price}</div>
                                    </div>
                                    <div className="ci-actions">
                                        <div className="qty-control">
                                            <button onClick={() => changeQty(it.id, (it.quantity || 1) - 1, it.spiceLevel)} aria-label="Decrease quantity">−</button>
                                            <span>{it.quantity}</span>
                                            <button onClick={() => changeQty(it.id, (it.quantity || 1) + 1, it.spiceLevel)} aria-label="Increase quantity">+</button>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeItem(it.id, it.spiceLevel)} aria-label="Remove item">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="order-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Enter mobile number" required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Delivery/Pickup Address</label>
                            <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Full address" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label>Special Message</label>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific requirements?" rows="2"></textarea>
                        </div>
                    </div>
                )}
            </div>

            <div className="cart-panel-footer">
                <div className="cart-total">Total Amount: <strong>${total.toFixed(2)}</strong></div>
                <div className="cart-actions">
                    {step === 1 ? (
                        <>
                            <button className="btn btn-secondary" onClick={onClose}>Continue Shopping</button>
                            <button className="btn btn-primary" onClick={() => setStep(2)} disabled={items.length === 0}>Next</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back to Cart</button>
                            <button
                                className="btn btn-primary whatsapp-btn"
                                onClick={sendToWhatsApp}
                                disabled={!formData.name || !formData.mobile || !formData.date || !formData.time || !formData.address}
                                style={{ background: '#25D366', border: 'none', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)' }}
                            >
                                Send Order to WhatsApp
                            </button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}
