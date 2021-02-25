const d = document;
// variabels
const $cards = d.getElementById('cards');
const cardTemplate = d.getElementById('card-template').content;
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
		cardTemplate.querySelector('img').src = producto.thumbnailUrl;
		cardTemplate.querySelector('img').alt = producto.title;
		cardTemplate.querySelector('h5').textContent = producto.title;
		cardTemplate.querySelector('p').textContent = producto.precio;
		cardTemplate.querySelector('button').textContent = 'aregar a lista';
		cardTemplate.querySelector('button').dataset.id = producto.id;

		const $clone = cardTemplate.cloneNode(true);
		$fragment.appendChild($clone);
	});
	$cards.appendChild($fragment);
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
			console.log(producto);
			// carrito va a tener como propieddes los id de los productos,y dentro de estos,su info pertiennte
			// el spread operator es important
			// si existe, lo reescribe. si no existe lo crea
			carrito[producto.id] = { ...producto };
		}
	});
};
d.addEventListener('DOMContentLoaded', () => {
	fetchData();
});
