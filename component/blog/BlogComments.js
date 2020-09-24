import { useState, useEffect } from 'react';
import BlogCommentItem from './BlogCommentItem';
import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const BlogComments = ({ comments, setComments, id }) => {
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (comments.length < 3) {
			setHasMore(false);
		} else {
			setHasMore(true);
		}
	}, [id]);

	const loadMore = async (p, blogId) => {
		if (!blogId) return;
		setIsLoading(true);
		try {
			const response = await mevzuatApi.get(`/blog/comments/${blogId}`, {
				params: { limit: '3', skip: `${p * 3}`, createdAt: -1 },
			});
			setComments((commentList) => commentList.concat(response.data));

			setPage((page) => page + 1);
			if (response.data.length < 3) {
				setHasMore(false);
			}
			setIsLoading(false);
			return response.data;
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			return [];
		}
	};

	return (
		<React.Fragment>
			{!comments.length ? (
				<React.Fragment>
					<div className="no-comment">
						<p>Bu yazı hakkında hiç yorum yazılmamış.</p>
						<p>İlk yorum yapan siz olun.</p>
					</div>
				</React.Fragment>
			) : (
				<div className="blog-comment-list">
					{comments.map((comment) => (
						<BlogCommentItem comment={comment} key={comment._id} />
					))}
					<div className="more-blog-comments">
						{hasMore ? (
							<button
								onClick={() => loadMore(page, id)}
								disabled={isLoading}
								className="more-blog-comments-button"
							>
								{isLoading ? (
									<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
								) : (
									'Daha fazla yorum yükle'
								)}
							</button>
						) : (
							<div className="no-comment">Daha fazla yorum bulunmuyor.</div>
						)}
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default BlogComments;
