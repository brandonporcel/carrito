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
});
