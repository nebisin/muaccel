import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import GoArticle from './GoArticle';

const Others = ({ sections, page, actId }) => {
	const [before, setBefore] = useState(null);
	const [after, setAfter] = useState(null);

	useEffect(() => {
		let b = parseInt(page) - 1;
		setBefore(b);
		let a = parseInt(page) + 1;
		setAfter(a);
	}, [page]);

	return (
		<div className="others-bar">
			<div className="others-before">
				{sections[before] && (
					<Link
						href="/mevzuat/act/[id]/[page]"
						as={`/mevzuat/act/${actId}/${before}`}
						shallow={true}
					>
						<a className="others-item">
							<div style={{ fontSize: '20px', marginRight: '5px' }}>
								&#8678;
							</div>
							<div className="s-none">
								<p>{sections[before].title}</p>
							</div>
						</a>
					</Link>
				)}
			</div>
			<div className="others-go">
				<GoArticle id={actId} />
			</div>
			<div className="others-after">
				{sections[after] && (
					<Link
						href="/mevzuat/act/[id]/[page]"
						as={`/mevzuat/act/${actId}/${after}`}
						shallow={true}
					>
						<a className="others-item" style={{ justifyContent: 'flex-end' }}>
							<div className="s-none">
								<p>{sections[after].title}</p>
							</div>
							<div style={{ fontSize: '20px', marginLeft: '5px' }}>&#8680;</div>
						</a>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Others;
