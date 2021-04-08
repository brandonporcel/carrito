import darkMode from './modules/darkMode.js';
import getData from './modules/getData.js';
const d = document;
const $fragment = d.createDocumentFragment();
const $productTemplate = d.getElementById('product-template').content;
const drawProducts = async () => {
	const data = await getData(
		'https://fakestoreapi.com/products/category/electronics'
	);

	data.forEach((el) => {
		$productTemplate.querySelector('.product-img').src = el.image;
		$productTemplate.querySelector('.product-name').textContent = el.title;
		const $clone = $productTemplate.cloneNode(true);
		$fragment.appendChild($clone);
	});
	d.querySelector('.products').appendChild($fragment);
};
// const getData = async () => {
// 	drawProducts(data);
// };
d.addEventListener('DOMContentLoaded', async () => {
	darkMode();
	await drawProducts();
});
