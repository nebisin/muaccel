import React, { useContext } from 'react';
import AuthContext from 'context/AuthContext';
import ArticleItemBottom from './ArticleItemBottom';

const ArticleItem = ({ item }) => {
	const { userInfo } = useContext(AuthContext);

	if (item) {
		return (
			<article className="article-page-card">
				<div className="article-page-card-header">
					<h2>Madde {item.title}</h2>
					<h1>{item.name}</h1>
				</div>
				<div className="article-page-card-content">{item.content}</div>
				<ArticleItemBottom item={item} user={userInfo} location="in" />
			</article>
		);
	} else {
		return null;
	}
};

export default ArticleItem;
