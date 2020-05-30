import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

const SearchBar = ({searchTerm}) => {
	const [term, setTerm] = useState('');
	const router = useRouter()

	useEffect(() => {
		setTerm(searchTerm);
	}, [searchTerm])

	const handleSubmit = (event) => {
		if (!term) {
			event.preventDefault();
			alert('Bir arama terimi girmelisiniz!');
			return;
		}
		event.preventDefault();
		router.push('/mevzuat/search/[term]', `/mevzuat/search/${term}`);
	};

	const handleChange = (event) => {
		setTerm(event.target.value)
	}

	return (
		<form className="search-form" onSubmit={handleSubmit}>
			<input
				className="search-input"
				type="search"
				placeholder="Kanun veya madde ara"
				value={term || ''}
				onChange={handleChange}
			/>
			<input className="button-blue" type="submit" value="Ara" />
		</form>
	);
};

export default SearchBar;
