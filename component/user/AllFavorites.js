import { useState } from 'react';
import FavoriteArticleList from 'component/mevzuat/FavoriteArticleList';
import ArticleHolder from 'component/mevzuat/ArticleHolder';
import InfiniteScroll from 'react-infinite-scroller';
import mevzuatApi from 'api/mevzuat';

const AllFavorites = ({token}) => {
	const [hasMore, setHasMore] = useState(true);
	const [list, setList] = useState([]);

	const loadFunc = async (page) => {
		const response = await mevzuatApi.post(
			'/favorite/articles',
			{
				limit: 5,
				skip: (page - 1) * 5,
				sort: { createdAt: -1 },
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.data) {
			if (response.data.length < 5) {
				setHasMore(false);
			}
			setList((list) => list.concat(response.data));
		}
	};

	return (
		<div className="all-notes user-favorite-container">
			<InfiniteScroll
				pageStart={0}
				loadMore={(page) => loadFunc(page)}
				hasMore={hasMore}
				loader={<ArticleHolder key={0} />}
				threshold={800}
			>
				{list.length ? (
					<FavoriteArticleList items={list} />
				) : !hasMore && (
					<div className="user-no-favorite">
						<div className="user-no-favorite-description">
							Henüz hiçbir maddeyi favorilerinize eklememişsiniz.
						</div>
						<div className="user-no-favorite-image-container fade-in">
							<img
								className="user-no-favorite-image"
								src="/nofavorite.png"
								alt="favori"
							/>
						</div>
					</div>
				)}
			</InfiniteScroll>
		</div>
	);
};

export default AllFavorites;
