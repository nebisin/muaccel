import React from 'react';
import ArticleItem from './ArticleItem';
import FeedAds from 'component/ads/FeedAds';

const ArticleList = ({ items, type }) => {
	return (
		<React.Fragment>
			{items.map((item, index) => (
				<React.Fragment key={item._id}>
					{index === 1 || (index > 0 && Math.round(index / 3) === index / 3) ? (
						<FeedAds />
					) : (
						''
					)}
					<ArticleItem item={item} type={type} />
				</React.Fragment>
			))}
		</React.Fragment>
	);
};

export default ArticleList;
