import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ArticleItem from '../../../component/mevzuat/ArticleItem';
import OtherArticles from '../../../component/mevzuat/OtherArticles';
import ArticleContext from '../../../context/ArticleContext';
import Sidebar from '../../../component/mevzuat/Sidebar';
import Navbar from '../../../component/mevzuat/Navbar';

const ArticleRoute = () => {
	const router = useRouter();

	const { getArticleById, getArticleByLocation } = useContext(ArticleContext);
	const [article, setArticle] = useState({});
	const [before, setBefore] = useState({});
	const [after, setAfter] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		async function article(id) {
			setIsLoading(true);
			try {
				const response = await getArticleById(id);
				setArticle(response);
				const beforeResponse = await getArticleByLocation(
					response.location - 1,
					response.actId._id
				);
				setBefore(beforeResponse);
				const afterResponse = await getArticleByLocation(
					response.location + 1,
					response.actId._id
				);
				setAfter(afterResponse);
			} catch (error) {
				const msg = error.response.data.error;
				setError(msg);
			}
			setIsLoading(false);
		}
		if (router.query.id !== undefined) {
			article(router.query.id);
		}
	}, [getArticleById, router.query.id, getArticleByLocation]);

	return (
		<div className="container">
			<Navbar />
			<div className="flex-container">
				<Sidebar type="article" id={router.query.id} art={article} />
				<section id="showcase">
					{error && <h6>{error}</h6>}
					{article._id !== undefined && !isLoading && (
						<React.Fragment>
							<Link
								href="/mevzuat/act/[id]"
								as={`/mevzuat/act/${article.actId._id}`}
							>
								<a>
									<div className="act-title">
										<p>
											{article.actId.title} sayılı {article.actId.name}
										</p>
									</div>
								</a>
							</Link>
							<OtherArticles
								before={before}
								after={after}
								actId={article.actId._id}
							/>
							<ArticleItem item={article} type={2} />
						</React.Fragment>
					)}
					{isLoading && (
						<div
							style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}
						>
							<div className="loader">Loading...</div>
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default ArticleRoute;
