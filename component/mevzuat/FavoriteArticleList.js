import FeedAds from 'component/ads/FeedAds';
import React from 'react';
import ArticleItem from './ArticleItem';

const FavoriteArticleList = ({ items, type }) => {
	return (
		<React.Fragment>
			{items.map((item, index) => (
				<React.Fragment key={item._id}>
					{index === 1 || (index > 0 && Math.round(index / 3) === index / 3) ? (
						<FeedAds />
					) : (
						''
					)}
					<ArticleItem item={item.article} type={type} />
				</React.Fragment>
			))}
		</React.Fragment>
	);
};

export default FavoriteArticleList;
