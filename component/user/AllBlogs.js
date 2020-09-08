import { useEffect, useState } from 'react';
import mevzuatApi from 'api/mevzuat';
import BlogPosts from 'component/blog/BlogPosts';

const AllBlogs = ({ user, token }) => {
	const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getAll = async (token) => {
			const response = await mevzuatApi.post(
				'/user/blogs',
				{
					sort: { createdAt: -1 },
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setIsLoading(false);
			if (response.data) {
				setBlogs(response.data);
			}
		};

		if (user && token) {
			getAll(token);
		}
	}, [user, token]);

	return (
		<div className="user-favorite-container">
			{!isLoading ? (
				blogs.length ? (
					<BlogPosts data={blogs} />
				) : (
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
				)
			) : (
				<div style={{ width: 'auto', display: 'flex', marginBottom: '20px', minHeight: '700px' }}>
					<div className="loader">Loading...</div>
				</div>
			)}
		</div>
	);
};

export default AllBlogs;
