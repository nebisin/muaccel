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
					<Link
						href="/mevzuat/[actName]/[id]/madde/[title]"
						as={`/mevzuat/${actId.name
							.replace(/\s/g, '-')
							.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}}/${actId._id}/madde/${
							before.title
						}`}
					>
						<a className="others-item">
							<FontAwesomeIcon
								icon={faArrowAltCircleLeft}
								style={{
									fontSize: '20px',
									marginRight: '5px',
									position: 'relative',
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
				<GoArticle id={actId._id} />
			</div>
			<div className="others-after">
				{after && (
					<Link
						href="/mevzuat/[actName]/[id]/madde/[title]"
						as={`/mevzuat/${actId.name
							.replace(/\s/g, '-')
							.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${actId._id}/madde/${
							after.title
						}`}
					>
						<a className="others-item" style={{ justifyContent: 'flex-end' }}>
							<div className="s-none">
								<p>Madde {after.title}</p>
							</div>
							<FontAwesomeIcon
								icon={faArrowAltCircleRight}
								style={{
									fontSize: '20px',
									marginLeft: '5px',
									position: 'relative',
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
