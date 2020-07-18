import React, { useContext, useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import mevzuatApi from 'api/mevzuat';
import ArticleContext from 'context/ArticleContext';

import SearchBar from 'component/mevzuat/SearchBar';
import ActList from 'component/mevzuat/ActList';
import ArticleList from 'component/mevzuat/ArticleList';
import Sidebar from 'component/mevzuat/Sidebar';
import ArticleHolder from 'component/mevzuat/ArticleHolder';
import Footer from 'component/Footer';

const HomePage = ({ actList }) => {
	const [actListOne, setActListOne] = useState([]);
	const [actListTwo, setActListTwo] = useState([]);
	const [actListThree, setActListThree] = useState([]);
	const [actListFour, setActListFour] = useState([]);

	const [articleListOne, setArticleListOne] = useState([]);
	const [articleListTwo, setArticleListTwo] = useState([]);
	const [articleListThree, setArticleListThree] = useState([]);
	const [articleListFour, setArticleListFour] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [articleLoading, setArticleLoading] = useState(false);

	const { getArticleList } = useContext(ArticleContext);

	const getAll = useCallback(async () => {
		setIsLoading(true);

		setActListOne(actList.slice(0, 3));
		setActListTwo(actList.slice(3, 6));
		setActListThree(actList.slice(6, 9));
		setActListFour(actList.slice(9, 12));

		setIsLoading(false);
		setArticleLoading(true);

		const randomSkipArticle = Math.floor(Math.random() * 1000);

		const popularArticles = await getArticleList({
			limit: 16,
			sort: { hit: -1 },
			skip: randomSkipArticle,
		});

		setArticleListOne(popularArticles.slice(0, 4));

		setArticleListTwo(popularArticles.slice(4, 8));

		setArticleListThree(popularArticles.slice(8, 12));
		
		setArticleListFour(popularArticles.slice(12, 16));

		setArticleLoading(false);
	}, [getArticleList, actList]);

	useEffect(() => {
		getAll();
	}, [getAll]);
	return (
		<React.Fragment>
			<Head>
				<title>Muaccel Mevzuat</title>
				<meta
					name="description"
					content="Temel mevzuata ulaşmanın pratik yolu... Bir kanun veya madde arayın. Alanına göre tasnif edilmiş kanunlar arasında gezinin."
				/>
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
					<ActList items={actListFour} />
					{!articleLoading ? (
						<ArticleList items={articleListFour} />
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
					<Footer />
				</section>
			</div>
		</React.Fragment>
	);
};

export async function getServerSideProps() {
	const response = await mevzuatApi.post(`/acts`, {
		limit: 12,
		sort: { hit: -1 },
	});

	const actList = response.data;

	return { props: { actList } };
}

export default HomePage;
