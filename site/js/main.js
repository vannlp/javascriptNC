function handle_hidder() {
  const menu = document.querySelectorAll(".menu-hidder-list-2");
  const btn = document.querySelectorAll(".menu-hidder-icon");

  menu.forEach((data, index) => {
    btn[index].addEventListener("click", () => {
      data.classList.toggle("action");
    });
  });
}

handle_hidder();
function handle_menu() {
  const menu2 = document.querySelector(".menu-hidder");
  const btn_open = document.querySelector("#mobile-icon");
  const btn_close = document.querySelector("#menu-close");

  menu2.classList.toggle("action");
}

function handle_menu_account() {
  const menu = document.querySelector(".mobile-account-main");
  menu.classList.toggle("active");
}

function handle_menu_wrapper(menuClass, newClass) {
  const menu = document.querySelector(`.${menuClass}`);
  menu.classList.toggle(newClass);
}

function getParameterUrl(param) {
  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var param = url.searchParams.get(param);
  return param;
}
