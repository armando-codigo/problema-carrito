const formulario = document.querySelector('#create-option');
const contenedorProductos = document.querySelector('.contenedor');

let carritoCompras = [];

// * ID de productos
let objID = 0;

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const nombreProducto = document.querySelector('input#nombre-producto').value;
  const categoriaProducto = document.getElementById('select-categoria').value;
  const precioProducto = document.querySelector('input#precio-producto').value;

  console.log(categoriaProducto, precioProducto);
  // * Crear objeto desde DOM y aumenta ID
  objID++;
  crearObjeto(nombreProducto, categoriaProducto, precioProducto);
});

console.log(formulario);

function crearObjeto(nombre, categoria, precio) {
  const divProducto = document.createElement('div');
  divProducto.innerHTML = `
    <img>
    <h2>${nombre}</h2>
    <h3>${categoria}</h3>
    <h4>$${Number(precio)}</h4>
    <button>Agregar al carrito</button>
    `;
  // * Cambia imagen de categoria
  if (categoria === 'tacos')
    divProducto.children[0].src = 'assets/img/tacos.jpg';
  if (categoria === 'sopa') divProducto.children[0].src = 'assets/img/sopa.jpg';

  // * Crea boton agregar
  divProducto.lastElementChild.className = 'boton-agregar';
  divProducto.lastElementChild.type = 'submit button';

  // * Agrega clase producto y ID
  divProducto.className = 'producto';
  divProducto.setAttribute('data-id', objID);

  // * Agrega producto al contenedor
  contenedorProductos.appendChild(divProducto);

  console.log(objID);

  // * Valida si hay productos y crea contexto boton agregar a carrito

  if (contenedorProductos.firstChild)
    contenedorProductos.addEventListener('click', (e) => {
      e.stopPropagation()
      crearContextoBoton(e);
    });
}

// * Agregar a carrito

function crearContextoBoton(e) {

  if (e.target.classList.contains('boton-agregar')) {
    e.stopPropagation()
    e.preventDefault()
    const productoContenedor = e.target.parentElement
    const seleccionarID = productoContenedor.attributes[1].value;
    const seleccionarIMG = productoContenedor.children[0].src;
    const seleccionarNombre = productoContenedor.children[1].textContent;
    const seleccionarCategoria = productoContenedor.children[2].textContent;
    const seleccionarPrecio =
    productoContenedor.children[3].textContent.replace('$', '');
    const objetoCarrito = {
      id: seleccionarID,
      img: seleccionarIMG,
      nombre: seleccionarNombre,
      categoria: seleccionarCategoria,
      precio: seleccionarPrecio,
    };

    agregarCarrito(objetoCarrito);
  }
}

function agregarCarrito(obj) {
  carritoCompras.push(obj);

  console.log(carritoCompras);
}
