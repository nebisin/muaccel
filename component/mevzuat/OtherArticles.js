import React from 'react';
import Link from 'next/link';
import GoArticle from './GoArticle';

const Others = ({ before, after, actId }) => {
	return (
		<div className="others-bar">
			<div className="others-before">
				{before && (
					<Link
						href="/mevzuat/madde/[id]"
						as={`/mevzuat/madde/${before._id}`}
					>
						<a className="others-item">
							<div style={{ fontSize: '20px', marginRight: '5px' }}>
								&#8678;
							</div>
							<div className="s-none">
								<p>Madde {before.title}</p>
							</div>
						</a>
					</Link>
				)}
			</div>
			<div className="others-go">
				<GoArticle id={actId} />
			</div>
			<div className="others-after">
				{after && (
					<Link
						href="/mevzuat/madde/[id]"
						as={`/mevzuat/madde/${after._id}`}
					>
						<a className="others-item" style={{ justifyContent: 'flex-end' }}>
							<div className="s-none">
								<p>Madde {after.title}</p>
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
