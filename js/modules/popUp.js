const d = document;
const setPopUpInfo = (info) => {
	// ese id es para que cuando click al add to cart inserte ese id en el objeto
	d.querySelector('.pop-up-name').dataset.id = info.dataset.id;
	d.querySelector('.pop-up-img').src = info.dataset.img;
	d.querySelector('.pop-up-name').textContent = info.dataset.title;
	d.querySelector('.pop-up-price').textContent = `$${info.dataset.price}`;
	d.querySelector('.pop-up-description').textContent = info.dataset.description;
};
const popUp = () => {
	d.addEventListener('click', (e) => {
		if (e.target.matches('.product') || e.target.matches('.product *')) {
			// e.target.parentElement=.product-img-ctn || .product---->they had the same data-attributes
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
