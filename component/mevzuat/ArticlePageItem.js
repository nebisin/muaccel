import React, {useEffect, useState} from 'react';
import mevzuatApi from 'api/mevzuat';

import Favorite from './Favorite';

const ArticleItem = ({ item }) => {
	const [article, setArticle] = useState();

	useEffect(() => {
		const getArticle = async (item) => {
			if(item){
				const response = await mevzuatApi.get('/article', { params: { id: item._id } });
				setArticle(response.data.article);
			}
		}
		getArticle(item);
	}, [item])

	if (item.content !== undefined) {
		return (
			<article className="article-page-card">
				<div className="article-page-card-header">
					<h2>Madde {article ? article.title : item.title}</h2>
					<h1>{article ? article.name : item.name}</h1>
				</div>
				<div className="article-page-card-content">{article ? article.content : item.content}</div>
				<Favorite position="top" articleId={article ? article._id : item._id} />
			</article>
		);
	} else {
		return null;
	}
};

export default ArticleItem;
