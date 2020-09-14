import { useEffect, useState } from 'react';
import mevzuatApi from 'api/mevzuat';
import BlogPosts from 'component/blog/BlogPosts';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleHolder from 'component/mevzuat/ArticleHolder';

const AllBlogs = ({ user, token }) => {
	const [blogs, setBlogs] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const getBlogs = async (token, page) => {
		const response = await mevzuatApi.post(
			'/user/blogs',
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
					<BlogPosts data={blogs} />
				) : (
					<React.Fragment>
						{!hasMore && (
							<div className="user-no-favorite">
								<div className="user-no-favorite-description">
									Henüz hiç blog oluşturmamışsınız.
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
