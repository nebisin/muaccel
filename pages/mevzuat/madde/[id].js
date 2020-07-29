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
							{article.name} - {article.actId.name} | Muaccel Mevzuat
						</title>
						<meta
							name="description"
							content={`Madde ${article.title} - ${article.content}`}
						/>
						<meta
							property="og:title"
							content={`${article.name} - ${article.actId.name} | Muaccel Mevzuat`}
						/>
						<meta
							property="og:description"
							content={`Madde ${article.title} - ${article.content}`}
						/>
						<meta
							property="og:image"
							content="https://www.muaccel.com/mevzuatog.jpg"
						/>
					</Head>
					<div className="flex-container">
						{article && (
							<React.Fragment>
								<Sidebar
									type="article"
									id={article._id}
									art={article}
								/>
								<section id="showcase">
									<Link
										href="/mevzuat/kanun/[id]/[page]"
										as={`/mevzuat/kanun/${article.actId._id}/0`}
									>
										<a>
											<div className="act-title">
												{article.actId.title && (
													<p>{article.actId.title} sayılı </p>
												)}
												<p>{article.actId.name}</p>
											</div>
										</a>
									</Link>
									<OtherArticles
										before={before}
										after={after}
										actId={article.actId._id}
									/>
									<ArticlePageItem item={article} />
									{!noteLoading ? (
										isLoggedIn && (
											<ArticleNote
												articleId={article._id}
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

export async function getServerSideProps({ params }) {
	let id = params.id;

	const response = await mevzuatApi.get('/article', { params: { id } });
	const { article, before, after } = response.data;

	return { props: { article, before, after } };
}

export default ArticleRoute;
