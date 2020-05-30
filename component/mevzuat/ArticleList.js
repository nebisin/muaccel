import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({ items }) => {
	return (
		<React.Fragment>
			{items.map((item) => (
				<ArticleItem key={item._id} item={item} />
			))}
		</React.Fragment>
	);
};

export default ArticleList;
