import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';

const BlogDrafts = () => {
	const { token } = useContext(AuthContext);
	const [drafts, setDrafts] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const getDrafts = async (token) => {
		try {
			const response = await mevzuatApi.post(
				'/blog/drafts',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data) {
				setDrafts(response.data);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (token) {
			getDrafts(token);
		}
	}, [token]);

	return (
		<div className="blog-drafts-container">
			<div className="blog-drafts-header">
				<h3>Taslaklarım</h3>
			</div>
			<div className="blog-drafts-content">
				{!drafts ? (
					<React.Fragment>
						{isLoading ? (
							<div style={{ width: 'auto', display: 'flex' }}>
								<div className="loader">Loading...</div>
							</div>
						) : (
							<div className="blog-drafts-none">
								<p>Henüz hiç taslak oluşturmamışsınız</p>
								<div className="blog-drafts-button">
									<Link href="/blog/create" as="/blog/create">
										<a>Şimdi Başla</a>
									</Link>
								</div>
							</div>
						)}
					</React.Fragment>
				) : (
					<ul className="side-list">
						{drafts.map((a) => {
							return (
								<Link href="/blog/update/draft/[id]" as={`/blog/update/draft/${a._id}`} >
									<a className="side-list-item">
										<li>
											<p>{a.title}</p>
										</li>
									</a>
								</Link>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default BlogDrafts;
