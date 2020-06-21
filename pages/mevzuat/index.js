import React, { useContext, useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import ActContext from 'context/ActContext';
import ArticleContext from 'context/ArticleContext';

import SearchBar from 'component/mevzuat/SearchBar';
import ActList from 'component/mevzuat/ActList';
import ArticleList from 'component/mevzuat/ArticleList';
import Sidebar from 'component/mevzuat/Sidebar';
import ArticleHolder from 'component/mevzuat/ArticleHolder';
import BottomBar from 'component/BottomBar'

const HomePage = () => {
	const [actListOne, setActListOne] = useState([]);
	const [actListTwo, setActListTwo] = useState([]);
	const [actListThree, setActListThree] = useState([]);

	const [articleListOne, setArticleListOne] = useState([]);
	const [articleListTwo, setArticleListTwo] = useState([]);
	const [articleListThree, setArticleListThree] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [articleLoading, setArticleLoading] = useState(false);

	const { getActList } = useContext(ActContext);
	const { getArticleList } = useContext(ArticleContext);

	const getAll = useCallback(async () => {
		setIsLoading(true);

		const popularActs = await getActList({
			limit: 9,
			sort: { hit: -1 },
		});
		setActListOne(popularActs.slice(0, 3));
		setActListTwo(popularActs.slice(3, 6));
		setActListThree(popularActs.slice(6, 9));

		setIsLoading(false);
		setArticleLoading(true);

		const randomSkipArticle = Math.floor(Math.random() * 1000);

		const popularArticles = await getArticleList({
			limit: 12,
			sort: { hit: 1 },
			skip: randomSkipArticle,
		});

		setArticleListOne(popularArticles.slice(0, 4));

		setArticleListTwo(popularArticles.slice(4, 8));

		setArticleListThree(popularArticles.slice(8, 12));
		setArticleLoading(false);
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
					{!articleLoading ? (
						<ArticleList items={articleListOne} />
					) : (
						<ArticleHolder />
					)}
					<ActList items={actListTwo} />
					{!articleLoading ? (
						<ArticleList items={articleListTwo} />
					) : (
						<ArticleHolder />
					)}{' '}
					<ActList items={actListThree} />
					{!articleLoading ? (
						<ArticleList items={articleListThree} />
					) : (
						<ArticleHolder />
					)}{' '}
					{isLoading ? (
						<div
							style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}
						>
							<div className="loader">Loading...</div>
						</div>
					) : (
						<Link href="/mevzuat/kanun" as="/mevzuat/kanun">
							<a>
								<div className="all-act normal-none">Bütün Kanunları Gör</div>
							</a>
						</Link>
					)}
				</section>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
