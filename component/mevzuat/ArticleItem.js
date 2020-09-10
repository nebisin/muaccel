import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import AuthContext from 'context/AuthContext';
import ArticleItemBottom from './ArticleItemBottom';
// import ArticleContext from 'context/ArticleContext';

const ArticleItem = ({ item, type, act }) => {
	const { userInfo } = useContext(AuthContext);
	//	const { addArticlesData, articlesData } = useContext(ArticleContext);
	const [full, setFull] = useState(false);

	useEffect(() => {
		if (type === 2) {
			setFull(true);
		}
	}, [type]);

	/*
	useEffect(() => {
		if (item) {
			addArticlesData(item);
		}
	}, [item]);
*/
	if (item.content !== undefined) {
		return (
			<React.Fragment>
				{type === 1 && item.suffixTitle && (
					<div className="suffix-title">
						<b>{item.suffixTitle}</b>
					</div>
				)}
				<div className="card">
					<h2 className="card-header">
						<Link
							href="/mevzuat/[actName]/[id]/madde/[title]"
							as={`/mevzuat/${(item.actId.name || act.name)
								.replace(/\s/g, '-')
								.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
								item.actId._id || act._id
							}/madde/${item.title.replace(/\//g, '-')}`}
						>
							<a>{item.name}</a>
						</Link>
					</h2>
					{!type && item.actId.name && (
						<div className="card-footer">
							<Link
								href="/mevzuat/[actName]/[id]/[page]"
								as={`/mevzuat/${item.actId.name
									.replace(/\s/g, '-')
									.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
									item.actId._id
								}/0`}
								prefetch={false}
							>
								<a>({item.actId.name || act.name})</a>
							</Link>
						</div>
					)}
					<div className="card-content">
						<b>Madde {item.title}</b> -{' '}
						{full ? (
							item.content
						) : item.content.length > 360 ? (
							<React.Fragment>
								{item.content.slice(0, 360)}...
								<button className="button-link" onClick={() => setFull(true)}>
									Devamını Gör
								</button>
							</React.Fragment>
						) : (
							item.content
						)}
					</div>
					{userInfo && <ArticleItemBottom item={item} user={userInfo} />}
				</div>
			</React.Fragment>
		);
	} else {
		return null;
	}
};

export default ArticleItem;
