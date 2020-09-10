import {useState} from 'react';
import Link from 'next/link';
import GoArticle from './GoArticle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowAltCircleRight,
	faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

const Others = ({ before, after, actId }) => {
	const [focused, setFocused] = useState(false);

	return (
		<div className="others-bar" style={focused ? {zIndex: 999} : {zIndex: 500}}>
			<div className="others-before">
				{before && (
					<Link
						href="/mevzuat/[actName]/[id]/madde/[title]"
						as={`/mevzuat/${actId.name
							.replace(/\s/g, '-')
							.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}}/${
							actId._id
						}/madde/${before.title.replace(/\//g, '-')}`}
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
			<GoArticle id={actId._id} focused={focused} setFocused={setFocused} />
			<div className="others-after">
				{after && (
					<Link
						href="/mevzuat/[actName]/[id]/madde/[title]"
						as={`/mevzuat/${actId.name
							.toLocaleLowerCase('tr')
							.replace(/ğ/gim, 'g')
							.replace(/ü/gim, 'u')
							.replace(/ş/gim, 's')
							.replace(/ı/gim, 'i')
							.replace(/ö/gim, 'o')
							.replace(/ç/gim, 'c')
							.replace(/\s/g, '-')
							.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
							actId._id
						}/madde/${after.title.replace(/\//g, '-')}`}
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
