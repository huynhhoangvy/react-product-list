type RawProductProps = {
	'id': number,
	'title': string,
	'description': string,
	'price': number,
	'discountPercentage': number,
	'rating': number,
	'stock': number,
	'brand': string,
	'category': string,
	'thumbnail': string,
	'images': string[],
}

type DisplayedProductProps = {
	name: string,
	price: number,
	discount: number,
	thumbnail: string
}

type ResultProps = {
	searchKey: string
}

export type { RawProductProps, DisplayedProductProps, ResultProps };
