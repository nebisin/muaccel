import FeedAds from 'component/ads/FeedAds';
import PostPreview from 'component/blog/PostPreview';

const BookmarkBlogPost = ({ data }) => {
	return (
		<div className="blog-posts">
			{data.map((item, index) => (
				<React.Fragment key={item._id}>
					{index === 1 || (index > 0 && Math.round(index / 3) === index / 3) ? (
						<FeedAds />
					) : (
						''
					)}
					<PostPreview item={item.blog} key={item._id} />
				</React.Fragment>
			))}
		</div>
	);
};

export default BookmarkBlogPost;
