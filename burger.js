document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const navMenu = document.querySelector(".top-menu");

    if (burger && navMenu) {
        burger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            burger.classList.toggle("active");
        });
    }
});
