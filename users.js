let usuarios = [
  {
    id:0, // numero unico asignado a cada usuario
    rol: 'ADMIN', // nivel de permisos asignado a este usuario
    nombre: 'ADMIN', // nombre del usuario con el que inicia sesion
    nombreUsuario: 'ADMIN', // nombre con el que se registro este usuario
    contraseña: 'ADMIN', // contraseña de acceso a la cuenta
    email: 'admin@admin.com', // email de registro de esta cuenta
  },
  {
    id: 1,
    rol: 'USUARIO',
    nombre: 'Juan',
    nombreUsuario: 'juan123',
    contraseña: 'password123',
    email: 'juan@example.com',
  },
  {
    id: 2,
    rol: 'USUARIO',
    nombre: 'María',
    nombreUsuario: 'maria456',
    contraseña: 'secret',
    email: 'maria@example.com',
  },
];
document.getElementById('registro').addEventListener('submit', registrarUsuario);
document.getElementById('inicio-sesion').addEventListener('submit', iniciarSesion);

// esta funcion registrara un nuevo usuario en la base de datos

function registrarUsuario(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const mail = document.getElementById('mail').value;

  // Validamos que el usuario no esté registrado

  const usuarioRegistrado = usuarios.find(u => u.nombreUsuario === usuario);
  if (usuarioRegistrado) {
    alert('El usuario ya está registrado');
    return;
  }

  // Validamos que la contraseña sea segura

  const contrasenaSegura = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!contrasenaSegura.test(contrasena)) {
    alert('La contraseña no es segura. Debe tener al menos 8 caracteres, una letra y un número.');
    return;
  }

  // Validamos que el correo no esté registrado y sea válido

  const correoRegistrado = usuarios.find(u => u.email === mail);
  if (correoRegistrado) {
    alert('El correo electrónico ya está registrado');
    return;
  }
  const correoValido = /\S+@\S+\.\S+/;
  if (!correoValido.test(mail)) {
    alert('El correo electrónico no es válido');
    return;
  }

  // Agregamos el usuario a la base de datos
  // aca se crea una base nueva temporal para cargar los datos en la base de datos original
  // con los valores de ID unico, el rol de USUARIO, etc etc
  const id = usuarios.length;
  usuarios.push({
    id: id,
    rol: 'USUARIO',
    nombre: nombre,
    nombreUsuario: usuario,
    contraseña: contrasena,
    email: mail
  });
  alert('Usuario registrado correctamente');
}

// esta funcion iniciara sesion con un usuario registrado

function iniciarSesion(event) {
  event.preventDefault();
  // Obtenemos los datos del formulario
  const usuario = document.getElementById('usuario-login').value;
  const contrasena = document.getElementById('contrasena-login').value;

  // Obtenemos los elementos HTML que vamos a modificar
  const form = document.getElementById('inicio-sesion');
  const sectionRegistro = document.getElementById('section-registro');
  const sectioninfo = document.getElementById('info');


  // Validamos que el usuario y la contraseña sean correctos

  const usuarioRegistrado = usuarios.find(u => u.nombreUsuario === usuario && u.contraseña === contrasena);
  
  if (!usuarioRegistrado) {
    console.log('Usuario o contraseña incorrectos');
    return;
    
  }
// muestro el div de bienvenida
const bienvenida = document.getElementById('bienvenida');
bienvenida.style.display = 'flex';

// plantilla de bienvenida

const renderBienvenida = (usuarioRegistrado) => {
  return `
    <h2>Bienvenido ${usuarioRegistrado.nombre}</h2>
    <div class="cont-btn">
      <button id="ver-carrito" >Ver carrito</button>
      <button id="cerrar-sesion">Cerrar sesión</button>
    </div>
  `;
};

// oculta el formulario de inicio de sesión, el section de registro y el de info
form.style.display = 'none';
sectionRegistro.style.display = 'none';
sectioninfo.style.display = 'none';

// Renderizamos la bienvenida
const htmlBienvenida = renderBienvenida(usuarioRegistrado);

// Agregamos el HTML generado al elemento bienvenida
bienvenida.innerHTML = htmlBienvenida;

// Agregamos el evento al botón de cerrar sesión
document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);
  // Iniciamos sesión y guardamos el usuario en el almacenamiento local del navegador
  localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
  console.log('Inicio de sesión exitoso');

  // oculta el formulario de inicio de sesión, el section de registro y el de info

  form.style.display = 'none';
  sectionRegistro.style.display = 'none';
  sectioninfo.style.display = 'none';
}


// esta funcion cierra la sesion del usuario

function cerrarSesion(event) {
  // Eliminamos el usuario del almacenamiento local y recargamos la página

  localStorage.removeItem('usuario');
  const bienvenida = document.getElementById('bienvenida');
  const formulario = document.getElementById('inicio-sesion');

  console.log('sesion cerrada');
  
  // elimina elementos de la bienvenida

  bienvenida.style.display = 'none';

  // muestra el formulario de inicio de sesión

  formulario.style.display = 'block';
}


// Carrito

const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");
// Botón para abrir y cerrar menú
const barsBtn = document.querySelector(".menu-label");
// Carrito
const cartMenu = document.querySelector(".cart");
//  Overlay para tirar facha abajo del menú hamburguesa y el cart.
const overlay = document.querySelector(".overlay");
//  Modal de agregado al carrito.
const successModal = document.querySelector(".add-modal");
//  Modal de agregado al carrito.
const deleteBtn = document.querySelector(".btn-delete");
// Botón para abrir y cerrar carrito

// cambio de nombre aca <---
let localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

const verCarrito = () => {
  console.log(' usuario hizo clic en ver carrito de la seccion de bienvenida');
}

