import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import mevzuatApi from '../../../api/mevzuat';

import ArticleItem from '../../../component/mevzuat/ArticleItem';
import OtherArticles from '../../../component/mevzuat/OtherArticles';
import ArticleContext from '../../../context/ArticleContext';
import Sidebar from '../../../component/mevzuat/Sidebar';

const ArticleRoute = ({ data }) => {
	const { getArticleById, getArticleByLocation } = useContext(ArticleContext);
	const [before, setBefore] = useState({});
	const [after, setAfter] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
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

	return (
		<React.Fragment>
			<Head>
				<title>Madde {data.title} | Muaccel Mevzuat</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={data.name} />
			</Head>
			<div className="flex-container">
				<Sidebar type="article" id={data._id} art={data} />
				<section id="showcase">
					{error && <h6>{error}</h6>}
					{data._id !== undefined && !isLoading && (
						<React.Fragment>
							<Link
								href="/mevzuat/act/[id]"
								as={`/mevzuat/act/${data.actId._id}`}
							>
								<a>
									<div className="act-title">
										<p>
											{data.actId.title} sayılı {data.actId.name}
										</p>
									</div>
								</a>
							</Link>
							<OtherArticles
								before={before}
								after={after}
								actId={data.actId._id}
							/>
							<ArticleItem item={data} type={2} />
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
		</React.Fragment>
	);
};

export async function getServerSideProps(context) {
	let id = context.params.id;

	const response = await mevzuatApi.get('/article', { params: { id } });
	const data = response.data;

	return { props: { data } };
}

export default ArticleRoute;
