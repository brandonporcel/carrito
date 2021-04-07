const d = document;
const $darkmodeBtn = d.getElementById('darkmodeBtn');
const categoryHover = () => {
	d.addEventListener('mouseover', (e) => {
		if (e.target.matches('.categories-list li a')) {
			d.querySelector('.categoryImg').src = e.target.dataset.img;
		}
	});
};
const darkMode = () => {
	const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
	if (darkThemeMq.matches) {
		// Theme set to dark.
		console.log('you re a dark mode');
	} else {
		console.log('you re a light mode');
		// Theme set to light.
	}
	// $darkmodeBtn.addEventListener('click', () => {
	// 	console.log('hola');
	// });
};
d.addEventListener('DOMContentLoaded', () => {
	categoryHover();
	darkMode();
});
