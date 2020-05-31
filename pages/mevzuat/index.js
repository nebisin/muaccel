import React, { useContext, useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

import ActContext from '../../context/ActContext';
import ArticleContext from '../../context/ArticleContext';

import SearchBar from '../../component/mevzuat/SearchBar';
import ActList from '../../component/mevzuat/ActList';
import ArticleList from '../../component/mevzuat/ArticleList';
import Sidebar from '../../component/mevzuat/Sidebar';

const HomePage = () => {
	const [actListOne, setActListOne] = useState([]);
	const [actListTwo, setActListTwo] = useState([]);
	const [actListThree, setActListThree] = useState([]);

	const [articleListOne, setArticleListOne] = useState([]);
	const [articleListTwo, setArticleListTwo] = useState([]);
	const [articleListThree, setArticleListThree] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const { getActList } = useContext(ActContext);
	const { getArticleList } = useContext(ArticleContext);

	const getAll = useCallback(async () => {
		setIsLoading(true);
		const popularActs = await getActList({ limit: 9, sort: { hit: -1 } });
		setActListOne(popularActs.slice(0, 3));

		const randomSkip = Math.floor(Math.random() * 450)

		const popularArticles = await getArticleList({
			limit: 12,
			sort: { hit: -1 },
			skip: randomSkip
		});
		setArticleListOne(popularArticles.slice(0, 4));

		setActListTwo(popularActs.slice(3, 6))
		setArticleListTwo(popularArticles.slice(4, 8));

		setActListThree(popularActs.slice(6, 9))
		setArticleListThree(popularArticles.slice(8, 12));

		setIsLoading(false);
	}, [getActList, getArticleList]);

	useEffect(() => {
		getAll();
	}, [getAll]);
	return (
		<React.Fragment>
			<Head>
				<title>Muaccel Mevzuat</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="flex-container">
				<Sidebar type="home" />
				<section id="showcase">
					<SearchBar />
					<ActList items={actListOne} />
					<ArticleList items={articleListOne} />
					<ActList items={actListTwo} />
					<ArticleList items={articleListTwo} />
					<ActList items={actListThree} />
					<ArticleList items={articleListThree} />
					{isLoading && (
						<div
							style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}
						>
							<div className="loader">Loading...</div>
						</div>
					)}
				</section>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
