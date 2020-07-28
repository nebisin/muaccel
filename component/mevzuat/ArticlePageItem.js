import React, {useEffect, useState} from 'react';
import mevzuatApi from 'api/mevzuat';

import Favorite from './Favorite';

const ArticleItem = ({ item }) => {
	const [article, setArticle] = useState(item);

	useEffect(() => {
		const getArticle = async (item) => {
			if(item){
				const response = await mevzuatApi.get('/article', { params: { id: item._id } });
				setArticle(response.data.article);
			}
		}
		getArticle(item);
	}, [item])

	if (article.content !== undefined) {
		return (
			<article className="article-page-card">
				<div className="article-page-card-header">
					<h2>Madde {article.title}</h2>
					<h1>{article.name}</h1>
				</div>
				<div className="article-page-card-content">{article.content}</div>
				<Favorite position="top" articleId={article._id} />
			</article>
		);
	} else {
		return null;
	}
};

export default ArticleItem;
