import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../../component/mevzuat/SearchBar';
import ArticleContext from '../../../context/ArticleContext';
import ArticleList from '../../../component/mevzuat/ArticleList';
import ActList from '../../../component/mevzuat/ActList';
import Sidebar from '../../../component/mevzuat/Sidebar';

import ActContext from '../../../context/ActContext';

const SearchRoute = ({ location }) => {
	const router = useRouter();
	const [term, setTerm] = useState('');
	const [firstArticles, setFirstArticles] = useState([]);
	const [secondArticles, setSecondArticles] = useState([]);
	const [seacondActs, setSecondActs] = useState([]);
	const [firstActs, setFirstActs] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	let searchTerm = router.query.term;
	const { searchArticle } = useContext(ArticleContext);
	const { searchAct } = useContext(ActContext);

	useEffect(() => {
		if (!searchTerm) {
			setError('Bir arama terimi girmelisiniz!');
		} else {
			setError(null);
			setTerm(searchTerm);
		}
	}, [setTerm, searchTerm]);

	useEffect(() => {
		const getResults = async (term) => {
			setIsLoading(true);
			const acts = await searchAct(term);
			const actsListOne = acts.slice(0, 3);
			setFirstActs(actsListOne);
			const articles = await searchArticle(term);
			const articlesListOne = articles.slice(0, 3);
			setFirstArticles(articlesListOne);
			const actsListTwo = acts.slice(3);
			setSecondActs(actsListTwo);
			const articlesListTow = articles.slice(3);
			setSecondArticles(articlesListTow);
			if (acts.length === 0 && articles.length === 0) {
				setError(
					'Herhangi bir sonuç bulunamadı! Arama terimini değiştirerek tekrar deneyebilirsiniz.'
				);
			} else {
				setError(null);
			}
			setIsLoading(false);
		};
		if (term) {
			getResults(term);
		}
	}, [term, searchArticle, searchAct]);

	return (

			<div className="flex-container">
				<Sidebar type="home" />
				<section id="showcase">
					<SearchBar searchTerm={searchTerm} />
					<h4 className="title">"{term}" için arama sonuçları:</h4>
					{firstActs && <ActList items={firstActs} />}
					{firstArticles && <ArticleList items={firstArticles} />}
					{seacondActs && <ActList items={seacondActs} />}
					{secondArticles && <ArticleList items={secondArticles} />}
					{error && <p>{error}</p>}
					{isLoading && (
						<div
							style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}
						>
							<div className="loader">Loading...</div>
						</div>
					)}
				</section>
			</div>
	);
};

export default SearchRoute;
