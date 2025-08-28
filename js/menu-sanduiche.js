const btn = document.querySelector(".menu-btn"); // botão do menu sanduíche
const menu = document.querySelector(".menu"); // menu lateral

function abrir() {
    if (menu.style.left === "0px") {
        menu.style.left = "-250px";
    } else {
        menu.style.left = "0px";
    }
}

btn.addEventListener("click", abrir);

// Alternância de tema claro/escuro
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.querySelector(".theme-label");

function setTheme(dark) {
    if (dark) {
        document.body.classList.add("dark-theme");
        themeLabel.textContent = "Tema claro";
    } else {
        document.body.classList.remove("dark-theme");
        themeLabel.textContent = "Tema escuro";
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
}

themeToggle?.addEventListener("change", function() {
    setTheme(this.checked);
});

// Carregar tema salvo
window.addEventListener("DOMContentLoaded", function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        themeToggle.checked = true;
        setTheme(true);
    } else {
        themeToggle.checked = false;
        setTheme(false);
    }
});
