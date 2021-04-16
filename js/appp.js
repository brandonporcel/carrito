import darkMode from './modules/darkMode.js';
const d = document;

const categoryHover = () => {
	d.addEventListener('mouseover', (e) => {
		if (e.target.matches('.categories-list li a')) {
			d.querySelector('.categoryImg').src = e.target.dataset.img;
		}
	});
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
});