// Carrito de compras

// Contenedor de productos del carrito
const productsCart = document.querySelector(".cart-container");
// Botón para abrir y cerrar carrito
const carritoBtn = document.querySelector(".carrito-label");
// Contenedor del carrito
const carrito = document.querySelector(".cont-carrito");
// Botón de comprar
const buyBtn = document.querySelector(".btn-buy");

// funcion para abrir y cerrar el carrito

const toggleMenu = () => {
	barsMenu.classList.toggle("open-menu");
	if (cartMenu.classList.contains("open-cart")) {
		cartMenu.classList.remove("open-cart");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
	cartMenu.classList.toggle("open-cart");
	if (barsMenu.classList.contains("open-menu")) {
		barsMenu.classList.remove("open-menu");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
	if (!e.target.classList.contains("navbar-link")) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	overlay.classList.remove("show-overlay");
};

const closeOnScroll = () => {
	if (
		!barsMenu.classList.contains("open-menu") &&
		!cartMenu.classList.contains("open-cart")
	) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

const renderCardProduct = (cartProduct) => {
	const { id, name, bid, img, quantity } = cartProduct;
	return `
	<div class="cart-item">
		<img src=${img} alt="Nft del carrito" />
		<div class="item-info">
			<h3 class="item-title">${name}</h3>
			<p class="item-bid">Current bid</p>
			<span class="item-price">${bid} ETH</span>
		</div>
		<div class="item-handler">
			<span class="quantity-handler down" data-id=${id}>-</span>
			<span class="item-quantity">${quantity}</span>
			<span class="quantity-handler up" data-id=${id}>+</span>
		</div>
	</div>
	`;
};

const renderCart = () => {
	if (!cart.length) {
		productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
		return;
	}
	productsCart.innerHTML = cart.map(renderCardProduct).join("");
};

const getCartTotal = () => {
	return cart.reduce((acc, cur) => {
		return acc + Number(cur.bid) * cur.quantity;
	}, 0);
};

const showTotal = () => {
	total.innerHTML = `${getCartTotal().toFixed(2)} eTH`;
};

const renderCartBubble = () => {
	cartBubble.textContent = cart.reduce((acc, cur) => {
		return acc + cur.quantity;
	}, 0);
};

const disableBtn = (btn) => {
	if (!cart.length) {
		btn.classList.add("disabled");
	} else {
		btn.classList.remove("disabled");
	}
};

const checkCartState = () => {
	saveLocalStorage(cart);
	renderCart();
	showTotal();
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
	renderCartBubble();
};

const addProduct = (e) => {
	if (!e.target.classList.contains("btn-add")) {
		return;
	}
	const { id, name, bid, img } = e.target.dataset;

	const product = productData(id, name, bid, img);

	if (isExistingCartProduct(product)) {
		addUnitToProduct(product);
		showSuccessModal("Se agregó una unidad del producto al carrito");
	} else {
		createCartProduct(product);
		showSuccessModal("El producto se ha agregado al carrito");
	}

	checkCartState();
};

const productData = (id, name, bid, img) => {
	return { id, name, bid, img };
};

const isExistingCartProduct = (product) => {
	return cart.find((item) => {
		return item.id === product.id;
	});
};

const addUnitToProduct = (product) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === product.id
			? { ...cartProduct, quantity: cartProduct.quantity + 1 }
			: cartProduct;
	});
};

const showSuccessModal = (msg) => {
	successModal.classList.add("active-modal");
	successModal.textContent = msg;
	setTimeout(() => {
		successModal.classList.remove("active-modal");
	}, 1500);
};

const createCartProduct = (product) => {
	cart = [
		...cart,
		{
			...product,
			quantity: 1,
		},
	];
};

const handleMinusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	if (existingCartProduct.quantity === 1) {
		if (window.confirm("¿Desea eliminar el producto del carrito?")) {
			removeProductFromCart(existingCartProduct);
		}
		return;
	}

	substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	addUnitToProduct(existingCartProduct);
};

const removeProductFromCart = (existingProduct) => {
	cart = cart.filter((product) => product.id !== existingProduct.id);
	checkCartState();
};

const substractProductUnit = (existingProduct) => {
	cart = cart.map((product) => {
		return product.id === existingProduct.id
			? { ...product, quantity: Number(product.quantity) - 1 }
			: product;
	});
};

const handleQuantity = (e) => {
	if (e.target.classList.contains("down")) {
		handleMinusBtnEvent(e.target.dataset.id);
	} else if (e.target.classList.contains("up")) {
		handlePlusBtnEvent(e.target.dataset.id);
	}
	checkCartState();
};

const resetCartItems = () => {
	cart = [];
	checkCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
	if (!cart.length) return;
	if (window.confirm(confirmMsg)) {
		resetCartItems();
		alert(successMsg);
	}
};

const completeBuy = () => {
	completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
	completeCartAction("¿Desea eliminar su carrito?", "Carrito eliminado");
};

// funcion para agregar productos al carrito

const addBtn = document.querySelectorAll(".btn-add");
const btnAgregar = document.querySelectorAll(".btn-agregar");
const cart = document.getElementById("cart");
const total = document.getElementById("cartTotal");
let totalCompra = 0;

btnAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
    const producto = e.target.getAttribute("data-id");
	const precio = Number(e.target.getAttribute("data-bid"));
	totalCompra += precio;
    total.textContent = totalCompra.toFixed(2);

    const itemCarrito = document.createElement("li");
    itemCarrito.innerHTML = `${producto} - Precio: ${precio.toFixed(2)}`;
	carrito.appendChild(itemCarrito);
    });
});