import PostPreview from 'component/blog/PostPreview';
import FeedAds from 'component/ads/FeedAds';

const BlogPosts = ({ data }) => {
	return (
		<div className="blog-posts">
			{data.map((item, index) => (
				<React.Fragment>
					{index === 1 || (index > 0 && Math.round(index / 3) === index / 3) ? (
						<FeedAds />
					) : (
						''
					)}
					<PostPreview item={item} key={item._id} />
				</React.Fragment>
			))}
		</div>
	);
};

export default BlogPosts;
