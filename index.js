// Contenedor de productos
const products = document.querySelector(".products-container");

// El contenedor de las categorías
const categories = document.querySelector(".categories");

// Botón de ver más
const btnLoad = document.querySelector(".btn-load");

// Botón para abrir y cerrar menú
const barsBtn = document.querySelector(".menu-label");

//  Menú (Hamburguesa)
const barsMenu = document.querySelector(".navbar-list");


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

const renderDividedProducts = (index = 0) => {
	products.innerHTML += productsController.dividedProducts[index]
		.map(renderProduct)
		.join("");
};

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
		if (categoryBtn.dataset.category !== selectedCategory) {
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

const toggleMenu = () => {
	barsMenu.classList.toggle("open-menu");
	if (cartMenu.classList.contains("open-cart")) {
		cartMenu.classList.remove("open-cart");
		return;
	}
	overlay.classList.toggle("show-overlay");
};


//funcion de inicio

const init = () => {
	
	renderProducts();
	categories.addEventListener("click", applyFilter);
	btnLoad.addEventListener("click", showMoreProducts);
};

init();
