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
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
    
};


//SearchBar with API integration
const searchBar = document.getElementById('searchBar');
const result = document.getElementById('productContainer')
// const result = document.querySelector('.box-container');

async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/data");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        // console.log("API response data: ", data);
        return data;
        // return await response.json();
    } catch (error) {
        console.error("Error fetch: ", error);
        return[];
    }
}


//Function to display searchResults
function displayResult(filterProducts) {
    result.innerHTML = ""; //Clear old results

    if (filterProducts.length === 0) {
        result.innerHTML = `<p> No results found </p>`;
        return;
    }

    filterProducts.forEach(product => {
        const box = document.createElement("div");
        box.classList.add("box");

        box.innerHTML = result;
        result.appendChild(box);
    });
}

//Listen for Search input
let productSearch;
searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value);
    clearTimeout(productSearch);

    productSearch = setTimeout(async () => {
        const query = searchBar.value.toLowerCase().trim();
        // console.log("Search query:", query);

        const products = await fetchProducts(); //Fetch from API
        // console.log("Fetched Products: ", products);

        const filterProducts = products.filter(product => {
            // console.log(`"Checking product "${product.name.toLowerCase()} against query "${query}"`);
            return product.name.toLowerCase().includes(query) //Match search input
        });
        // console.log("Filtered: ", filterProducts);

        displayResult(filterProducts);
    }, 300);
});