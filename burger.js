document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".top-menu");
  const overlay = document.querySelector(".overlay");

  if (burger && navMenu && overlay) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      navMenu.classList.toggle("show");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      burger.classList.remove("active");
      navMenu.classList.remove("show");
      overlay.classList.remove("active");
    });
  }
});
