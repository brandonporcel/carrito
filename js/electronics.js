import darkMode from './modules/darkMode.js';
import getData from './modules/getData.js';
const d = document;

const drawProducts = async () => {
	const $fragment = d.createDocumentFragment();
	const $productTemplate = d.getElementById('product-template').content;
	const data = await getData(
		'https://fakestoreapi.com/products/category/electronics',
		'../assets/images/loader.svg',
		'.products'
	);
	// console.log(data);
	data.forEach((el) => {
		$productTemplate.querySelector('.product-img').src = el.image;
		$productTemplate.querySelector('.product-img').alt = el.title;
		$productTemplate.querySelector('.product-name').textContent = el.title;
		$productTemplate.querySelector(
			'.product-price'
		).textContent = `$${el.price}`;
		const $clone = $productTemplate.cloneNode(true);
		$fragment.appendChild($clone);
	});
	d.querySelector('.products').appendChild($fragment);
};
const productPopUp = () => {
	d.addEventListener('click', (e) => {
		if (e.target.matches('.product') || e.target.matches('.product *')) {
			d.querySelector('.pop-up-wrapper').classList.remove('none');
		} else if (e.target.matches('.pop-up-close-btn')) {
			d.querySelector('.pop-up-wrapper').classList.add('none');
		} else if (
			!e.target.matches('.pop-up-ctn *') &&
			!e.target.matches('.pop-up-ctn')
		) {
			d.querySelector('.pop-up-wrapper').classList.add('none');
		}
	});
};
d.addEventListener('DOMContentLoaded', async () => {
	darkMode();
	await drawProducts();
	productPopUp();
});
