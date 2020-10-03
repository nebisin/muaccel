import { useState } from 'react';

import AuthorPreview from 'component/AuthorPreview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as farThumbsUp, faComment as farComment } from '@fortawesome/free-regular-svg-icons';
const item = {
	author: {
		_id: '5ef8963e133f3f0017965070',
		userName: 'admin',
		name: 'Admin',
		description: 'muaccel.com',
	},
	createdAt: '2020-09-23T20:32:03.904Z',
};

const StatusItem = () => {
	const [liked, setLiked] = useState(false);

	const handleClick = () => {
		setLiked((liked) => !liked);
	};

	return (
		<div className="suggestion-container">
			<div className="status-author">
				<AuthorPreview data={item} />
			</div>
			<div className="status-text">Lorem ipsum dolar sit amet.</div>
			<div className="status-buttons">
				<div className="left-button status-button">
					<button onClick={handleClick}>
						{liked ? (
							<FontAwesomeIcon icon={faThumbsUp} style={{ color: '#b39c00' }} />
						) : (
							<FontAwesomeIcon icon={farThumbsUp} />
						)}
						<span className="article-bottom-button-text">Beğen</span>
					</button>
				</div>
				<div className="center-button status-button">
					<button>
						<FontAwesomeIcon icon={faShare} />
						<span className="article-bottom-button-text">Paylaş</span>
					</button>
				</div>
				<div className="right-button status-button">
					<button>
						<FontAwesomeIcon icon={farComment} />
						<span className="article-bottom-button-text">Yorum Yap</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default StatusItem;
