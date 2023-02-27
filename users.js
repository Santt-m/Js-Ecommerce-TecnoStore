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

  // Obtenemos los datos del formulario
  const usuario = document.getElementById('usuario-login').value;
  const contrasena = document.getElementById('contrasena-login').value;
  // Obtenemos los elementos HTML que vamos a modificar
  const bienvenida = document.getElementById('bienvenida');
  const form = document.getElementById('inicio-sesion');
  const sectionRegistro = document.getElementById('section-registro');
  const sectioninfo = document.getElementById('info');


  // Validamos que el usuario y la contraseña sean correctos

  const usuarioRegistrado = usuarios.find(u => u.nombreUsuario === usuario && u.contraseña === contrasena);
  
  if (!usuarioRegistrado) {
    console.log('Usuario o contraseña incorrectos');
    return;
    
  }

  // Iniciamos sesión y guardamos el usuario en el almacenamiento local del navegador

  sessionStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
  console.log('Inicio de sesión exitoso');

  // crea elementos HTML para la bienvenida

  const mensajeBienvenida = document.createElement('p');
  mensajeBienvenida.textContent = `Bienvenido, ${usuarioRegistrado.nombre}`;
  const botonCarrito = document.createElement('button');
  botonCarrito.textContent = 'Ver carrito';
  const botonAjustes = document.createElement('button');
  botonAjustes.textContent = 'Ajustes';
  const botonCerrarSesion = document.createElement('button');
  botonCerrarSesion.textContent = 'Cerrar sesión';
  botonCerrarSesion.addEventListener('click', cerrarSesion);

  // agrega elementos al contenedor bienvenida

  bienvenida.appendChild(mensajeBienvenida);
  bienvenida.appendChild(botonCarrito);
  bienvenida.appendChild(botonAjustes);
  bienvenida.appendChild(botonCerrarSesion);

  // oculta el formulario de inicio de sesión, el section de registro y el de info

  form.style.display = 'none';
  sectionRegistro.style.display = 'none';
  sectioninfo.style.display = 'none';
}

// Agregamos los eventos a los formularios

document.getElementById('registro').addEventListener('submit', registrarUsuario);
document.getElementById('inicio-sesion').addEventListener('submit', iniciarSesion);

// esta funcion cierra la sesion del usuario

function cerrarSesion() {

  // Eliminamos el usuario del almacenamiento local y recargamos la página

  sessionStorage.removeItem('usuario');
  const bienvenida = document.getElementById('bienvenida');
  const formulario = document.getElementById('inicio-sesion');
  
  // elimina elementos de la bienvenida

  bienvenida.style.display = 'none';

  // muestra el formulario de inicio de sesión

  formulario.style.display = 'block';
}

// verifica si hay un usuario iniciado y muestra la bienvenida si es así

const usuarioSessionStorage = sessionStorage.getItem('usuario');
if (usuarioSessionStorage) {
  const usuario = JSON.parse(usuarioSessionStorage);
  iniciarSesion(usuario);
  console.log('el localstorage envio datos para iniciar sesion')
}

