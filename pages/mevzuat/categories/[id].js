import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ActContext from 'context/ActContext';
import ArticleContext from 'context/ArticleContext';

import SearchBar from 'component/mevzuat/SearchBar';
import ActList from 'component/mevzuat/ActList';
import ArticleList from 'component/mevzuat/ArticleList';
import Sidebar from 'component/mevzuat/Sidebar';
import ArticleHolder from 'component/mevzuat/ArticleHolder';

const Categories = () => {
	const router = useRouter();

	const [acts, setActs] = useState([]);
	const [articles, setArticles] = useState([]);
	const [categoryName, setCategoryName] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [articleLoading, setArticleLoading] = useState(false);

	const { getActList } = useContext(ActContext);
	const { getArticleList } = useContext(ArticleContext);

	const categoryId = router.query.id;

	useEffect(() => {
		setIsLoading(true);
		setActs([]);
		setArticles([]);
		setCategoryName('');
		const getCategoryActs = async () => {
			switch (categoryId) {
				case "0":
					setCategoryName('Medenî Usul ve İcra-İflâs Hukuku');
					break; 
				case "1":
					setCategoryName('İş ve Sosyal Güvenlik Hukuku');
					break; 
				case "2":
					setCategoryName('Medeni Hukuk');
					break; 
				case "3":
					setCategoryName('Ceza ve Ceza Muhakemesi Hukuku');
					break; 
				case "4":
					setCategoryName('Milletlerarası Özel Hukuk ve Usul Hukuku');
					break; 
				default:
					setCategoryName('');
					break; 
			}
			const actList = await getActList({
				limit: 3,
				query: { category: categoryId },
				sort: { hit: -1 },
			});
			setActs(actList);
			setIsLoading(false);
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
				sort: { hit: -1 },
			});
			categoryArticles = categoryArticles.concat(result);
		};
		acts.map(async (item) => {
			setArticleLoading(true);
			await getCategoryArticles(item._id);
			setArticles(categoryArticles);
			setArticleLoading(false);
		});
	}, [acts]);

	return (
		<React.Fragment>
			<Head>
				<title>{categoryName} | Muaccel Mevzuat</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="flex-container">
				<Sidebar type="category" id={categoryId} />
				<section id="showcase">
					<SearchBar />
					<h4 className="title">"{categoryName}" kategorisinden sonuçlar:</h4>
					<ActList items={acts} />
					{articleLoading ? (
						<ArticleHolder />
					) : (
						<ArticleList items={articles} />
					)}
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
