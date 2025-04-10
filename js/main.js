// HEAD section start *
// Show/hide the Navbar for responsive design
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}
// Show/hide the CartItem
let cartItem = document.querySelector('.cart-items-container');
document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}
// Show/hide the SearchForm
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}
//Hide active bar when scrolling
window.onscroll = () => {
    navbar.classList.remove('active');
    // cartItem.classList.remove('active');
    // searchForm.classList.remove('active');
};
//Live search filter
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

//Cart Item start *
const addCart = document.querySelectorAll('.cartBtn');
const cartContainer = document.querySelector('#cart-container');
//Create a container for total calculation
const totalContainer = document.createElement('div');
totalContainer.classList.add('cart-total');
//Add subtotal elements
totalContainer.innerHTML = `
<div class="subtotal">Subtotal: Rs.0</div>
<div class="sales-tax">Sales Tax (13%): Rs.0</div>
<div class="coupon">
    <labes>Coupon Code: </label>
    <input type="text" id="coupon-code" placeholder="Enter code">
    <button id="apply-coupon">Apply</button>
</div>
<h3 class="final-total">Total: Rs.0</h3>
`;
//Append total section to cart container
cartContainer.appendChild(totalContainer);

let cartItemStore = []; //store cart item
let subTotal = 0;
let salesTaxRate = 0.13; //13% sates tax
let discount = 0;

//Add item to cart
function addItemCart(product) {
    let existingItem = cartItemStore.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.total = existingItem.quantity * existingItem.price;
        } else {
            product.quantity = 1;
            product.total = product.price;
            cartItemStore.push(product);
        }
    updateCartDisplay();
}

//Update cart display
function updateCartDisplay() {
    //clear the cart container
    cartContainer.innerHTML = "";
    //Create cart header
    const cartHeader = document.createElement('div');
    cartHeader.classList.add('cart-header');
    cartHeader.innerHTML = `
    <div>Item</div>
    <div>Price</div>
    <div>Quantity</div>
    <div>Total</div>
    <div>Action</div>
    `;
    cartContainer.appendChild(cartHeader);
    
    let cartItemContainer = document.createElement('div');
    cartItemContainer.classList.add('cart-item-container');
    cartItemStore.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-img"><img src="${item.img}" alt=""></div>
            <div class="item-price">Rs.${item.price}</div>
            <div class="cart-qty">
                <button class="decrease" data-index="${index}">-</button>
                ${item.quantity}
                <button class="increase" data-index="${index}">+</button>
            </div>
            <div class="cart-itm-total">Rs.${item.total}</div>
            <button class="remove-item" data-index="${index}">x</button>
            `;
        cartItemContainer.appendChild(cartItem);
    });
    cartContainer.appendChild(cartItemContainer);
    cartContainer.appendChild(totalContainer);
    updateTotal();
}

//Update subtotal, tax and total
function updateTotal() {
    subTotal = cartItemStore.reduce((sum, item) => sum + item.total, 0);
    let salesTax = subTotal * salesTaxRate;
    let finalTotal = subTotal + salesTax - discount;
    document.querySelector('.subtotal').innerHTML = `Subtotal: Rs.${subTotal}`;
    document.querySelector('.sales-tax').innerHTML = `Sales Tax (13%): Rs.${salesTax.toFixed(2)}`;
    document.querySelector('.final-total').innerHTML = `Total: Rs.${finalTotal.toFixed(2)}`;
}

//Event listener for adding item
addCart.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const box = button.closest('.box');
        const name = box.querySelector('h3').innerText;
        const priceT = box.querySelector('.price').innerText;
        const img = box.querySelector('img').getAttribute('src');
        const priceIn = extractPrice(priceT);
        const product = {
            name,
            price: priceIn,
            img
        };
        addItemCart(product);
    });
});

//Extract price from string
function extractPrice(price) {
    const priceMatch = price.match(/Rs\.*\s*(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
}

//Event listener for increasing and decreasing quantity
cartContainer.addEventListener('click', (e) => {
    let index = e.target.getAttribute('data-index');
    if (e.target.classList.contains('increase')) {
        cartItemStore[index].quantity++;
        cartItemStore[index].total = cartItemStore[index].quantity * cartItemStore[index].price;
        updateCartDisplay();
    }
    if (e.target.classList.contains('decrease')) {
        if (cartItemStore[index].quantity > 1) {
            cartItemStore[index].quantity--;    
            cartItemStore[index].total = cartItemStore[index].quantity * cartItemStore[index].price;
            updateCartDisplay();
        }
    }
    if (e.target.classList.contains('remove-item')) {
        cartItemStore.splice(index, 1);
        updateCartDisplay();
    }
});

//Apply coupon discount
document.getElementById('apply-coupon').addEventListener('click', () => {
    const couponCode = document.getElementById('coupon-code').value;
    if (couponCode === "DISCOUNT10") {
        discount = subTotal * 0.1; //10% discount
    } else {
        discount = 0;
    }
    updateTotal();
});
// Cart item end *

//HEAD section end*



//BODY section start*
//Background image blur on scroll
const blurEffect = document.body.querySelector('.blur')
window.addEventListener("scroll", () => {
    let blurValue = Math.min(window.scrollY / 100, 10);
    blurEffect.style.backdropFilter = `blur(${blurValue}px)`;
});


//Wholesale Size, Colour and Quantity overlay
// document.querySelectorAll('.linkBtn').forEach(link => {
//     link.addEventListener('click', function (e) {
//         e.preventDefault();
//         const box = this.closest('.box');
//         box.classList.add('show-options', 'blur');
//     });
// });

// document.querySelectorAll('.closeBtn').forEach(button => {
//     button.addEventListener('click', function() {
//         const box = this.closest('.box');
//         box.classList.remove('show-options', 'blur');
//     });
// });

//Contact Fetch
// const form = document.getElementById("contact");
// form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const formData = new FormData(form)
//     const data = Object.fromEntries(formData.entries());
    
    fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ contact, email, phone })
    });
//     const result = await response.json();
//     alert(result.message || "Submitted" );
// });