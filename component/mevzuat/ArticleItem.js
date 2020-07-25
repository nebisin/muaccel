import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import AuthContext from 'context/AuthContext';
import ArticleItemBottom from './ArticleItemBottom';

const ArticleItem = ({ item, type }) => {
	const { userInfo } = useContext(AuthContext);
	const [full, setFull] = useState(false);

	useEffect(() => {
		if (type === 2) {
			setFull(true);
		}
	}, [type]);

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
						<Link href="/mevzuat/madde/[id]" as={`/mevzuat/madde/${item._id}`}>
							<a>{item.name}</a>
						</Link>
					</h2>
					{!type && (
						<div className="card-footer">
							<Link
								href="/mevzuat/kanun/[id]/[page]"
								as={`/mevzuat/kanun/${item.actId._id}/0`}
							>
								<a>({item.actId.name})</a>
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
					{userInfo && <ArticleItemBottom item={item} user={userInfo} /> }
				</div>
			</React.Fragment>
		);
	} else {
		return null;
	}
};

export default ArticleItem;
