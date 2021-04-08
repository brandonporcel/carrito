const d = document;
const setPopUpInfo = (info) => {
	const $popUpCtn = d.querySelector('.pop-up-ctn');
	$popUpCtn.querySelector('.pop-up-name').textContent = info.dataset.title;
	$popUpCtn.querySelector(
		'.pop-up-price'
	).textContent = `$${info.dataset.price}`;
	$popUpCtn.querySelector('.pop-up-description').textContent =
		info.dataset.description;
};
const popUp = () => {
	d.addEventListener('click', (e) => {
		if (e.target.matches('.product') || e.target.matches('.product *')) {
			setPopUpInfo(e.target.parentElement);
			d.querySelector('.pop-up-wrapper').classList.remove('none');
		} else if (e.target.matches('.pop-up-close-btn')) {
			d.querySelector('.pop-up-wrapper').classList.add('none');
		} else if (
			!e.target.matches('.pop-up-ctn *') &&
			!e.target.matches('.pop-up-ctn')
		) {
			d.querySelector('.pop-up-wrapper').classList.add('none');
		}
	});
};
export default popUp;
