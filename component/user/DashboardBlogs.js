import { useState, useEffect } from 'react';
import mevzuatApi from 'api/mevzuat';
import BlogPosts from 'component/blog/BlogPosts';
import BlogSuggestion from './BlogSuggestion';

const DashboardBlogs = () => {
	const [blogList, setBlogList] = useState();

	useEffect(() => {
		const getBlogs = async () => {
			const response = await mevzuatApi.get(`/blogs`, {
				params: { status: '2', limit: 1 },
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
				<BlogSuggestion blog={blogList[0]} />
			) : (
				<BlogSuggestion />
			)}
		</div>
	);
};

export default DashboardBlogs;
