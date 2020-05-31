import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({ items, type }) => {
	return (
		<React.Fragment>
			{items.map((item) => (
				<ArticleItem key={item._id} item={item} type={type} />
			))}
		</React.Fragment>
	);
};

export default ArticleList;
