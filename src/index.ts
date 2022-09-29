import './style.css';
import './utilities.css';

const listMap = document.querySelector(".list-map");
const onClickList = document.querySelector(".header-icon-list");
const closeListMap = document.querySelector(".list-map-close");

const activeClassMap = "is-show";
onClickList.addEventListener("click", () => {
  listMap.classList.add(activeClassMap);
});
closeListMap.addEventListener("click", () => {
  listMap.classList.remove(activeClassMap);
});

const callApiFunction = (link: any) => {
  fetch(link)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    var products = document.querySelector(".container_products");
    products.innerHTML = "";
    data.forEach((item: any) => {
      var newProduct = document.createElement("div");
      newProduct.classList.add("product_item");
      newProduct.innerHTML = `
      <a href='detail.html#${item.id}' class='link_item'> 
      <div class="product_item-img" id="${item.id}">
      <img src=${item.image} alt="abc" />
      </div>
      <h3>
      ${item.name}
      </h3>
      <h1>${item.price}</h1>
      <span class="product_description">${item.description}</span>
      <div class="product_item-evaluate">
      <div class="product_item-vote">
        <div class="product_item-rating">
          <img src="./image/star.svg" alt="" srcset="" />
          <img src="./image/star.svg" alt="" srcset="" />
          <img src="./image/star.svg" alt="" srcset="" />
          <img src="./image/star.svg" alt="" srcset="" />
          <img
            class="star"
            src="./image/star1.svg"
            alt=""
            srcset=""
          />
        </div>
        <span>${item.rating}</span>
      </div>
      <div class="product_item-watch btn btn-blue">
        <img src="./image/heart.svg" alt="" />
        <span>Watch</span>
      </div>
      </div>
      </a>
    `;
      products.appendChild(newProduct);
    });
  })
}



var mockData = callApiFunction("https://utc2ranking.azurewebsites.net/api/Product")

var searchInput = document.querySelector(".navbar_input input");
searchInput.addEventListener("input", function (e: any) {
  let txtSearch = e.target.value.trim().toLowerCase();
  callApiFunction(`https://utc2ranking.azurewebsites.net/api/Product/Search?keysearch=${txtSearch}`)
});

function changeProductList(type: any, element:any ) {
  let tabs: any = document.getElementsByClassName("tab") 
  for(let i = 0 ; i < tabs.length; i++) {
    tabs[i].style.backgroundColor = '#fff'
  }
  element.style.backgroundColor = '#ebf2ff'

   callApiFunction(`https://utc2ranking.azurewebsites.net/api/Product/Category?category=${type}`)
}



const id = window.location.hash.slice(1);

const callApiFunctionDetaill = (link: any) => {
  fetch(link)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      var productDetall: any = document.querySelector(".detail__container");
      productDetall.innerHTML = "";
        var newProduct = document.createElement("div");
        newProduct.classList.add("detail_item");
        newProduct.innerHTML = `<div class="detail__main-first">
        <div class="detail__main-img">
            <img src="${data.image}" alt="">
        </div>
    </div>
    <div class="detail__main-left">
    <h2 class="detail__main-left-title">
        ${data.name}
    </h2>
    <div class="detail__main-star">
        <div class="detail__main-star-first">
        </div>
        <div class="detail__main-star-review">
            ${data.rating}
        </div>
        </div>
        <div class="detail__main-price">
        ${data.price}
      </div>
      <span class="detail__main-desc">
        ${data.description}
      </span>
      <div class="detail__main-category">
          Category: <p>${data.category}</p>
      </div>

      <div class="detail__main-share">
        Shares:
        <i class="fab fa-twitter-square"></i>
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-github"></i>
      </div>`
      productDetall.appendChild(newProduct);
    });
};

var detail = callApiFunctionDetaill(`https://utc2ranking.azurewebsites.net/api/Product/GetById?id=${id}`)





