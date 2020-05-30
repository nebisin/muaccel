import React, { useContext, useEffect, useState, useCallback } from 'react';

import ActContext from '../../context/ActContext';
import ArticleContext from '../../context/ArticleContext';

import Navbar from '../../component/mevzuat/Navbar';
import SearchBar from '../../component/mevzuat/SearchBar';
import ActList from '../../component/mevzuat/ActList';
import ArticleList from '../../component/mevzuat/ArticleList';
import Sidebar from '../../component/mevzuat/Sidebar';

const HomePage = () => {

	const [popularActList, setPopularActList] = useState([]);
	const [newActList, setNewActList] = useState([]);

	const [popularArticleList, setPopularArticleList] = useState([]);
	const [newArticleList, setNewArticleList] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const { getActList } = useContext(ActContext);
	const { getArticleList } = useContext(ArticleContext);

	const getAll = useCallback(async () => {
		setIsLoading(true);
		const popularActs = await getActList({ limit: 3, sort: { hit: -1 } });
		setPopularActList(popularActs);

		const popularArticles = await getArticleList({
			limit: 5,
			sort: { hit: -1 },
		});
		setPopularArticleList(popularArticles);

		const newActs = await getActList({
			limit: 3,
			skip: 1,
			sort: { hit: 1 },
		});
		setNewActList(newActs);

		const newArticles = await getArticleList({
			limit: 10,
			skip: 1,
			sort: { hit: 1 },
		});
		setNewArticleList(newArticles);
		setIsLoading(false);
	}, [getActList, getArticleList]);

	useEffect(() => {
		getAll();
	}, [getAll]);
	return (
		<div className="container">
			<Navbar />
			<div className="flex-container">
				<Sidebar type="home" />
				<section id="showcase">
					<SearchBar />
					<ActList items={popularActList} />
					<ArticleList items={popularArticleList} />
					<ActList items={newActList} />
					<ArticleList items={newArticleList} />
					{isLoading && (
						<div
							style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}
						>
							<div className="loader">Loading...</div>
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default HomePage;
