import React, { FC, UIEvent, useEffect, useRef } from 'react';
import { DisplayedProductProps, RawProductProps, ResultProps } from 'types/PropsTypes';
import useSWRInfinite from 'swr/infinite';
import { fetcher, getKey } from 'utils/utils';
import useSWR from 'swr';
import Item from 'components/Item';

const PAGE_SIZE = 3;

const Result: FC<ResultProps> = ({ searchKey }) => {
	const {
		data: productData,
		size: productSize,
		setSize: setProductSize,
		isLoading: isProductLoading,
		error: productError,
	} = useSWRInfinite(getKey, fetcher, { revalidateOnFocus: false, revalidateFirstPage: false });
	const {
		data: resultData,
		error: resultError,
		isLoading: isResultLoading,
	} = useSWR(searchKey, fetcher, { revalidateOnFocus: false });

	let productList: DisplayedProductProps[] = [];
	const ulRef = useRef<HTMLUListElement>(null);

	const handleScroll = (e: UIEvent<HTMLUListElement>) => {
		const isAtBottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
		if ( isAtBottom ) {
			if ( productSize === PAGE_SIZE ) return;
			if ( !searchKey ) {
				setProductSize(prevState => prevState + 1);
			}
		}
	};
	const transformData = (rawList: RawProductProps[]): DisplayedProductProps[] => {
		return rawList.map(item => {
			return {
				name: item.title,
				price: item.price,
				discount: item.discountPercentage,
				thumbnail: item.images[0],
			};
		});
	};

	useEffect(() => {
		if ( ulRef.current !== null ) ulRef.current.scrollTo(0, 0);
	}, [searchKey]);

	if ( productData ) {
		productList = transformData([].concat(...productData));
	}
	if ( resultData ) {
		productList = transformData([].concat(...resultData));
	}

	if ( productError || resultError ) return (<div>An error has occurred.</div>);
	if ( isProductLoading || isResultLoading ) return (<div>Loading...</div>);

	return (
		<div>
			<ul className="products" onScroll={handleScroll} ref={ulRef}>
				{productList.length ? productList.map((item, index) => <Item
					                    key={index}
					                    name={item.name}
					                    price={item.price}
					                    discount={item.discount}
					                    thumbnail={item.thumbnail}
				                    />)
				                    : <div>No result</div>
				}
			</ul>
		</div>
	);
};

export default Result;
