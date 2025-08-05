document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const navMenu = document.querySelector(".top-menu");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    burger.addEventListener("click", () => {
        const isActive = navMenu.classList.toggle("show");
        burger.classList.toggle("active");
        overlay.classList.toggle("active", isActive);
        document.body.classList.toggle("menu-open", isActive);
    });

    overlay.addEventListener("click", () => {
        navMenu.classList.remove("show");
        burger.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
    });
});
