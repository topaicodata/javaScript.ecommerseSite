//Navbar

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
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
    
};

//SearchBar functionality
let result = document.getElementById('result');

let searchBar = document.getElementById('search-box');
let productSearch = [];


searchBar.addEventListener('keyup', (e) => {
    
    let searchStr = e.target.value;
    let filterProducts = productSearch.filter( product => {
        return product.name.includes(searchStr);
        
    });
    console.log('Filtered:', filterProducts);
});

//Fetch API data
let loadProduct = async () => {
    try {
        let res = await fetch('http://localhost:4400/api/data');
        productSearch = await res.json();
        displayProduct(productSearch);
        console.log(productSearch);
    } catch (err) {
        console.error(err);
    }
};

// fetch('http://localhost:4400/api/data')
//     .then(response => response.json())
//     .then(data => {
//         productSearch = data;
//         console.log('Fetched data:', productSearch);
//     })
//     .catch(error => console.log('Error:', error));


function displayResult(data) {
    let resultList = document.getElementById('result');
    resultList.innerHTML = "";
    
    data.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item.name;
        resultList.appendChild(li);
    });
}


