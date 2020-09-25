
import PostPreview from 'component/blog/PostPreview'

const BookmarkBlogPost = ({data}) => {
    
	return (
		<div className="blog-posts">
			{data.map((item) =>{ 
                item.blog.author = item.user;
				return <PostPreview item={item.blog} key={item._id} />
			})}
		</div>
	);
};

export default BookmarkBlogPost;
