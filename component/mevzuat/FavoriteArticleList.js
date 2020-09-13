import React from 'react';
import ArticleItem from './ArticleItem';

const FavoriteArticleList = ({ items, type }) => {
	return (
		<React.Fragment>
			{items.map((item) => (
				<ArticleItem key={item._id} item={item.article} type={type} />
			))}
		</React.Fragment>
	);
};

export default FavoriteArticleList;
