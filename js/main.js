document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Cart state
    let cart = {
        items: [],
        total: 0
    };

    // Cart DOM elements
    const cartPanel = document.querySelector('.cart-panel');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const subtotalAmount = document.querySelector('.subtotal-amount');

    // Toggle cart
    function toggleCart() {
        cartPanel.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartPanel.classList.contains('active') ? 'hidden' : '';
    }

    // Event listeners for cart toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Add to cart functionality
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent === 'Add to Cart') {
            button.addEventListener('click', function(e) {
                const productCard = e.target.closest('.product-card');
                const product = {
                    id: Date.now(), // Unique ID for the cart item
                    image: productCard.querySelector('.product-image img').src,
                    title: productCard.querySelector('h3').textContent,
                    price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
                    quantity: 1
                };

                addToCart(product);
            });
        }
    });

    // Add item to cart
    function addToCart(product) {
        const existingItem = cart.items.find(item => item.title === product.title);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.items.push(product);
        }

        updateCart();
        toggleCart();
    }

    // Update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cart.total = 0;

        cart.items.forEach(item => {
            cart.total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="cart-item-remove">Remove</button>
                    </div>
                </div>
            `;
        });

        // Update cart count and subtotal
        cartCount.textContent = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        subtotalAmount.textContent = `$${cart.total.toFixed(2)}`;

        // Add event listeners for quantity buttons
        addQuantityListeners();
    }

    // Quantity and remove button listeners
    function addQuantityListeners() {
        cartItemsContainer.querySelectorAll('.cart-item').forEach(item => {
            const id = parseInt(item.dataset.id);
            const cartItem = cart.items.find(i => i.id === id);

            item.querySelector('.minus').addEventListener('click', () => {
                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                    updateCart();
                }
            });

            item.querySelector('.plus').addEventListener('click', () => {
                cartItem.quantity++;
                updateCart();
            });

            item.querySelector('.cart-item-remove').addEventListener('click', () => {
                cart.items = cart.items.filter(i => i.id !== id);
                updateCart();
            });
        });
    }
}); 