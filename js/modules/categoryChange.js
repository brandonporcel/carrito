const d = document;
const categoryChange = () => {
	const $select = d.getElementById('sort-by-category');
	$select.addEventListener('change', () => {
		if ($select.value === 'jewelery') {
			// hide products.show summary
			// window.location.pathname = '/pages/jewelery.html';
		}
	});
};
export default categoryChange;
