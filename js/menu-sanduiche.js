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
