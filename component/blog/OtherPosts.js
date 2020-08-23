import { useEffect, useState } from 'react';
import Link from 'next/link';
import mevzuatApi from 'api/mevzuat';
import TimeStamp from 'component/TimeStamp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const OtherPosts = ({ userId, postId }) => {
	const [others, setOthers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setOthers([]);
		const getOthers = async (userId) => {
			setLoading(true);
			const response = await mevzuatApi.get(`/user/blogs/${userId}`);
			const otro = response.data.filter((item) => item._id !== postId);
			setOthers(otro);
			setLoading(false);
		};
		if (userId) {
			getOthers(userId);
		}
	}, [userId, postId]);

	if (loading) {
		return (
			<div className="blog-drafts-container">
				<div
					style={{
						width: 'auto',
						display: 'flex',
					}}
				>
					<div className="loader">Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			{others.length !== 0 && (
				<div className="blog-drafts-container">
					<div className="blog-drafts-header">
						<h3>Yazardan</h3>
					</div>
					<div className="blog-drafts-content">
						<div className="blog-drafts-list">
							{others.map((other) => (
								<div key={other._id} className="blog-drafts-item">
									<Link
										href="/blog/post/[name]/[id]"
										as={`/blog/post/${other.title
											.replace(/\s/g, '-')
											.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${other._id}`}
									>
										<a>
											<div>{other.title}</div>
											<div className="author-preview-timestamp">
												<a>
													<TimeStamp date={other.createdAt} /> yazıldı.
												</a>
											</div>
										</a>
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default OtherPosts;
