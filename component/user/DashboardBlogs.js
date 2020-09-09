import { useState, useEffect } from 'react';
import mevzuatApi from 'api/mevzuat';
import BlogPosts from 'component/blog/BlogPosts';

const DashboardBlogs = () => {
	const [blogList, setBlogList] = useState();

	useEffect(() => {
		const getBlogs = async () => {
			const response = await mevzuatApi.get(`/blogs`, {
				params: { status: '2', limit: 3 },
				data: {
					sort: { createdAt: -1 },
				},
			});
			setBlogList(response.data);
		};

		getBlogs();
	}, []);

	return (
		<div className="dashboard-blogs">
			{blogList ? (
				<div className="create-blog-section">
					<BlogPosts data={blogList} />
				</div>
			) : (
				<div
					style={{
						width: 'auto',
						display: 'flex',
						marginBottom: '20px',
						minHeight: '700px',
					}}
				>
					<div className="loader">Loading...</div>
				</div>
			)}
		</div>
	);
};

export default DashboardBlogs;
