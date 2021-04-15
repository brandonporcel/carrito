import categoryChange from './modules/categoryChange.js';
import darkMode from './modules/darkMode.js';
import drawProducts from './modules/drawProducts.js';
import popUp from './modules/popUp.js';
const d = document;
let carrito = {};
let product = {};
let sumaCantidad = 0;
let cartLength = Object.keys(carrito).length;
const $cartBtn = d.querySelector('.carritoBtn');
const actions = () => {
	d.addEventListener('click', (e) => {
		console.log('log');
	});
};
const deleteProduct = () => {
	d.addEventListener('click', (e) => {
		sumaCantidad = 0;
		if (e.target.matches('.item-action-delete')) {
			// console.log(carrito, 'anets');
			d.querySelectorAll('.item-cart').forEach((el) => {
				el.remove();
			});
			delete carrito[e.target.dataset.id];
			showSummary();
			Object.values(carrito).forEach((el) => {
				sumaCantidad += el.quantity;
			});
			$cartBtn.textContent = `🛒/${sumaCantidad}`;
		}
	});
};
const checkEmptyCart = (cartProduct) => {
	const $emptyCartText = d.querySelector('.empty-cart');
	sumaCantidad = 0;
	Object.values(carrito).forEach((el) => {
		sumaCantidad += el.quantity;
	});

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
	}
};
const buy = () => {
	d.querySelector('.buy-btn').addEventListener('click', () => {
		alert("in a little while I'll send you the products bb");
		location.reload();
	});
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
	sumaCantidad = 0;
	Object.values(carrito).forEach((el) => {
		d.querySelector('.products').classList.add('none');
		// stop duplicate template,rewrite
		if (d.querySelectorAll('.item-cart').length > 0) {
			d.querySelectorAll('.item-cart').forEach((el) => {
				el.remove();
			});
		}
		// change cart number
		sumaCantidad += el.quantity;
		$cartBtn.textContent = `🛒/${sumaCantidad}`;
		//delete product?
		if (el.quantity === 0) return;

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
$cartBtn.addEventListener('click', () => {
	if (cartLength === 0) return;
	d.querySelector('.cart-items-ctn').classList.remove('none');
	d.querySelector('.buy-btn').classList.remove('none');
	showSummary();
	deleteProduct();
});
const restar = () => {
	d.addEventListener('click', (e) => {
		if (e.target.matches('.item-quantity-subtract')) {
			if (carrito[e.target.dataset.id]) {
				carrito[e.target.dataset.id].quantity--;
				checkEmptyCart(carrito[e.target.dataset.id]);
				showSummary();
			}
		}
	});
};
const sumar = () => {
	d.addEventListener('click', (e) => {
		if (e.target.matches('.item-quantity-add')) {
			carrito[e.target.dataset.id].quantity++;
			showSummary();
		}
	});
};
const cart = () => {
	$cartBtn.textContent = `🛒/${cartLength}`;
	d.addEventListener('click', (e) => {
		if (e.target.matches('.pop-up-btn')) {
			cartLength += 1;
			$cartBtn.textContent = `🛒/${cartLength}`;
			const name = d.querySelector('.pop-up-name').textContent;
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
			carrito[product.id] = { ...product };
		}
	});
};

d.addEventListener('DOMContentLoaded', async () => {
	// modules
	darkMode();
	drawProducts();
	popUp();
	categoryChange();
	// acciones
	sumar();
	restar();
	buy();

	//
	cart();
	showSummary();
});
