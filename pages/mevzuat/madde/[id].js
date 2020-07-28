import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import mevzuatApi from 'api/mevzuat';

import AuthContext from 'context/AuthContext';
import ArticlePageItem from 'component/mevzuat/ArticlePageItem';
import OtherArticles from 'component/mevzuat/OtherArticles';
import Sidebar from 'component/mevzuat/Sidebar';
import ArticleNote from 'component/mevzuat/ArticleNote';
import Footer from 'component/Footer';

const ArticleRoute = ({ article, before, after }) => {
	const { isLoggedIn, isLogging, userInfo, token } = useContext(AuthContext);
	const [initialNote, setInitialNote] = useState();
	const [noteId, setNoteId] = useState();
	const [noteLoading, setNoteLoading] = useState(true);
	const [articleLast, setArticleLast] = useState(article);
	const [beforeLast, setBeforeLast] = useState(before);
	const [afterLast, setAfterLast] = useState(after);

	useEffect(() => {
		const getArticle = async (article) => {
			if (article) {
				setArticleLast(article);
				setBeforeLast(before);
				setAfterLast(after);
				const response = await mevzuatApi.get('/article', {
					params: { id: article._id },
				});
				setArticleLast(response.data.article);
				setBeforeLast(response.data.before);
				setAfterLast(response.data.after);
			}
		};
		getArticle(article);
	}, [article, before, after]);

	useEffect(() => {
		setInitialNote();
		const getNote = async () => {
			if (isLoggedIn) {
				setNoteLoading(true);
				const response = await mevzuatApi.get(
					`/note?articleId=${article._id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response?.data?.raw) {
					setInitialNote(response.data.raw);
					setNoteId(response.data._id);
				}
				setNoteLoading(false);
			} else {
				setNoteLoading(false);
			}
		};
		if (!isLogging) {
			getNote();
		}
	}, [isLoggedIn, userInfo, isLogging, article]);

	return (
		<React.Fragment>
			{article && (
				<React.Fragment>
					<Head>
						<title>
							{articleLast.name} - {articleLast.actId.name} | Muaccel Mevzuat
						</title>
						<meta
							name="description"
							content={`Madde ${articleLast.title} - ${articleLast.content}`}
						/>
						<meta
							property="og:title"
							content={`${articleLast.name} - ${articleLast.actId.name} | Muaccel Mevzuat`}
						/>
						<meta
							property="og:description"
							content={`Madde ${articleLast.title} - ${articleLast.content}`}
						/>
						<meta
							property="og:image"
							content="https://www.muaccel.com/mevzuatog.jpg"
						/>
					</Head>
					<div className="flex-container">
						{articleLast && (
							<React.Fragment>
								<Sidebar
									type="article"
									id={articleLast._id}
									art={articleLast}
								/>
								<section id="showcase">
									<Link
										href="/mevzuat/kanun/[id]/[page]"
										as={`/mevzuat/kanun/${articleLast.actId._id}/0`}
									>
										<a>
											<div className="act-title">
												{articleLast.actId.title && (
													<p>{articleLast.actId.title} sayılı </p>
												)}
												<p>{articleLast.actId.name}</p>
											</div>
										</a>
									</Link>
									<OtherArticles
										before={beforeLast}
										after={afterLast}
										actId={articleLast.actId._id}
									/>
									<ArticlePageItem item={articleLast} />
									{!noteLoading ? (
										isLoggedIn && (
											<ArticleNote
												articleId={articleLast._id}
												initialNote={initialNote}
												noteId={noteId}
											/>
										)
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
									<Footer />
								</section>
							</React.Fragment>
						)}
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export async function getStaticPaths() {
	const response = await mevzuatApi.post('/articles', {
		limit: 16,
		sort: { updatedAt: -1 },
	});

	const articles = response.data;

	const paths = articles.map((article) => ({
		params: { id: article._id },
	}));

	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	let id = params.id;

	const response = await mevzuatApi.get('/article', { params: { id } });
	const { article, before, after } = response.data;

	return { props: { article, before, after } };
}

export default ArticleRoute;
