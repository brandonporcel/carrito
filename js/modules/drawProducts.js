import getData from './getData.js';
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
		// estos 2 me sirven para poder establacer en el carrito{} el id del producto en el q se hizo click
		$productTemplate.querySelector('.product').dataset.id = el.id;
		$productTemplate.querySelector('.product-img-ctn').dataset.id = el.id;

		// con esto pongo la info en el pop up.
		$productTemplate.querySelector('.product').dataset.price = el.price;
		$productTemplate.querySelector('.product').dataset.title = el.title;
		$productTemplate.querySelector('.product').dataset.img = el.image;
		$productTemplate.querySelector('.product').dataset.description =
			el.description;
		// con esto pongo la info en el pop up. otra vez porque el user puede hacer el click en .product-img-ctn o en .product
		$productTemplate.querySelector('.product-img-ctn').dataset.price = el.price;
		$productTemplate.querySelector('.product-img-ctn').dataset.img = el.image;
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
export default drawProducts;
