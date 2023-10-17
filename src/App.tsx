import React, { ChangeEvent, useState, useEffect } from 'react';
import 'App.sass';
import Result from 'components/Result';
import useDebounce from 'hooks/useDebounce';

let isFirstRender: boolean = true;

const App = () => {
	const [query, setQuery] = useState<string>('');
	const [key, setKey] = useState('');

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	useEffect(() => {
		if ( isFirstRender ) isFirstRender = false;
	}, []);

	useEffect(() => {
		if ( !isFirstRender ) {
			if ( query ) {
				setKey(`https://dummyjson.com/products/search?q=${query}`);
			} else {
				setKey('');
			}
		}
	}, [query]);

	const searchKey = useDebounce(key, 800);

	return (
		<div className="app">
			<div>
				<h1>React Searchable & Infinity Scroll Products List</h1>
				<input type="text" placeholder={'type to search..'} value={query} onChange={handleInputChange} />
				<h2>Search result</h2>
				<Result searchKey={searchKey} />
			</div>
		</div>
	);
}

export default App;
