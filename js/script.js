const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

/* Toggle menu saat icon diklik */
menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // cegah event naik ke document
    menu.classList.toggle("active");
});

/* Klik di dalam menu tidak menutup menu */
menu.addEventListener("click", (e) => {
    e.stopPropagation();
});

/* Klik di luar menu & toggle → menu tertutup */
document.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
    }
});

/* Tutup menu saat resize ke desktop */
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        menu.classList.remove("active");
    }
});
