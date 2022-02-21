function handleShowHide(className, btn) {
  const list = document.querySelectorAll("." + className);
  const btnx = document.querySelectorAll("." + btn);

  btnx.forEach((data, index) => {
    data.addEventListener("click", () => {
      list[index].classList.toggle("active");
    });
  });
}

function getParameterUrl(param) {
  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var param = url.searchParams.get(param);
  return param;
}
