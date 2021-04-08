const getData = async (url, loaderUrl, loaderContainer) => {
	document.querySelector(
		loaderContainer
	).innerHTML = `<img  class="loader" src=${loaderUrl} alt="loader">`;
	const res = await fetch(url);
	const data = await res.json();
	document.querySelector(loaderContainer).innerHTML = '';
	return data;
};
export default getData;
