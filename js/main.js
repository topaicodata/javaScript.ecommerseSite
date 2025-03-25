
//Navbar Functionality
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}
let cartItem = document.querySelector('.cart-items-container');
document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
    // cartItem.classList.remove('active');
    // searchForm.classList.remove('active');
    
};


//SearchBar with API integration
const searchBar = document.getElementById('searchBar');
const productBox = document.querySelectorAll('.box-container .box');

searchBar.addEventListener('keyup', (e) => {
    const query = searchBar.value.toLowerCase().trim();
    
    productBox.forEach(box => {
        const titleElement = box.querySelector('h3');
        if (!titleElement) {
            return;
        }
        
        const productName = titleElement.textContent.toLowerCase();
        
        if (productName.includes(query)) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
});


//Cart Item
const addCart = document.querySelectorAll('.cartBtn');
const cartContainer = document.querySelector('#cart-container');

//add item to cart
function addToCart(product) {
    //Create a cartitem
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
    <span class="fas fa-times remove-item"></span>
        <img src="${product.img}" alt="">
        <div class="content">
            <h3>${product.name}</h3>
            <div class="price">Rs.${product.price}</div>
        </div>
    `;

    //Append to cart container before checkout button
    const checkoutBtn = cartContainer.querySelector('.cBtn');
    cartContainer.insertBefore(cartItem, checkoutBtn);

    //Add remove functionality
    cartItem.querySelector('.remove-item').addEventListener('click', () => {
        cartItem.remove();
    });

    console.log(`${product.name} added to cart!`);
}

//Listen for addToCart clicks
addCart.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const box = button.closest('.box');

        const name = box.querySelector('h3').innerText;
        const priceT = box.querySelector('.price').innerText;
        const img = box.querySelector('img').getAttribute('src');

        const priceIn = extractPrice(priceT);
        const product = {
            name: name,
            price: priceIn,
            img: img
        };
        addToCart(product);
    });
});

function extractPrice(price) {
    const priceMatch = price.match(/Rs.\.(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
}