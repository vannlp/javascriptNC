const cart = {
  addCart: function (dataPro) {
    if (localStorage["cart"]) {
      let arr = localStorage.cart;

      arr = JSON.parse(arr);
      arr.push(dataPro);

      arr = JSON.stringify(arr);

      localStorage["cart"] = arr;
    } else {
      let arr = [];
      arr.push(dataPro);

      arr = JSON.stringify(arr);
      localStorage["cart"] = arr;
    }
  },
};
