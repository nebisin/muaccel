import { useState, useEffect } from 'react';
import mevzuatApi from 'api/mevzuat';
import ArticleHolder from 'component/mevzuat/ArticleHolder';
import ArticleSuggestion from './ArticleSuggestion';

const DasboardArticles = () => {
	const [articleList, setArticleList] = useState();

	useEffect(() => {
		const getArticles = async () => {
            const randomSkipArticle = Math.floor(Math.random() * 1000);

			const response = await mevzuatApi.post('/articles', {
                limit: 1,
                sort: { hit: -1 },
                skip: randomSkipArticle
            });
			setArticleList(response.data);
		};

		getArticles();
	}, []);

	return (
		<div className="dashboard-blogs">
			{articleList ? (
                <ArticleSuggestion article={articleList[0]} />
			) : (
				<ArticleSuggestion />
			)}
		</div>
	);
};

export default DasboardArticles;
