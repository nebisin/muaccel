import { useState, useEffect, useContext } from 'react';
import mevzuatApi from 'api/mevzuat';
import Head from 'next/head';
import { EditorState, convertFromRaw } from 'draft-js';
import ReadOnly from 'component/draft/ReadOnly';
import UserWidget from 'component/user/UserWidget';
import AuthorPreview from 'component/AuthorPreview';
import OtherPosts from 'component/blog/OtherPosts';
import { TwitterShareButton } from 'react-twitter-embed';

import BlogButtons from 'component/blog/BlogButtons';
import Footer from 'component/Footer';
import BlogCommentsContainer from 'component/blog/BlogCommentsContainer';
import InArticleAds from 'component/ads/InArticleAds';

const ShowPost = ({ data, content }) => {
	const [editorState, setEditorState] = useState();

	useEffect(() => {
		if (!data || !content) return;
		const rawContentFromStore = convertFromRaw(JSON.parse(content.content));
		setEditorState(EditorState.createWithContent(rawContentFromStore));
	}, [data, content]);

	return (
		<React.Fragment>
			{data && (
				<React.Fragment>
					<Head>
						<title>{data.title} | Muaccel Blog</title>
						<link
							rel="canonical"
							href={`/blog/post/${data.title
								.toLocaleLowerCase('tr')
								.replace(/ğ/gim, 'g')
								.replace(/ü/gim, 'u')
								.replace(/ş/gim, 's')
								.replace(/ı/gim, 'i')
								.replace(/ö/gim, 'o')
								.replace(/ç/gim, 'c')
								.replace(/\s/g, '-')
								.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${data._id}`}
						/>
						<meta name="description" content={data.abstract} />
						<meta property="og:title" content={data.title} />
						<meta property="og:description" content={data.abstract} />
						<meta
							property="og:image"
							content="https://www.muaccel.com/muaccel-blog.jpg"
						/>
						<meta
							name="keywords"
							content="Blog, Hukuki Yazılar, Hukuk Metinleri, Mevzuat, Kanun, Hukuk, Muaccel"
						/>
					</Head>
					<div className="blog-container">
						<div className="read-blog-container">
							<div className="create-blog-section">
								<div className="blog-post">
									<h1 className="blog-post-title">{data.title}</h1>
									<AuthorPreview data={data} />
									<div className="blog-post-abstract">{data.abstract}</div>
									<BlogButtons blogId={data._id} />
									<InArticleAds />
									<div className="blog-post-content">
										{editorState ? (
											<React.Fragment>
												<ReadOnly
													editorState={editorState}
													setEditorState={setEditorState}
												/>
												<InArticleAds />
											</React.Fragment>
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
									<BlogCommentsContainer blogId={data._id} />
								</div>
							</div>
							<div className="create-blog-sidebar">
								<div style={{ position: 'sticky', top: '79px' }}>
									<UserWidget user={data.author} id={data.author._id} />
									<OtherPosts userId={data.author._id} postId={data._id} />
								</div>
							</div>
						</div>
						<Footer />
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
		params: {
			name: post.title
				.toLocaleLowerCase('tr')
				.replace(/ğ/gim, 'g')
				.replace(/ü/gim, 'u')
				.replace(/ş/gim, 's')
				.replace(/ı/gim, 'i')
				.replace(/ö/gim, 'o')
				.replace(/ç/gim, 'c')
				.replace(/\s/g, '-')
				.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
			id: post._id,
		},
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	let id = params.id;

	const [response, contentResponse] = await Promise.all([
		mevzuatApi.get(`/blog/${id}`),
		mevzuatApi.get(`/blog/content/${id}`),
	]);
	const data = response.data;
	const content = contentResponse.data;

	return { props: { data, content }, unstable_revalidate: 60 };
}

export default ShowPost;
