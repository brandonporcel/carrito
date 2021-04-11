import categoryChange from './modules/categoryChange.js';
import darkMode from './modules/darkMode.js';
import drawProducts from './modules/drawProducts.js';
import popUp from './modules/popUp.js';
const d = document;
let carrito = [];
let producto = {};
let cartLength = carrito.length;
let a = [];
const aa = (e) => {
	return e;
};
export default aa;
const $cartBtn = d.querySelector('.carritoBtn');

// export default incrementCart;
export const cart = () => {
	const addCartBtn = d.querySelector('.pop-up-cart');
	$cartBtn.textContent = `🛒/${cartLength}`;
	addCartBtn.addEventListener('click', async (e) => {
		cartLength += 1;
		$cartBtn.textContent = `🛒/${cartLength}`;
		const nombre = d.querySelector('.pop-up-name').textContent;
		const precio = d.querySelector('.pop-up-price').textContent;
		const id = d.querySelector('.pop-up-name').dataset.id;
		// returns the object. i dont do this cuz i am a boludo and because i dont wanna call the api again
		// const productInfo = Fecthjson.find((x) => x.id === '45');

		// producto es el click actual
		producto = {
			nombre,
			precio,
			id,
		};
		producto.cantidad = 1;
		if (carrito.hasOwnProperty(producto.id)) {
			// al producto que se hizo click=hago click en otro producto empiezo de 1.

			producto.cantidad = carrito[producto.id].cantidad + 1;
		}
		carrito[producto.id] = { ...producto };
		// a = carrito;
		aa(carrito);
	});
};

d.addEventListener('DOMContentLoaded', async () => {
	darkMode();
	drawProducts();
	popUp();
	categoryChange();
	cart();
});
