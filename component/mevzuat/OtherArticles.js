import React from 'react';
import Link from 'next/link';
import GoArticle from './GoArticle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowAltCircleRight,
	faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

const Others = ({ before, after, actId }) => {
	return (
		<div className="others-bar">
			<div className="others-before">
				{before && (
					<Link href="/mevzuat/madde/[id]" as={`/mevzuat/madde/${before._id}`}>
						<a className="others-item">
							<FontAwesomeIcon
								icon={faArrowAltCircleLeft}
								style={{
									fontSize: '18px',
									marginRight: '5px',
									position: 'relative',
									bottom: '-2px',
								}}
							/>
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
					<Link href="/mevzuat/madde/[id]" as={`/mevzuat/madde/${after._id}`}>
						<a className="others-item" style={{ justifyContent: 'flex-end' }}>
							<div className="s-none">
								<p>Madde {after.title}</p>
							</div>
							<FontAwesomeIcon
								icon={faArrowAltCircleRight}
								style={{
									fontSize: '18px',
									marginLeft: '5px',
									position: 'relative',
									bottom: '-2px',
								}}
							/>
						</a>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Others;
