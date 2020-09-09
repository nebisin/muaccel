import { useState, useEffect } from 'react';
import mevzuatApi from 'api/mevzuat';
import ArticleList from 'component/mevzuat/ArticleList';
import ArticleHolder from 'component/mevzuat/ArticleHolder';

const DasboardArticles = () => {
	const [articleList, setArticleList] = useState();

	useEffect(() => {
		const getArticles = async () => {
			const response = await mevzuatApi.post('/articles', {
                limit: 3,
                sort: { hit: -1 },
            });
			setArticleList(response.data);
		};

		getArticles();
	}, []);

	return (
		<div className="dashboard-blogs">
			{articleList ? (
                <ArticleList items={articleList} />
			) : (
				<ArticleHolder />
			)}
		</div>
	);
};

export default DasboardArticles;
