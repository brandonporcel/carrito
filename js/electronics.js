import categoryChange from './modules/categoryChange.js';
import darkMode from './modules/darkMode.js';
import drawProducts from './modules/drawProducts.js';
import popUp from './modules/popUp.js';
const d = document;
let carrito = {};
let producto = {};
let cartLength = carrito.length;

const $cartBtn = d.querySelector('.carritoBtn');
const incrementCart = () => {
	return 2;
};
export default incrementCart;
const cart = () => {
	const buyBtn = d.querySelector('.pop-up-buy');
	const addCartBtn = d.querySelector('.pop-up-cart');
	$cartBtn.textContent = `🛒/${cartLength}`;
	addCartBtn.addEventListener('click', async (e) => {
		cartLength += 1;

		$cartBtn.textContent = `🛒/${cartLength}`;

		const nombre = d.querySelector('.pop-up-name').textContent;
		const precio = d.querySelector('.pop-up-price').textContent;
		const id = d.querySelector('.pop-up-name').dataset.id;
		let cantidadd = 0;
		// returns the object. i dont do this cuz i am a boludo and because i dont wanna call the api again
		// const productInfo = Fecthjson.find((x) => x.id === '45');
		cantidadd++;
		producto = {
			nombre,
			precio,
			id,
			cantidad: cantidadd,
		};

		carrito[producto.id] = { ...producto };

		// existe un producto
		if (producto.hasOwnProperty('id')) {
			// cantidadd++;
			// carrito[id].cantidad += 1;
			// console.log(carrito[id].cantidad, carrito[id].id);
			// cantidad += 1;
			// console.log((producto.cantidad += 1), 'producto.cantidad');
			// console.log(carrito[id], 'carrito[id]');
			// const a = carrito[id].cantidad++;
			// console.log(a, 'carrito[id].cantidad++');
		}

		console.log(carrito, 'carrito');
	});
};

d.addEventListener('DOMContentLoaded', async () => {
	darkMode();
	drawProducts();
	popUp();
	categoryChange();
	cart();
});
