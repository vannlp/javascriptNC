async function search() {
  let title = getParameterUrl("q");
  console.log(title);

  let data = await getDataSearch(title);

  console.log(data);
  renderSearch(data);
}

function getDataSearch(title) {
  return $.get("http://localhost:3000/products?name_like=" + title);
}

function renderSearch(data) {
  const product_main = document.querySelector(".product-main");

  if (data.length == 0) {
    product_main.innerHTML = "<h3>Không có sản phẩm nào bạn cần tìm</h3>";
  } else {
    let html = data
      .map((value, index) => {
        return `
      <a class="product-slider-item col-xl-4 col-md-6 col-6" href="./product.html?id=${value.id}">
        <div class="product-slider-img">
          <img
            src="${value.image}"
            alt=""
          />
        </div>
        <div class="product-slider-title">
          <p>${value.name}</p>
          <div class="product-slider-price">
            <span>${value.price}₫</span>
          </div>
        </div>
      </a>
      `;
      })
      .join("");

    product_main.innerHTML = html;
  }
}
