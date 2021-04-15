import categoryChange from './modules/categoryChange.js';
import darkMode from './modules/darkMode.js';
import drawProducts from './modules/drawProducts.js';
import popUp from './modules/popUp.js';
const d = document;
let carrito = {};
let product = {};
let sumaCantidad = 0;
const $cartBtn = d.querySelector('.carritoBtn');
const actions = (deleteBtn, addBtn, subtractBtn, buyBtn, cartBtn) => {
	d.addEventListener('click', (e) => {
		// deleteProduct
		if (e.target.matches(deleteBtn)) {
			d.querySelectorAll('.item-cart').forEach((el) => {
				el.remove();
			});
			delete carrito[e.target.dataset.id];
			showSummary();
			checkEmptyCart();
		}
		// add
		if (e.target.matches(addBtn)) {
			carrito[e.target.dataset.id].quantity++;
			showSummary();
		}
		// subtract
		if (e.target.matches(subtractBtn)) {
			if (carrito[e.target.dataset.id]) {
				carrito[e.target.dataset.id].quantity--;
				checkEmptyCart(carrito[e.target.dataset.id]);
				showSummary();
			}
		}
		// buy
		if (e.target.matches(buyBtn)) {
			alert("in a little while I'll send you the products bb");
			location.reload();
		}
		// click on the header cart
		if (e.target === cartBtn) {
			checkEmptyCart();
			d.querySelector('.cart-items-ctn').classList.remove('none');
			showSummary();
		}
	});
};

const checkEmptyCart = (cartProduct) => {
	const $emptyCartText = d.querySelector('.empty-cart');
	sumaCantidad = 0;
	Object.values(carrito).forEach((el) => {
		sumaCantidad += el.quantity;
	});
	changeCartNumber();
	if (sumaCantidad === 0) {
		$emptyCartText.classList.remove('none');
		$emptyCartText.addEventListener('click', () => {
			location.reload();
		});
		d.querySelector('#final-price').classList.add('none');
		d.querySelector('.buy-btn').classList.add('none');
		cartProduct = null;
		showSummary();
		return;
	} else {
		d.querySelector('.buy-btn').classList.remove('none');
	}
};
const changeCartNumber = () => {
	sumaCantidad = 0;
	Object.values(carrito).forEach((el) => {
		sumaCantidad += el.quantity;
		$cartBtn.textContent = `🛒/${sumaCantidad}`;
	});
	if (sumaCantidad === 0) {
		$cartBtn.textContent = `🛒/${sumaCantidad}`;
	}
};
const showFinalPrice = (cart) => {
	sumaCantidad = 0;
	Object.values(cart).forEach((el) => {
		// el.price es string""
		sumaCantidad += parseInt(el.price) * el.quantity;
	});
	if (sumaCantidad > 0) {
		d.getElementById('final-price').textContent =
			'final price: ' + sumaCantidad;
	}
};
const showSummary = () => {
	const $fragment = d.createDocumentFragment();
	const $summaryFragment = d.getElementById('summary-template').content;
	d.querySelector('.products').classList.add('none');
	changeCartNumber();
	Object.values(carrito).forEach((el) => {
		// stop duplicate template,rewrite
		if (d.querySelectorAll('.item-cart').length > 0) {
			d.querySelectorAll('.item-cart').forEach((el) => {
				el.remove();
			});
		}

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

	d.querySelector('.cart-items-ctn').appendChild($fragment);

	showFinalPrice(carrito);
};

const AddToCart = () => {
	d.addEventListener('click', (e) => {
		if (e.target.matches('.pop-up-btn')) {
			const name = d.querySelector('.pop-up-name').textContent;
			const price = d.querySelector('.pop-up-price').textContent;
			const id = d.querySelector('.pop-up-name').dataset.id;
			const img = d.querySelector('.pop-up-img').src;
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
			changeCartNumber();
		}
	});
};

d.addEventListener('DOMContentLoaded', async () => {
	// modules
	darkMode();
	drawProducts();
	popUp();
	categoryChange();
	//
	actions(
		'.item-action-delete',
		'.item-quantity-add',
		'.item-quantity-subtract',
		'.buy-btn',
		$cartBtn
	);
	AddToCart();
});
