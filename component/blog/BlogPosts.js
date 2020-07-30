import PostPreview from 'component/blog/PostPreview'
const BlogPosts = ({data}) => {
	return (
		<div className="blog-posts">
			{data.map((item) => (
				<PostPreview item={item} />

			))}

		</div>
	);
};

export default BlogPosts;
