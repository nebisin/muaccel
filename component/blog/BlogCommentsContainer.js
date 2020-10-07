import { useEffect, useState } from 'react';
import BlogComments from 'component/blog/BlogComments';
import BlogCreateComment from 'component/blog/BlogCreateComment';
import mevzuatApi from 'api/mevzuat';

const BlogCommentsContainer = ({ blogId }) => {
	const [comments, setComments] = useState([]);
	const [initialLoading, setInitialLoading] = useState(true);

	useEffect(() => {
		const initialLoad = async () => {
			setInitialLoading(true);
			const response = await mevzuatApi.get(`/blog/comments/${blogId}`, {
				params: { limit: '3', createdAt: -1 },
			});
			setComments(response.data);
			setInitialLoading(false);
		};

		initialLoad();
	}, [blogId]);

	return (
		<div className="blog-comments-container" id="comments">
			<React.Fragment>
				<BlogCreateComment
					id={blogId}
					comments={comments}
					setComments={setComments}
				/>
				{initialLoading ? (
					''
				) : (
					<BlogComments
						comments={comments}
						setComments={setComments}
						id={blogId}
					/>
				)}
			</React.Fragment>
		</div>
	);
};

export default BlogCommentsContainer;
