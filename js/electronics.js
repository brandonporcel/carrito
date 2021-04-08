import darkMode from './modules/darkMode.js';
const d = document;
const $fragment = d.createDocumentFragment();
const $productTemplate = d.getElementById('product-template').content;
const drawProducts = (info) => {
	console.log(info);
	info.forEach((el) => {
		$productTemplate.querySelector('.product-img').src = el.image;
		$productTemplate.querySelector('.product-name').textContent = el.title;
		const $clone = $productTemplate.cloneNode(true);
		$fragment.appendChild($clone);
	});
	d.querySelector('.products').appendChild($fragment);
};
const getData = async () => {
	const res = await fetch(
		'https://fakestoreapi.com/products/category/electronics'
	);
	const data = await res.json();
	drawProducts(data);
};
d.addEventListener('DOMContentLoaded', () => {
	darkMode();
	getData();
});
