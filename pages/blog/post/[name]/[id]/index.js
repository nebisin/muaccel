import { useState, useEffect } from 'react';
import mevzuatApi from 'api/mevzuat';
import Head from 'next/head';
import { EditorState, convertFromRaw } from 'draft-js';
import ReadOnly from 'component/draft/ReadOnly';
import UserWidget from 'component/user/UserWidget';
import AuthorPreview from 'component/AuthorPreview';
import OtherPosts from 'component/blog/OtherPosts';

import BlogButtons from 'component/blog/BlogButtons';
const ShowPost = ({ data }) => {
	const [editorState, setEditorState] = useState();

	useEffect(() => {
		const getContent = async (id) => {
			if (!id) return;
			const response = await mevzuatApi.get(`/blog/content/${id}`);
			const data = response.data;
			const rawContentFromStore = convertFromRaw(JSON.parse(data.content));
			setEditorState(EditorState.createWithContent(rawContentFromStore));
		};

		if (data) {
			getContent(data._id);
		}
	}, [data]);

	return (
		<React.Fragment>
			{data && (
				<React.Fragment>
					<Head>
						<title>{data.title} | Muaccel Blog</title>
						<meta name="description" content={data.abstract} />
						<meta property="og:title" content={data.title} />
						<meta property="og:description" content={data.abstract} />
						<meta
							property="og:image"
							content="https://www.muaccel.com/blog-hero-photo.jpg"
						/>
					</Head>
					<div className="blog-container">
						<div className="read-blog-container">
							<div className="create-blog-section">
								<div className="blog-post">
									<h1 className="blog-post-title">{data.title}</h1>
									<AuthorPreview data={data} />
									<div
										className="blog-post-out"
										style={{
											backgroundImage: 'url(' + '/post-preview.jpg' + ')',
										}}
									/>
									<div className="blog-post-abstract">{data.abstract}</div>
									<BlogButtons />
									<div className="blog-post-content">
										{editorState ? (
											<ReadOnly
												editorState={editorState}
												setEditorState={setEditorState}
											/>
										) : (
											<div
												style={{
													width: 'auto',
													display: 'flex',
													marginBottom: '20px',
												}}
											>
												<div className="loader">Loading...</div>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="create-blog-sidebar">
								<UserWidget user={data.author} />
								{/* <OtherPosts /> */}
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const res = await mevzuatApi.get('/blogs', { params: {} });
	const posts = res.data;
	// Get the paths we want to pre-render based on posts
	const paths = posts.map((post) => ({
		params: { name: post.title.replace(/\s/g, '-'), id: post._id },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	let id = params.id;

	const response = await mevzuatApi.get(`/blog/${id}`);
	const data = response.data;

	return { props: { data }, unstable_revalidate: 1 };
}

export default ShowPost;
