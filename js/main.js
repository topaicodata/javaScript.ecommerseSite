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

//Protocol
// let protocol = window.location.protocol;
// let domain = window.location.hostname;
// console.log(`Protocol: ${protocol}`);
// console.log(`Domin: ${domain}`);

//Access variable - URL
// console.log(process.env.TZ);

async () => {
    //Try catch
    try {
        await fetch('');
    }
}

//Search bar keyword track
let searchBar = document.getElementById('search-box');
let productSearch = [];

searchBar.addEventListener('keyup', (e) => {
    let searchStr = e.target.value;
    let filterProducts = productSearch.filter((product) => {
        return (
            product.name.includes(searchStr) || 
            product.house.includes(searchStr)
        );
    });
    console.log(filterProducts);
});

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}