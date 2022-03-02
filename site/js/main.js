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

function handleLoginUI(linkLogin, linkLogout) {
  if (sessionStorage["login"]) {
    let data = JSON.parse(sessionStorage["login"]);
    let html = `
    <li class="top-bar-item">
      Xin chào <b>${data.username}</b>
    </li>
    <li class="top-bar-item">
      /
    </li>
    <li class="top-bar-item"  id="logout">
      Đăng xuất
    </li>
    `;
    $("#login").html(html);
    logout(linkLogout);
  } else {
    let html = `
    <li class="top-bar-item">
      <a href="${linkLogin}" class="top-bar-link">
        Đăng nhập
      </a>
    </li>
    <li class="top-bar-item">/</li>
    <li class="top-bar-item">
      <a href="#" class="top-bar-link"> Đăng ký </a>
    </li>
    `;
    $("#login").html(html);
  }
}

function logout(linkLogout) {
  $("#logout").click(() => {
    sessionStorage.removeItem("login");
    location.href = linkLogout;
  });
}
