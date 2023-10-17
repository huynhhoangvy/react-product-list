const fetcher = async (url: string) => {
	try {
		const response = await fetch(url);
		const result = await response.json();
		return result.products;
	}
	catch ( error ) {
		console.error(error);
	}
};

const getKey = (pageIndex: number) => {
	console.log('page index: ', pageIndex);
	const skip = pageIndex * 20;
	return `https://dummyjson.com/products?limit=20&skip=${skip}`;
};

export { fetcher, getKey };
