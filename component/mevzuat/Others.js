import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowAltCircleRight,
	faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

import GoArticle from './GoArticle';

const Others = ({ sections, page, actId }) => {
	const [before, setBefore] = useState(null);
	const [after, setAfter] = useState(null);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		let b = parseInt(page) - 1;
		setBefore(b);
		let a = parseInt(page) + 1;
		setAfter(a);
	}, [page]);

	return (
		<div className="others-bar" style={focused ? {zIndex: 999} : {zIndex: 500}}>
			<div className="others-before">
				{sections[before] && (
					<Link
						href="/mevzuat/[actName]/[id]/[page]"
						as={`/mevzuat/${actId.name
							.replace(/\s/g, '-')
							.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
							actId._id
						}/${before}`}
						shallow={true}
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
								<p>{sections[before].title}</p>
							</div>
						</a>
					</Link>
				)}
			</div>
			<GoArticle id={actId._id} focused={focused} setFocused={setFocused} />
			<div className="others-after">
				{sections[after] && (
					<Link
						href="/mevzuat/[actName]/[id]/[page]"
						as={`/mevzuat/${actId.name
							.replace(/\s/g, '-')
							.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
							actId._id
						}/${after}`}
						shallow={true}
					>
						<a className="others-item" style={{ justifyContent: 'flex-end' }}>
							<div className="s-none">
								<p>{sections[after].title}</p>
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
