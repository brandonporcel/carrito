const d = document;
// variabels
const $cards = d.getElementById('cards');
const cardTemplate = d.getElementById('card-template').content;
const $fragment = d.createDocumentFragment();
let carrito = {};

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
		}
	});
};
d.addEventListener('DOMContentLoaded', () => {
	fetchData();
});
