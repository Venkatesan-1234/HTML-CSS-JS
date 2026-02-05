const products = [
    { id: 1, name: 'Silk Blend Shirt', category: 'clothing', price: 129, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500' },
    { id: 2, name: 'Linen Summer Dress', category: 'clothing', price: 189, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500' },
    { id: 3, name: 'Cashmere Sweater', category: 'clothing', price: 249, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500' },
    { id: 4, name: 'Tailored Blazer', category: 'clothing', price: 329, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500' },
    { id: 5, name: 'Leather Crossbody Bag', category: 'accessories', price: 159, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500' },
    { id: 6, name: 'Gold Chain Necklace', category: 'accessories', price: 89, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { id: 7, name: 'Minimalist Watch', category: 'accessories', price: 199, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500' },
    { id: 8, name: 'Leather Loafers', category: 'shoes', price: 179, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500' },
    { id: 9, name: 'Canvas Sneakers', category: 'shoes', price: 119, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' },
    { id: 10, name: 'Ankle Boots', category: 'shoes', price: 229, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500' },
    { id: 11, name: 'Wide Leg Trousers', category: 'clothing', price: 149, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500' },
    { id: 12, name: 'Silk Scarf', category: 'accessories', price: 79, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500' }
];

let cart = [];
let currentFilter = 'all';

function renderProducts(filter = 'all') {
    const grid = document.getElementById('products-grid');
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showNotification('Item added to cart');
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-category">${item.category}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    updateTotals();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    
    if (document.getElementById('checkout-subtotal')) {
        document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function openCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    const checkoutItems = document.getElementById('checkout-items');
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    updateTotals();
    
    document.getElementById('checkout-modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    toggleCart();
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    if (!document.getElementById('cart-sidebar').classList.contains('active')) {
        document.getElementById('overlay').classList.remove('active');
    }
}

function generateOrderNumber() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}

function handleCheckout(e) {
    e.preventDefault();
    
    const orderNumber = generateOrderNumber();
    document.getElementById('order-number').textContent = orderNumber;
    
    closeModal('checkout-modal');
    document.getElementById('success-modal').classList.add('active');
    
    cart = [];
    updateCart();
    
    e.target.reset();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: #1a1a1a;
        color: white;
        padding: 16px 32px;
        border-radius: 4px;
        z-index: 4000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            currentFilter = filter;
            renderProducts(filter);
        });
    });
    
    document.querySelector('.cart-btn').addEventListener('click', toggleCart);
    document.querySelector('.close-cart').addEventListener('click', toggleCart);
    document.getElementById('overlay').addEventListener('click', () => {
        toggleCart();
        closeModal('checkout-modal');
        closeModal('success-modal');
    });
    
    document.getElementById('checkout-btn').addEventListener('click', openCheckout);
    
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
    
    document.getElementById('close-success').addEventListener('click', () => {
        closeModal('success-modal');
    });
    
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you! We will get back to you soon.');
        e.target.reset();
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.getElementById('cardNumber').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
    
    document.getElementById('expiry').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
    
    document.getElementById('cvv').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });
});