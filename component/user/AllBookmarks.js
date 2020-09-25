import { useState } from 'react';
import mevzuatApi from 'api/mevzuat';
import BookmarkBlogPost from 'component/blog/BookmarkBlogPost';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleHolder from 'component/mevzuat/ArticleHolder';

const AllBlogs = ({ token }) => {
	const [blogs, setBlogs] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const getBlogs = async (token, page) => {
		const response = await mevzuatApi.post(
			'/blog/bookmarks',
			{
				limit: 3,
				skip: (page - 1) * 3,
				sort: { createdAt: -1 },
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.data) {
			if (response.data.length < 3) {
				setHasMore(false);
			}
			setBlogs((blogs) => blogs.concat(response.data));
		}
	};

	return (
		<div className="user-favorite-container create-blog-section">
			<InfiniteScroll
				pageStart={0}
				loadMore={(page) => getBlogs(token, page)}
				hasMore={hasMore}
				loader={<ArticleHolder key={0} />}
				threshold={800}
			>
				{blogs.length ? (
					<BookmarkBlogPost data={blogs} />
				) : (
					<React.Fragment>
						{!hasMore && (
							<div className="user-no-favorite">
								<div className="user-no-favorite-description">
									Henüz hiçbir yazıyı okuma listenize eklememişsiniz.
								</div>
								<div className="user-no-favorite-image-container fade-in">
									<img
										className="user-no-favorite-image"
										src="/noblog.png"
										alt="blog"
									/>
								</div>
							</div>
						)}
					</React.Fragment>
				)}
			</InfiniteScroll>
		</div>
	);
};

export default AllBlogs;
