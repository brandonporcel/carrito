import darkMode from './modules/darkMode.js';
const d = document;

const categoryHover = () => {
	d.addEventListener('mouseover', (e) => {
		if (e.target.matches('.categories-list li a')) {
			d.querySelector('.categoryImg').src = e.target.dataset.img;
		}
	});
};
const showSummary = (carrito) => {
	const $fragment = d.createDocumentFragment();
	const $summaryFragment = d.getElementById('summary-template').content;
	Object.values(carrito).forEach((el) => {
		// stop duplicate template,rewrite
		// if (d.querySelectorAll('.item-cart').length > 0) {
		// 	d.querySelectorAll('.item-cart').forEach((el) => {
		// 		el.remove();
		// 	});
		// }

		//delete product?
		if (el.quantity === 0) return;
		// checkEmptyCart

		// para eliminar producto
		$summaryFragment.querySelectorAll('.item-action-delete').forEach((btn) => {
			btn.dataset.id = el.id;
		});
		// sumar y restar btn.les doy su atributo para seleccionar seleccionar el producto correcto
		$summaryFragment.querySelectorAll('.item-quantity-btn').forEach((btn) => {
			btn.dataset.id = el.id;
		});
		$summaryFragment.querySelector('.item-name').textContent = el.name;
		$summaryFragment.querySelector('.item-img').src = el.img;
		$summaryFragment.querySelector('.item-quantity').textContent = el.quantity;
		$summaryFragment.querySelector('.item-price').textContent =
			el.price * el.quantity;
		const $clone = $summaryFragment.cloneNode(true);
		$fragment.appendChild($clone);
	});

	d.querySelector('.header').appendChild($fragment);
	// d.querySelector('.header').insertAdjacentHTML('afterend', '<h1>asdsad</h1>');
};
d.addEventListener('DOMContentLoaded', () => {
	categoryHover();
	darkMode();
	if (localStorage.getItem('cart')) {
		const cart = JSON.parse(localStorage.getItem('cart'));
		let suma = 0;
		Object.values(cart).forEach((el) => {
			suma += el.quantity;
		});
		d.querySelector('.carritoBtn').textContent = `🛒/${suma}`;
	}
	showSummary(JSON.parse(localStorage.getItem('cart')));
});
