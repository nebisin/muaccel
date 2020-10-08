import PostPreview from 'component/blog/PostPreview';
import FeedAds from 'component/ads/FeedAds';
import YatayAds from 'component/ads/YatayAds';

const BlogPosts = ({ data }) => {
	return (
		<div className="blog-posts">
			{data.map((item, index) => (
				<React.Fragment>
					{index > 0 && Math.round(index / 3) === index / 3 ? (
						<FeedAds />
					) : (
						''
					)}
					{index === 1 ? <YatayAds /> : ''}
					<PostPreview item={item} key={item._id} />
				</React.Fragment>
			))}
		</div>
	);
};

export default BlogPosts;
