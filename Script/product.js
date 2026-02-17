const productContainer = document.getElementById("product-container");
const homeContent = document.getElementById("homeContent");
const TrendContainer = document.getElementById("Trand-container");
const TrendingText = document.getElementById("TrendingText");
const showCategory = document.getElementById("showCategory");


// Show Products
const allProducts = () => {
  homeContent.classList.add("hidden");
  TrendContainer.classList.add("hidden");
  productContainer.classList.remove("hidden");
  TrendingText.classList.add("hidden");
   showCategory.classList.remove("hidden");

  loadCategories();
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

// Load each product details

const loadDetail = async (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details);
};

// Now display product details
const displayDetails = (singleProduct) => {
  console.log(singleProduct);
  const detailsbox = document.getElementById("details-container");
  detailsbox.innerHTML = `
  <div class="card bg-base-100 w-full shadow-sm">
  <figure class="">
    <img
      src="${singleProduct.image}"
      alt="product"
      class="h-40 object-contain"
      />
     
  </figure>
  <div class="card-body">
  <div class="flex justify-between">
    <h2 class="card-title">
      ${singleProduct.title}
    
    </h2>
      <div class="badge badge-secondary">
      
      <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
      ${singleProduct.rating.rate}</div>
  </div>
    <p class="justify-self-auto text-justify first-letter:uppercase"">${singleProduct.description}</p>
    <div class="card-actions justify-end">
      <div class="badge badge-outline font-semibold">$ ${singleProduct.price}</div>
      <button onClick="" class="badge badge-outline border-2 border-blue-600 hover:bg-gray-300 font-semibold ">Add To Cart</button>
    </div>
  </div>
</div>

`;

  document.getElementById("my_modal").showModal();
};

// Show Home
const showHome = () => {
  homeContent.classList.remove("hidden");
  productContainer.classList.add("hidden");
   TrendingText.classList.remove("hidden");
   TrendContainer.classList.remove("hidden")
    showCategory.classList.add("hidden");
};

// Home Section: Trending Product Show Dynamically

const Trendingproducts = () => {

  
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displayTrend(data));
};

const displayTrend = (trends) => {

  TrendContainer.innerHTML = "";

  //  filter by rating
  const filtered = trends.filter((trend) => trend.rating.rate >= 4.7);
  const topThree = filtered.slice(0, 3);

  topThree.forEach((trend) => {
    const TrendDiv = document.createElement("div");

    TrendDiv.innerHTML = `


      <div class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-4">

        <!-- Image -->
        <div class="bg-gray-100 rounded-xl flex items-center justify-center p-4 h-56">
          <img src="${trend.image}" 
               alt="${trend.title}" 
               class="h-44 object-contain">
        </div>

        <!-- Category + Rating -->
        <div class="flex items-center justify-between mt-4">
          <span class="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium capitalize">
            ${trend.category}
          </span>

          <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            <span class="ml-1 font-medium">${trend.rating.rate}</span>
            <span class="ml-1 text-gray-400">(${trend.rating.count})</span>
          </div>
        </div>

        <!-- Title -->
        <h3 class="mt-3 font-semibold text-gray-800 text-sm line-clamp-2">
          ${trend.title.length > 30 ? trend.title.slice(0, 30) + "..." : trend.title}
        </h3>

        <!-- Price -->
        <p class="mt-2 text-lg font-bold text-gray-900">
          $${trend.price}
        </p>

        <!-- Buttons -->
        <div class="flex items-center justify-between mt-4 gap-2">
        <button onClick="loadDetail(${trend.id})" class="flex-1 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">
            👁 Details
          </button>
        

          <button class="flex-1 text-sm text-white bg-[#4F39F6] px-4 py-2 rounded-lg hover:scale-105 hover:shadow-md transition">
            🛒 Add
          </button>
        </div>

      </div>
    `;
    TrendContainer.appendChild(TrendDiv);
  });
};

Trendingproducts();


// Category showing

const loadCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();

  const container = document.getElementById("category-container");
  container.innerHTML = "";

  // All Button (Default Active)
  const allBtn = document.createElement("button");
  allBtn.innerText = "All";
  allBtn.className =
    "category-btn px-6 py-2 rounded-full text-sm font-medium transition duration-300 bg-primary text-white shadow-md";

  allBtn.onclick = () => {
    setActiveButton(allBtn);
    allProducts();
  };

  container.appendChild(allBtn);

  // Other Category Buttons
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.innerText = cat;

    btn.className =
      "category-btn px-6 py-2 rounded-full text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition duration-300 capitalize";

    btn.onclick = () => {
      setActiveButton(btn);

      fetch(`https://fakestoreapi.com/products/category/${cat}`)
        .then((res) => res.json())
        .then((data) => displayProducts(data));
    };

    container.appendChild(btn);
  });
};


// Display Products
const displayProducts = (products) => {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");

    productDiv.innerHTML = `
      <div class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-4">

        <!-- Image -->
        <div class="bg-gray-100 rounded-xl flex items-center justify-center p-4 h-56">
          <img src="${product.image}" 
               alt="${product.title}" 
               class="h-44 object-contain">
        </div>

        <!-- Category + Rating -->
        <div class="flex items-center justify-between mt-4">
          <span class="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium capitalize">
            ${product.category}
          </span>

          <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            <span class="ml-1 font-medium">${product.rating.rate}</span>
            <span class="ml-1 text-gray-400">(${product.rating.count})</span>
          </div>
        </div>

        <!-- Title -->
        <h3 class="mt-3 font-semibold text-gray-800 text-sm line-clamp-2">
          ${product.title.length > 30 ? product.title.slice(0, 30) + "..." : product.title}
        </h3>

        <!-- Price -->
        <p class="mt-2 text-lg font-bold text-gray-900">
          $${product.price}
        </p>

        <!-- Buttons -->
        <div class="flex items-center justify-between mt-4 gap-2">
          <button onClick="loadDetail(${product.id})" class="flex-1 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">
            👁 Details
          </button>

          <button class="flex-1 text-sm text-white bg-[#4F39F6] px-4 py-2 rounded-lg hover:scale-105 hover:shadow-md transition">
            🛒 Add
          </button>
        </div>

      </div>
    `;

    productContainer.appendChild(productDiv);
  });
};

// navbar highlight function
document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      navButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Default active (Home)
  if (navButtons.length > 0) {
    navButtons[0].classList.add("active");
  }
});


// Category button highlight function

const setActiveButton = (activeBtn) => {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.className =
      "category-btn px-6 py-2 rounded-full text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition duration-300 capitalize";
  });

  activeBtn.className =
    "category-btn px-6 py-2 rounded-full text-sm font-medium transition duration-300 bg-primary text-white shadow-md capitalize ";
};
