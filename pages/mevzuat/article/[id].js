import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import mevzuatApi from '../../../api/mevzuat';

import ArticleItem from '../../../component/mevzuat/ArticleItem';
import OtherArticles from '../../../component/mevzuat/OtherArticles';
import ArticleContext from '../../../context/ArticleContext';
import Sidebar from '../../../component/mevzuat/Sidebar';

const ArticleRoute = ({ data }) => {
	const router = useRouter();

	const { getArticleById, getArticleByLocation } = useContext(ArticleContext);
	const [article, setArticle] = useState({});
	const [before, setBefore] = useState({});
	const [after, setAfter] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setArticle(data)
		async function art(data) {
			setIsLoading(true);
			try {
				const beforeResponse = await getArticleByLocation(
					data.location - 1,
					data.actId._id
				);
				setBefore(beforeResponse);
				const afterResponse = await getArticleByLocation(
					data.location + 1,
					data.actId._id
				);
				setAfter(afterResponse);
			} catch (error) {
				const msg = error.response.data.error;
				setError(msg);
			}
			setIsLoading(false);
		}
		if (data._id !== undefined) {
			art(data);
		}
	}, [getArticleById, getArticleByLocation, data]);

	{article._id !== undefined && null}

	return (
		<div className="flex-container">
			<Sidebar type="article" id={article._id} art={article} />
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
					<div style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}>
						<div className="loader">Loading...</div>
					</div>
				)}
			</section>
		</div>
	);
};

export async function getServerSideProps(context) {
	let id = context.params.id;
	
	const response = await mevzuatApi.get('/article', { params: { id } });
	const data = response.data;

	return { props: { data } };
}

export default ArticleRoute;
