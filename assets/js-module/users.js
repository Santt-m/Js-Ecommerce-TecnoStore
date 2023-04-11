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

