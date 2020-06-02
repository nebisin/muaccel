import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ActContext from '../../../context/ActContext';
import ArticleContext from '../../../context/ArticleContext';

import SearchBar from '../../../component/mevzuat/SearchBar';
import ActList from '../../../component/mevzuat/ActList';
import ArticleList from '../../../component/mevzuat/ArticleList';
import Sidebar from '../../../component/mevzuat/Sidebar';

const Categories = () => {
	const router = useRouter();

	const [acts, setActs] = useState([]);
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { getActList } = useContext(ActContext);
	const { getArticleList } = useContext(ArticleContext);

	const categoryId = router.query.id;

	useEffect(() => {
        setIsLoading(true);
        setActs([]);
        setArticles([]);
		const getCategoryActs = async () => {
			const actList = await getActList({
				limit: 3,
                query: { category: categoryId },
                sort: { hit: -1 },
			});
			setActs(actList);
		};
		if (categoryId === undefined) return;
		getCategoryActs();
	}, [categoryId]);

	useEffect(() => {
        let categoryArticles = [];
		const getCategoryArticles = async (id) => {
			const result = await getArticleList({
				limit: 3,
                query: { actId: id },
                sort: { hit: -1 }
			});
            categoryArticles = categoryArticles.concat(result);
		};
		acts.map( async (item) => {
            await getCategoryArticles(item._id);
            setArticles(categoryArticles);
            setIsLoading(false);
		});
	}, [acts]);

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
                    <ActList items={acts} />
                    <ArticleList items={articles} />
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

export default Categories;
