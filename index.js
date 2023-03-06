// Contenedor de productos
const products = document.querySelector(".products-container");

// El contenedor de las categorías
const categories = document.querySelector(".categories");

// Botón de ver más
const btnLoad = document.querySelector(".btn-load");

//  Menú (Hamburguesa)
const barsMenu = document.querySelector(".navbar-list");

// botones de las categorias
const categoriesList = categories.querySelectorAll("button");

// esta funcion renderiza las card de los productos

const renderProduct = (product) => {
	const {cardImg, id, name, category, price, description} = product;
	return `
    <div class="product">
        <img src="${cardImg}" alt="${name}" />
        <div class="product-body">
                <h3>${name}</h3>
            <div class="product-info">
                <p>${description}</p>
				<div class="div-add">
					<p class"pprice">$ ${price}</p>
					<button class="btn-add" data-id="${id}" data-name="${name}" data-bid="${price}" data-img="${cardImg}">Add</button>
				</div>
            </div>
        </div>
    </div>
    `;
};

// esta funcion hace funcionar el boton de ver mas
// empieza con el index en 0 y suma 6 cada vez que se apreta el boton

function renderDividedProducts(index = 0) {
	products.innerHTML += productsController.dividedProducts[index]
		.map(renderProduct)
		.join("");
}

// esta funcion filtra los productos por categoria

const renderFilteredProducts = (category) => {
	const productsList = productsData.filter((product) => {
		return product.category === category;
	});
	products.innerHTML = productsList.map(renderProduct).join("");
};

// esta funcion renderiza los productos filtrados o divididos

const renderProducts = (index = 0, category = undefined) => {
	if (!category) {
		renderDividedProducts(index);
		return;
	}
	renderFilteredProducts(category);
};

// esta funcion agrega la class "hidden" al boton de ver mas sino hay mas productos

const changeShowMoreBtnState = (category) => {
	if (!category) {
		btnLoad.classList.remove("hidden");
		return;
	}
	btnLoad.classList.add("hidden");
};

// esta funcion agrega la class "active" al boton de la categoria seleccionada

const changeBtnActiveState = (selectedCategory) => {
	const categories = [...categoriesList];
	categories.forEach((categoryBtn) => {
	  if (!selectedCategory || categoryBtn.dataset.category !== selectedCategory) {
		categoryBtn.classList.remove("active");
		return;
	  }
	  categoryBtn.classList.add("active");
	});
};

// esta funcion cambia el estado del boton de ver mas y el boton de la categoria seleccionada

const changeFilterState = (e) => {
	const selectedCategory = e.target.dataset.category;
	changeShowMoreBtnState(selectedCategory);
	changeBtnActiveState(selectedCategory);
};

// esta funcion aplicar el filtro de categoria
// tomando el objeto "e" como argumento para saber que filtro aplicar

const applyFilter = (e) => {
	if (!e.target.classList.contains("category")) {
		return;
	} else {
		changeFilterState(e);
	}
	if (!e.target.dataset.category) {
		products.innerHTML = "";
		renderProducts();
	} else {
		renderProducts(0, e.target.dataset.category);
		productsController.nextProductsIndex = 1;
	}
};

const isLastIndexOf = () => {
	return (
		productsController.nextProductsIndex === productsController.productsLimit
	);
};

const showMoreProducts = () => {
	renderProducts(productsController.nextProductsIndex);
	productsController.nextProductsIndex++;
	if (isLastIndexOf()) {
		btnLoad.classList.add("hidden");
	}
};

// esta funcion abre y cierra el menu

const menuBtn = document.querySelector(".menu-label");
const navbar = document.querySelector(".navbar-list");

menuBtn.addEventListener("click", () => {
	navbar.classList.toggle("hidden");
});


const init = () => {
	renderProducts();
	categories.addEventListener("click", applyFilter);
	btnLoad.addEventListener("click", showMoreProducts);
	barsBtn.addEventListener("click", toggleMenu);
	cartBtn.addEventListener("click", toggleCart);
	barsMenu.addEventListener("click", closeOnClick);
	window.addEventListener("scroll", closeOnScroll);
	overlay.addEventListener("click", closeOnOverlayClick);
	document.addEventListener("DOMContentLoaded", renderCart);
	document.addEventListener("DOMContentLoaded", showTotal);
	products.addEventListener("click", addProduct);
	productsCart.addEventListener("click", handleQuantity);
	buyBtn.addEventListener("click", completeBuy);
	deleteBtn.addEventListener("click", deleteCart);
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
	renderCartBubble();
};

init();

