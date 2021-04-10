import categoryChange from './modules/categoryChange.js';
import darkMode from './modules/darkMode.js';
import getData from './modules/getData.js';
import popUp from './modules/popUp.js';
const d = document;
let carrito = [];
let producto = {};

const myArray = [
	{ id: '73', name: 'messi' },
	{ id: '45', name: 'leo' },
];
const drawProducts = async () => {
	const $fragment = d.createDocumentFragment();
	const $productTemplate = d.getElementById('product-template').content;
	document.querySelector(
		'.products'
	).innerHTML = `<img  class="loader" src="../assets/images/loader.svg" alt="loader">`;
	const data = await getData(
		'https://fakestoreapi.com/products/category/electronics'
	);
	data.forEach((el) => {
		// estos 2 me sirven para poder establacer en el carrito{} el id del producto en el q se hizo click
		$productTemplate.querySelector('.product').dataset.id = el.id;
		$productTemplate.querySelector('.product-img-ctn').dataset.id = el.id;

		// con esto pongo la info en el pop up.
		$productTemplate.querySelector('.product').dataset.price = el.price;
		$productTemplate.querySelector('.product').dataset.title = el.title;
		$productTemplate.querySelector('.product').dataset.description =
			el.description;
		// con esto pongo la info en el pop up. otra vez porque el user puede hacer el click en .product-img-ctn o en .product
		$productTemplate.querySelector('.product-img-ctn').dataset.price = el.price;
		$productTemplate.querySelector('.product-img-ctn').dataset.title = el.title;
		$productTemplate.querySelector('.product-img-ctn').dataset.description =
			el.description;

		//dibujo los productos
		$productTemplate.querySelector('.product-img').src = el.image;
		$productTemplate.querySelector('.product-name').textContent = el.title;
		$productTemplate.querySelector(
			'.product-price'
		).textContent = `$${el.price}`;
		// evito reflow
		const $clone = $productTemplate.cloneNode(true);
		$fragment.appendChild($clone);
	});
	// saco el loader y finalmente inserto los productso
	document.querySelector('.products').innerHTML = '';
	d.querySelector('.products').appendChild($fragment);
};
const cart = () => {
	const buyBtn = d.querySelector('.pop-up-buy');
	const addCartBtn = d.querySelector('.pop-up-cart');
	addCartBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		const nombre = d.querySelector('.pop-up-name').textContent;
		const precio = d.querySelector('.pop-up-price').textContent;
		const id = d.querySelector('.pop-up-name').dataset.id;

		// returns the object. i dont do this cuz i am a boludo and because i dont wanna call the api again
		// const productInfo = Fecthjson.find((x) => x.id === '45');

		producto = {
			nombre,
			precio,
			id,
		};

		carrito.push(producto);
		console.log(carrito);
	});
};

d.addEventListener('DOMContentLoaded', async () => {
	darkMode();
	await drawProducts();
	popUp();
	categoryChange();
	cart();
});
