import categoryChange from './modules/categoryChange.js';
import darkMode from './modules/darkMode.js';
import drawProducts from './modules/drawProducts.js';
import popUp from './modules/popUp.js';
const d = document;
let carrito = {};
let product = {};
let cartLength = Object.keys(carrito).length;
const $cartBtn = d.querySelector('.carritoBtn');

const showSummary = () => {
	const $fragment = d.createDocumentFragment();
	const $summaryFragment = d.getElementById('summary-template').content;
	$cartBtn.addEventListener('click', () => {
		Object.values(carrito).forEach((el) => {
			d.querySelector('.products').classList.add('none');
			$summaryFragment.querySelector('.item-name').textContent = el.name;
			$summaryFragment.querySelector('.item-img').src = el.img;
			const $clone = $summaryFragment.cloneNode(true);
			$fragment.appendChild($clone);
		});
		d.querySelector('.cart-items-ctn').appendChild($fragment);
	});
};

// export default incrementCart;
export const cart = () => {
	const addCartBtn = d.querySelector('.pop-up-cart');

	$cartBtn.textContent = `🛒/${cartLength}`;
	addCartBtn.addEventListener('click', async (e) => {
		cartLength += 1;
		$cartBtn.textContent = `🛒/${cartLength}`;
		const name = d.querySelector('.pop-up-name').textContent;
		const price = d.querySelector('.pop-up-price').textContent;
		const id = d.querySelector('.pop-up-name').dataset.id;
		const img = d.querySelector('.pop-up-img').src;
		// console.log();
		// returns the object. i dont do this cuz i am a boludo and because i dont wanna call the api again
		// const productInfo = Fecthjson.find((x) => x.id === '45');

		// producto es el click actual
		product = {
			name,
			price,
			id,
			img,
		};
		product.quantity = 1;
		if (carrito.hasOwnProperty(product.id)) {
			// al product que se hizo click=hago click en otro product empiezo de 1.

			product.quantity = carrito[product.id].quantity + 1;
		}
		carrito[product.id] = { ...product };
	});
};

d.addEventListener('DOMContentLoaded', async () => {
	darkMode();
	drawProducts();
	popUp();
	categoryChange();
	cart();
	showSummary();
});
