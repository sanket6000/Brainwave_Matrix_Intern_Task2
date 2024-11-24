// Example Products with Categories
const products = [
    { id: 1, name: "Smartphone", price: 299.99, image: "./Images/Phone1.jpg", category: "electronics" },
    { id: 2, name: "Laptop", price: 799.99, image: "./Images/laptop.avif", category: "electronics" },
    { id: 3, name: "T-Shirt", price: 19.99, image: "./Images/shirt.jpg", category: "fashion" },
    { id: 4, name: "Headphones", price: 59.99, image: "./Images/head.avif", category: "electronics" },
    { id: 5, name: "Sunglasses", price: 25.99, image: "./Images/sun.jpg", category: "accessories" },
];

// Render Products
function renderProducts(filteredProducts) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Filter Products by Search and Category
function filterProducts() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const selectedCategory = document.getElementById("category-filter").value;
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filteredProducts);
}

// Add Product to Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart.`);
}

// Add Product to Wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);

    // Avoid duplicates in the wishlist
    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${product.name} added to wishlist.`);
    } else {
        alert(`${product.name} is already in the wishlist.`);
    }
}

// Display Wishlist on Wishlist Page
if (document.getElementById("wishlist-items")) {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistDiv = document.getElementById("wishlist-items");
    wishlistDiv.innerHTML = "";

    if (wishlistItems.length === 0) {
        wishlistDiv.innerHTML = "<p>Your wishlist is empty.</p>";
    } else {
        wishlistItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "products";
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromWishlist(${item.id})">Remove</button>
            `;
            wishlistDiv.appendChild(itemDiv);
        });
    }
}

// Remove Product from Wishlist
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Item removed from wishlist.");
    location.reload(); // Refresh page to update the displayed wishlist
}

// User storage (mock registration and login)
let users = JSON.parse(localStorage.getItem("users")) || [];

// Handle Registration
function registerUser(email, password) {
    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("User already registered. Please login.");
        return false;
    }

    // Add new user
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    return true;
}

// Handle Login
function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", email);
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to homepage
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

// Handle Form Submission
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    loginUser(email, password);
});

// Handle Registration Link
document.getElementById("register-link")?.addEventListener("click", function (e) {
    e.preventDefault();
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    if (email && password) {
        registerUser(email, password);
    }
});

// Display logged-in user info
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    const userInfo = document.getElementById("user-info");
    if (userInfo) {
        userInfo.innerHTML = `
            <p>Logged in as: ${loggedInUser}</p>
            <button onclick="logout()">Logout</button>
        `;
    }
}

// Handle Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html"; // Redirect to login
}


