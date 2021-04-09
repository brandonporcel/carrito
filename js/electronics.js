import categoryChange from './modules/categoryChange.js';
import darkMode from './modules/darkMode.js';
import getData from './modules/getData.js';
import popUp from './modules/popUp.js';
const d = document;

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
		$productTemplate.querySelector('.product').dataset.price = el.price;
		$productTemplate.querySelector('.product').dataset.title = el.title;
		$productTemplate.querySelector('.product').dataset.description =
			el.description;

		$productTemplate.querySelector('.product-img-ctn').dataset.price = el.price;
		$productTemplate.querySelector('.product-img-ctn').dataset.description =
			el.description;
		$productTemplate.querySelector('.product-img-ctn').dataset.title = el.title;
		//
		$productTemplate.querySelector('.product-img').src = el.image;
		$productTemplate.querySelector('.product-img').alt = el.title;
		$productTemplate.querySelector('.product-name').textContent = el.title;
		$productTemplate.querySelector(
			'.product-price'
		).textContent = `$${el.price}`;
		const $clone = $productTemplate.cloneNode(true);
		$fragment.appendChild($clone);
	});

	document.querySelector('.products').innerHTML = '';
	d.querySelector('.products').appendChild($fragment);
};
const finalSection = () => {};

d.addEventListener('DOMContentLoaded', async () => {
	darkMode();
	await drawProducts();
	popUp();
	categoryChange();
});
