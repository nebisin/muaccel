import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import mevzuatApi from '../../../api/mevzuat';

import ArticleItem from '../../../component/mevzuat/ArticleItem';
import OtherArticles from '../../../component/mevzuat/OtherArticles';
import Sidebar from '../../../component/mevzuat/Sidebar';

const ArticleRoute = ({ article, before, after }) => {
	return (
		<React.Fragment>
			<Head>
				<title>
					Madde {article.title} | {article.actId.name} | Muaccel Mevzuat
				</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={article.name} />
			</Head>
			<div className="flex-container">
				<Sidebar type="article" id={article._id} art={article} />
				<section id="showcase">
					{article._id !== undefined && (
						<React.Fragment>
							<Link
								href="/mevzuat/act/[id]/[page]"
								as={`/mevzuat/act/${article.actId._id}/0`}
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
				</section>
			</div>
		</React.Fragment>
	);
};

export async function getServerSideProps(context) {
	let id = context.params.id;

	const response = await mevzuatApi.get('/article', { params: { id } });
	const { article, before, after } = response.data;

	return { props: { article, before, after } };
}

export default ArticleRoute;
