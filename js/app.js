const d = document;
// variabels
const $cards = d.getElementById('cards');
const $items = d.getElementById('items');
const $footer = d.getElementById('footer');
const $cardTemplate = d.getElementById('card-template').content;
const $carritoTemplate = d.getElementById('carrito-template').content;
const $footerTemplate = d.getElementById('footer-template').content;
const $fragment = d.createDocumentFragment();
let carrito = {};

let producto = {};
// funciones
const fetchData = async () => {
	try {
		const res = await fetch('api.json');
		const data = await res.json();
		pintarCards(data);
		obtenerProducto(data);
	} catch (error) {
		console.log(error);
	}
};
const pintarCards = (fetchData) => {
	fetchData.forEach((producto) => {
		$cardTemplate.querySelector('img').src = producto.thumbnailUrl;
		$cardTemplate.querySelector('img').alt = producto.title;
		$cardTemplate.querySelector('h5').textContent = producto.title;
		$cardTemplate.querySelector('p').textContent = producto.precio;
		$cardTemplate.querySelector('button').textContent = 'aregar a lista';
		$cardTemplate.querySelector('button').dataset.id = producto.id;

		const $clone = $cardTemplate.cloneNode(true);
		$fragment.appendChild($clone);
	});
	$cards.appendChild($fragment);
};
// localstorage
const pintarInfoCarrito = () => {
	$items.innerHTML = '';
	// Object.values devuelve un array con los valores mas no las propiedades de los objectos.
	Object.values(carrito).forEach((producto) => {
		$carritoTemplate.querySelector('th').textContent = producto.id;
		$carritoTemplate.querySelectorAll('td')[1].textContent = producto.cantidad;
		$carritoTemplate.querySelector('td[data-producto]').textContent =
			producto.title;
		$carritoTemplate.querySelector('button[data-addBtn]').dataset.id =
			producto.id;
		$carritoTemplate.querySelector('button[data-removeBtn]').dataset.id =
			producto.id;
		$carritoTemplate.querySelector('span').textContent =
			producto.precio * producto.cantidad;
		const $clone = $carritoTemplate.cloneNode(true);
		$fragment.appendChild($clone);
	});
	$items.appendChild($fragment);

	localStorage.setItem('carrito', JSON.stringify(carrito));
	pintarcuentaFinal();
};
const pintarcuentaFinal = () => {
	$footer.innerHTML = '';

	if (Object.values(carrito).length === 0) {
		$footer.innerHTML =
			'<th scope="row" colspan="5">Carrito vacío - comience a comprar!!!</th>';
		return;
	}
	let nCantidad = 0;

	Object.values(carrito).forEach((producto) => {
		nCantidad += producto.cantidad;
	});

	let reducer = (acc, { cantidad, precio }) => acc + cantidad * precio;
	const nPrecio = Object.values(carrito).reduce(reducer, 0);

	$footerTemplate.querySelector('td').textContent = nCantidad;
	$footerTemplate.querySelector('span').textContent = nPrecio;

	const $clone = $footerTemplate.cloneNode(true);
	$fragment.appendChild($clone);
	$footer.appendChild($fragment);
	const vaciarCarritoBtn = d.getElementById('vaciar-carrito');
	vaciarCarritoBtn.addEventListener('click', () => {
		carrito = {};
		pintarInfoCarrito();
	});
};
const obtenerProducto = (fetchData) => {
	d.addEventListener('click', (e) => {
		if (e.target.matches('.card-btn')) {
			const objetoFiltrado = fetchData.filter(
				(producto) => producto.id == e.target.dataset.id
			);
			objetoFiltrado[0].cantidad = 1;
			// producto es aquel objeto que el user selecciono
			producto = objetoFiltrado[0];
			// significa que encontro resultados,
			// el producto se esta duplicando
			if (carrito.hasOwnProperty(producto.id)) {
				producto.cantidad = carrito[producto.id].cantidad + 1;
			}

			// carrito va a tener como propieddes los id de los productos,y dentro de estos,su info pertiennte
			// el spread operator es important
			// si existe, lo reescribe. si no existe lo crea
			carrito[producto.id] = { ...producto };

			pintarInfoCarrito();
		}
	});
};
const btnAccion = (sumar, restar, e) => {
	const producto = e.target.dataset.id;
	if (e.target.matches(sumar)) {
		carrito[producto].cantidad++;
	}
	if (e.target.matches(restar)) {
		carrito[producto].cantidad--;
		if (carrito[producto].cantidad === 0) {
			delete carrito[producto];
			return;
		}
		pintarInfoCarrito();
	}
	pintarInfoCarrito();
};
d.addEventListener('DOMContentLoaded', () => {
	fetchData();
	if (localStorage.getItem('carrito')) {
		carrito = JSON.parse(localStorage.getItem('carrito'));
		pintarInfoCarrito();
	}
});
d.addEventListener('click', (e) => {
	btnAccion('button[data-addBtn]', 'button[data-removeBtn]', e);
});
