import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShare, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import Favorite from './Favorite';
import ArticleBottomNote from './ArticleBottomNote';
import { useState } from 'react';

const ArticleItemBottom = ({ item }) => {
    const [isNoting, setIsNoting] = useState(false);
	return (
		<React.Fragment>
			<div className="article-card-bottom">
				<div className="article-bottom-share article-bottom-button">
					<FontAwesomeIcon icon={faShare} />
					<span className="article-bottom-button-text">Paylaş</span>
				</div>
				<div className={`article-bottom-note article-bottom-button ${isNoting && "article-bottom-button-active"}`} onClick={() => setIsNoting(!isNoting)}>
					<FontAwesomeIcon icon={faStickyNote} />
					<span className="article-bottom-button-text">Not Al</span>
				</div>
				<div className="foverite-icon-bottom">
					<Favorite position="bottom" articleId={item._id} />
				</div>
			</div>
			{isNoting && (
				<div className="article-note-widget">
					<ArticleBottomNote item={item} />
				</div>
			)}
		</React.Fragment>
	);
};

export default ArticleItemBottom;
