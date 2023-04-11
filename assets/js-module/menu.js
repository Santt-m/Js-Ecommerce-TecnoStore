// Codigo de funcionamiento general de la pagina

// menu hamburguesa

    // Asigno unos const los botones del menu
    const menuBtn = document.querySelector(".menu-label");
    const navbar = document.querySelector(".navbar-list");
    
    // Abro y cierro el menu agregandole y quitandole la clase hidden
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("hidden");
    });

// Carrito
    // creo unos const para los botones del carrito
    const cartBtn = document.querySelector(".cart-label");
    const cart = document.querySelector(".cart");

    // Abro y cierro el carrito agregandole y quitandole la clase hidden
    cartBtn.addEventListener("click", () => {
        cart.classList.toggle("hidden");
    });

    // botones de login

    const loginBtn = document.querySelector(".login-label");
    const loginSection = document.querySelector(".login-section");

    loginBtn.addEventListener("click", () => {
        loginSection.classList.toggle("hidden");
    });
    