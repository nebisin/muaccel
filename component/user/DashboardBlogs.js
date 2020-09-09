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
			console.log(response.data);
			setBlogList(response.data);
		};

		getBlogs();
	}, []);

	return (
		<div className="dashboard-blogs">
			<div className="dashboard-section-title">
				<h2 className="title">Önerilen Blog Yazıları</h2>
			</div>
			{blogList ? (
				<BlogPosts data={blogList} />
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
