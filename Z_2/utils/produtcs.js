let productRes;

function renderProduct(obj) {
  productRes = document.getElementById("productresult");
  let productBox = document.createElement("div");
  let photo = document.createElement("img");
  let title = document.createElement("h2");
  let desc = document.createElement("p");
  let rating = document.createElement("div");
  let rate = document.createElement("span");
  let price = document.createElement("span");
  let infoBox = document.createElement("div");

  productBox.classList.add("productBox");
  photo.classList.add("photo");
  title.classList.add("title");
  desc.classList.add("desc");
  rating.classList.add("rating");
  rate.classList.add("rate");
  price.classList.add("price");

  photo.src = obj.image;
  desc.textContent = obj.description;
  title.textContent = obj.title;
  price.textContent = obj.price;
  rate.textContent = obj.rating?.rate;

  infoBox.append(photo, title, desc);
  productBox.append(infoBox, rating);
  rating.append(rate, price);
  productRes.append(productBox);
}

export default function getProduct(src) {
  if (src != "") {
    try {
      fetch(src)
        .then((res) => res.json())
        .then((json) => json.map((item) => renderProduct(item)));
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => json.map((item) => renderProduct(item)));
    } catch (e) {
      console.log(e);
    }
  }
}
