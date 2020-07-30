import { useState } from 'react';
import mevzuatApi from 'api/mevzuat';
import Head from 'next/head';
import { EditorState, convertFromRaw } from 'draft-js';
import ReadOnly from 'component/draft/ReadOnly';
import UserWidget from 'component/user/UserWidget';

const ShowPost = ({ data }) => {
	const rawContentFromStore = convertFromRaw(JSON.parse(data.content));
	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(rawContentFromStore)
	);

	return (
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
				<div className="create-blog-container">
					<div className="create-blog-section">
						<div className="post-preview">
							<h1 className="blog-post-title">{data.title}</h1>

							<div className="author-preview">
								<a className="author-preview-logo"></a>
								<a className="author-preview-name">
									<div className="author-preview-displayname">
										{data.author.name}
									</div>
									<div className="author-preview-username">
										@{data.author.userName}
									</div>
								</a>
							</div>

							<div className="blog-post-abstract">{data.abstract}</div>
							<div className="blog-post-content">
								<ReadOnly
									editorState={editorState}
									setEditorState={setEditorState}
								/>
							</div>
						</div>
					</div>
					<div className="create-blog-sidebar">
						<UserWidget user={data.author} />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export async function getServerSideProps({ params }) {
	let id = params.id;

	const response = await mevzuatApi.get(`/blog/${id}`);
	const data = response.data;

	return { props: { data } };
}

export default ShowPost;
