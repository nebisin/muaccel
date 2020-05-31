import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ArticleItem = ({ item, type }) => {
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
					<div className="suffix-title"><b>{item.suffixTitle}</b></div>
				)}
				<div className="card">
					<h2 className="card-header">
						<Link
							href="/mevzuat/article/[id]"
							as={`/mevzuat/article/${item._id}`}
						>
							<a>{item.name}</a>
						</Link>
					</h2>
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
					{!type && (
						<div className="card-footer">
							<Link
								href="/mevzuat/act/[id]/[page]"
								as={`/mevzuat/act/${item.actId._id}/0`}
							>
								<a> {item.actId.name}</a>
							</Link>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	} else {
		return null;
	}
};

export default ArticleItem;
