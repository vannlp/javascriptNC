function handleInputNumber() {
  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");
  const inputSL = document.querySelectorAll(".inputSL");
  const pro_price = document.querySelector(".pro-price");
  const pro_sum = document.querySelector(".pro-sum");

  let arr = [];

  let price = Number(pro_price.innerText);
  let sum = Number(pro_sum.innerText);

  console.log(price);
  console.log(sum);

  inputSL.forEach((data, index) => {
    arr[index] = data.value;
  });

  plus.forEach((value, index) => {
    value.addEventListener("click", () => {
      arr[index]++;
      inputSL[index].value = arr[index];

      sum = price * arr[index];

      console.log(sum);

      pro_sum.innerText = sum;
    });
  });
  minus.forEach((value, index) => {
    value.addEventListener("click", () => {
      arr[index]--;
      inputSL[index].value = arr[index];

      sum = price * arr[index];

      console.log(sum);
      pro_sum.innerText = sum;
    });
  });
}

function rederCart() {
  const cartWrapper = document.querySelector("#cartWrapper");

  if (localStorage["cart"]) {
    let cart = JSON.parse(localStorage["cart"]);
    let html = cart
      .map(function (value, index) {
        return `
       <tr>
         <td class="d-flex align-items-center">
           <span class="cart-delete">X</span>
           <img
             src="${value.image}"
             alt=""
             class="col-4"
           />
           <span class="col-6">${value.name}</span>
           <span class="id_pro" style="display:none;">${value.id}</span>
         </td>
         <td><span class="pro-price">${value.price}</span>₫</td>
         <td class="table-quantily">
           <button type="button" class="plus">+</button>
           <input
             type="number"
             class="inputSL"
             value="${value.quantily}"
             min="0"
             max="10"
           />
           <button type="button" class="minus">-</button>
         </td>
         <td><span class="pro-sum">${value.price * value.quantily}</span>₫</td>
       </tr>
     `;
      })
      .join("");
    cartWrapper.innerHTML = html;
  } else {
    cartWrapper.innerHTML = "<h4>Ko có sản phẩm trong giỏ</h4>";
  }
}

function updateQuantily() {
  const inputSL = document.querySelectorAll(".inputSL");

  inputSL.forEach((value, index) => {
    value.addEventListener("change", () => {
      let data = JSON.parse(localStorage["cart"]);
      data[index].quantily = value.value;

      localStorage["cart"] = JSON.stringify(data);
      // console.log(localStorage["cart"]);
      // rederCart();
    });
  });
}

function rederTongTien(data) {
  const tongTien = $(".cart-warpper-2");

  let tong = 0;

  data.forEach((value, index) => {
    tong += Number(value.price * value.quantily);
  });

  tongTien.text(tong);
}

function deleteCart(id) {
  let arr = JSON.parse(localStorage["cart"]);

  let arr1 = [];

  arr.forEach((value, index) => {
    if (id.toString() != value.id) {
      arr1.push(value);
    }

    console.log(id, value.id);
  });

  console.log(arr1);
  localStorage["cart"] = JSON.stringify(arr1);
}

function handleEventDelete() {
  const cart_delete = document.querySelectorAll(".cart-delete");
  const id_pro = document.querySelectorAll(".id_pro");

  cart_delete.forEach((value, index) => {
    value.addEventListener("click", () => {
      let id = id_pro[index].innerText;
      console.log(id);
      deleteCart(id);
      ControllerCart();
    });
  });
}

function ControllerCart() {
  if (localStorage["cart"]) {
    let cart1 = JSON.parse(localStorage["cart"]);
    rederCart();

    updateQuantily();

    rederTongTien(cart1);
    handleEventDelete();

    $("#update").click(() => {
      let cart1 = JSON.parse(localStorage["cart"]);

      rederCart();
      updateQuantily();
      rederTongTien(cart1);
      handleEventDelete();
    });
  } else {
    rederCart();
  }
}
