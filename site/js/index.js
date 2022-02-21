class index {
  constructor(category, pro_sgk, pro_tt, pro_new) {
    this.category = category;
    this.pro_sgk = pro_sgk;
    this.pro_tt = pro_tt;
    this.pro_new = pro_new;
  }

  async init() {
    this.category = await this.getCategory();
    this.getPro_sgk = await this.getPro_sgk();
    let data_tt = await this.getProductByCateId(2);
    let data_pro = await this.getProductAll();

    console.log(this.category);
    this.renderCategory(this.category);
    this.renderPro_sgk(this.getPro_sgk);
    this.renderPro_tt(data_tt);
    this.renderProductAll(data_pro);

    this.handleSlider();
  }

  async init2() {
    let id = getParameterUrl("id");
    let data = await this.getProductById(id);
    data = data[0];
    let cate_id = data.cate_id;
    let data_cate = await this.getCategoryById(cate_id);
    data_cate = data_cate[0];
    console.log(data_cate);

    this.renderProductLink(data_cate.name, data.name);
    this.renderHTML_Pro(data);
    this.handleImgProduct();
  }

  async categoryPage() {
    let id = getParameterUrl("id");
    let dataCate = await this.getCategoryById(id);
    dataCate = dataCate[0];
    let dataPro = await this.getProductByCateId(id);

    console.log(dataPro);

    this.renderCateLink(dataCate);
    this.renderProByCate(dataPro);
  }

  async searchPage() {
    this.category = await this.getCategory();
    let dataCate = await this.getCategoryById(id);
    dataCate = dataCate[0];

    this.renderCategory2(this.category);
    this.renderCateLink(dataCate);
  }

  async CartPage() {
    this.category = await this.getCategory();

    this.renderCategory2(this.category);
  }

  getCategory() {
    return $.ajax({
      method: "GET",
      url: "http://localhost:3000/categories",
    });
  }

  getPro_sgk() {
    return $.ajax({
      method: "GET",
      url: "http://localhost:3000/products?cate_id=1",
    });
  }

  getCategoryById(id) {
    return $.ajax({
      method: "GET",
      url: "http://localhost:3000/categories?id=" + id,
    });
  }

  getProductById(id) {
    return $.get("http://localhost:3000/products?id=" + id);
  }

  getProductByCateId(id) {
    return $.ajax({
      method: "GET",
      url: "http://localhost:3000/products?cate_id=" + id,
    });
  }

  getProductAll() {
    return $.ajax({
      method: "GET",
      url: "http://localhost:3000/products",
    });
  }

  renderCategory(dataCategory) {
    const menu_nav = document.querySelector(".wide-nav-first-list");
    let html = dataCategory
      .map((value, index) => {
        return `
            <li class="wide-nav-first-item">
            <a href="./trangcon/danhmuc.html?id=${value.id}" class="wide-nav-first-link">
                <span>${value.name}</span>
            </a>
            </li>
        `;
      })
      .join("");

    menu_nav.innerHTML = html;
  }
  renderCategory2(dataCategory) {
    const menu_nav = document.querySelector(".wide-nav-first-list");
    let html = dataCategory
      .map((value, index) => {
        return `
            <li class="wide-nav-first-item">
            <a href="./danhmuc.html?id=${value.id}" class="wide-nav-first-link">
                <span>${value.name}</span>
            </a>
            </li>
        `;
      })
      .join("");

    menu_nav.innerHTML = html;
  }

  renderPro_sgk(data) {
    const product_wrapper = document.querySelector("#product_sgk");
    let html = data
      .map((value, index) => {
        return `
            <a class="product-slider-item" href="./trangcon/product.html?id=${value.id}">
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
    product_wrapper.innerHTML = html;
  }

  renderPro_tt(data) {
    const product2_wrapper = document.querySelector("#product_tt");
    let html = data
      .map((value, index) => {
        return `
        <a class="product-slider-item" href="./trangcon/product.html?id=${value.id}">
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
    product2_wrapper.innerHTML = html;
  }

  renderProductAll(data) {
    const product_main = document.querySelector(".product-main");
    let html = data
      .map((value, index) => {
        return `
        <a class="product-slider-item col-xl-2 col-md-3 col-6" href="./trangcon/product.html?id=${value.id}">
          <div class="product-slider-img">
            <img
              src="${value.image}"
              alt=""
            />
          </div>
          <div class="product-slider-title">
            <p>${value.name}</p>
            <div class="product-slider-price">
              <span class="text-through"></span>
              <span>${value.price}₫</span>
            </div>
          </div>
        </a>
    `;
      })
      .join("");

    product_main.innerHTML = html;
  }

  renderProductLink(cateName, proName) {
    const Pro_link = document.querySelectorAll(".direction-link a");
    Pro_link[1].innerText = cateName;
    Pro_link[2].innerText = proName;
  }

  renderHTML_Pro(dataPro) {
    const img1 = document.querySelector(".sanpham-main-left img");
    const img2 = document.querySelector(".sanpham-main-hiden img");
    const title = document.querySelector(".sanpham-main-title");
    const price = document.querySelector(".sanpham-main-price span");
    const mainContent = document.querySelector(".sanpham-desc-main");

    img1.src = dataPro.image;
    img2.src = dataPro.image;
    title.innerText = dataPro.name;
    price.innerText = dataPro.price;
    mainContent.innerHTML = dataPro.detail;
  }

  renderCateLink(data) {
    const link = document.querySelectorAll(".filter-directional-link")[1];

    link.innerText = data.name;

    link.href = `/site/trangcon/danhmuc.html?id=${data.id}`;
  }

  renderProByCate(data) {
    const product_main = document.querySelector(".product-main");

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

  handleSlider() {
    $(".product-slider").slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      prevArrow:
        '<button class="btn-prev" type="button"><i class="fas fa-chevron-left"></i></button>',
      nextArrow:
        '<button class="btn-next" type="button"><i class="fas fa-chevron-right"></i></button>',
      responsive: [
        {
          breakpoint: 1030,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }

  handleImgProduct() {
    const sanpham_left = document.querySelector(".sanpham-main-left");
    const sanpham_hiden = document.querySelector(".sanpham-main-hiden");

    sanpham_left.addEventListener("click", () => {
      sanpham_hiden.classList.toggle("active");
    });
  }
}
