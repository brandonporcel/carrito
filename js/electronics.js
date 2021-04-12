import categoryChange from './modules/categoryChange.js';
import darkMode from './modules/darkMode.js';
import drawProducts from './modules/drawProducts.js';
import popUp from './modules/popUp.js';
const d = document;
let carrito = {};
let product = {};
let cartLength = Object.keys(carrito).length;
const $cartBtn = d.querySelector('.carritoBtn');
const sumar = (cart) => {
	console.log(cart);
};
const showSummary = () => {
	const $fragment = d.createDocumentFragment();
	const $summaryFragment = d.getElementById('summary-template').content;
	$cartBtn.addEventListener('click', () => {
		Object.values(carrito).forEach((el) => {
			d.querySelector('.products').classList.add('none');
			// stop duplicate template,rewrite
			if (d.querySelectorAll('.item-cart').length > 0) {
				d.querySelectorAll('.item-cart').forEach((el) => {
					el.remove();
				});
			}

			$summaryFragment.querySelector('.item-name').textContent = el.name;
			$summaryFragment.querySelector('.item-img').src = el.img;
			$summaryFragment.querySelector('.item-quantity').textContent =
				el.quantity;
			$summaryFragment.querySelector('.item-price').textContent = el.price;
			const $clone = $summaryFragment.cloneNode(true);
			$fragment.appendChild($clone);
		});
		d.querySelector('.cart-items-ctn').appendChild($fragment);
	});
};

const cart = () => {
	$cartBtn.textContent = `🛒/${cartLength}`;
	d.addEventListener('click', (e) => {
		if (e.target.matches('.pop-up-btn')) {
			cartLength += 1;
			$cartBtn.textContent = `🛒/${cartLength}`;
			const name =
				d.querySelector('.pop-up-name').textContent ||
				d.querySelector('.product-name').textContent;
			const price = d.querySelector('.pop-up-price').textContent;
			const id = d.querySelector('.pop-up-name').dataset.id;
			const img = d.querySelector('.pop-up-img').src;
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
			sumar(carrito);
			carrito[product.id] = { ...product };
		}
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
