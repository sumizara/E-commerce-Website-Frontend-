const products = [
    { id: 1, name: "Floral Summer Dress", price: 49, category: "women", img: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 2, name: "Elegant Saree", price: 89, category: "women", img: "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 3, name: "Women's Denim Jacket", price: 69, category: "women", img: "https://images.pexels.com/photos/1438085/pexels-photo-1438085.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 4, name: "Classic Denim Jacket", price: 79, category: "men", img: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 5, name: "Cotton Formal Shirt", price: 35, category: "men", img: "https://images.pexels.com/photos/7679860/pexels-photo-7679860.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 6, name: "Men's Casual Hoodie", price: 55, category: "men", img: "https://images.pexels.com/photos/5554735/pexels-photo-5554735.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 7, name: "Cartoon T-Shirt", price: 19, category: "kids", img: "https://images.pexels.com/photos/3662861/pexels-photo-3662861.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 8, name: "Kids Denim Overall", price: 29, category: "kids", img: "https://images.pexels.com/photos/3661345/pexels-photo-3661345.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 9, name: "Princess Dress", price: 39, category: "kids", img: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 10, name: "Comfort Fit Kurta", price: 45, category: "elderly", img: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 11, name: "Soft Cotton Shirt", price: 28, category: "elderly", img: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 12, name: "Walking Trousers", price: 42, category: "elderly", img: "https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=300" }
];

const categories = [
    { name: "👗 Women", key: "women" },
    { name: "👔 Men", key: "men" },
    { name: "🧸 Kids", key: "kids" },
    { name: "👴 Elderly", key: "elderly" },
    { name: "✨ All", key: "all" }
];

let activeCategory = "all";
let cart = [];

function renderCategories() {
    const container = document.getElementById("categoryContainer");
    container.innerHTML = categories.map(cat => `
        <div class="cat-card" data-category="${cat.key}">${cat.name}</div>
    `).join("");
    document.querySelectorAll(".cat-card").forEach(card => {
        card.addEventListener("click", () => {
            activeCategory = card.dataset.category;
            renderProducts();
        });
    });
}

function renderProducts() {
    const container = document.getElementById("productsContainer");
    let filtered = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
    if (filtered.length === 0) {
        container.innerHTML = "<p>No products in this category.</p>";
        return;
    }
    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price}</div>
                <button class="btn-add" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join("");
    document.querySelectorAll(".btn-add").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        alert(`🛡️ AI: ${product.name} added to cart. Seller verified.`);
    }
}

function updateCartCount() {
    const cartCountSpan = document.getElementById("cartCount");
    if (cartCountSpan) cartCountSpan.textContent = cart.length;
}

function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(lowerQuery));
    const container = document.getElementById("productsContainer");
    if (filtered.length === 0) {
        container.innerHTML = "<p>No matching products found.</p>";
        return;
    }
    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price}</div>
                <button class="btn-add" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join("");
    document.querySelectorAll(".btn-add").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderProducts();
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        query ? searchProducts(query) : renderProducts();
    });
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            query ? searchProducts(query) : renderProducts();
        }
    });
    document.getElementById("ctaBtn").addEventListener("click", () => {
        alert("✨ AI Assistant: Showing personalized deals for you!");
    });
});
