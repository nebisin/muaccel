import React from 'react';

const ArticleItem = ({ item }) => {
	if (item.content !== undefined) {
		return (
				<article className="article-page-card">
					<div className="article-page-card-header">
						<h2>Madde {item.title}</h2>
						<h1>{item.name}</h1>
					</div>
					<div className="article-page-card-content">{item.content}</div>
				</article>
		);
	} else {
		return null;
	}
};

export default ArticleItem;
