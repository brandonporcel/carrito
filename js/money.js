import darkMode from './modules/darkMode.js';
import aa from './electronics.js';
console.log(aa());
const d = document;
const addCartBtn = d.querySelector('.pop-up-cart');

d.addEventListener('DOMContentLoaded', () => {
	darkMode();
});
