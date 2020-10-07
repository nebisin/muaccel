import FeedAds from 'component/ads/FeedAds';
import YatayAds from 'component/ads/YatayAds';
import React from 'react';
import ArticleItem from './ArticleItem';

const FavoriteArticleList = ({ items, type }) => {
	return (
		<React.Fragment>
			{items.map((item, index) => (
				<React.Fragment key={item._id}>
					{index > 0 && Math.round(index / 4) === index / 4 ? (
						<FeedAds />
					) : (
						''
					)}
					{index ===  1 ? <YatayAds /> : '' }
					<ArticleItem item={item.article} type={type} />
				</React.Fragment>
			))}
		</React.Fragment>
	);
};

export default FavoriteArticleList;
