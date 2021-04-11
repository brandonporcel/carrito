import darkMode from './modules/darkMode.js';
import incrementCart from './electronics.js';
const d = document;
const $cartBtn = d.querySelector('.carritoBtn');
let num = incrementCart();
const changeHeaderCart = () => {
	$cartBtn.textContent = `🛒/${num}`;
};

d.addEventListener('DOMContentLoaded', () => {
	darkMode();
	changeHeaderCart();
});
