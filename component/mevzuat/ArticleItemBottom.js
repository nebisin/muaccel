import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faShare,
	faThumbsUp,
	faStickyNote,
} from '@fortawesome/free-solid-svg-icons';
import {
	faThumbsUp as farThumbsUp,
	faComment as farComment,
	faStickyNote as farStickyNote,
} from '@fortawesome/free-regular-svg-icons';
import Favorite from './Favorite';
import ArticleBottomNote from './ArticleBottomNote';
import { useState, useContext } from 'react';
import AuthContext from 'context/AuthContext';
import Link from 'next/link';

const ArticleItemBottom = ({ item, location }) => {
	const [isNoting, setIsNoting] = useState(false);
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<React.Fragment>
			<div className="status-buttons">
				<div className="left-button status-button">
					<Favorite position="bottom" articleId={item._id} />
				</div>
				<div className="center-button status-button">
					<button>
						<FontAwesomeIcon icon={faShare} />
						<span className="article-bottom-button-text">Paylaş</span>
					</button>
				</div>
				{location === 'in' ? (
					''
				) : (
					<div className="right-button status-button">
						<button onClick={() => setIsNoting(!isNoting)}>
							<FontAwesomeIcon icon={isNoting ? faStickyNote : farStickyNote} />
							<span className="article-bottom-button-text">Not Al</span>
						</button>
					</div>
				)}
			</div>
			{isNoting && (
				<React.Fragment>
					{isLoggedIn ? (
						<div className="article-note-widget">
							<ArticleBottomNote item={item} />
						</div>
					) : (
						<div
							className="new-comment-container"
							style={{ justifyContent: 'center' }}
						>
							<p>
								Not oluşturabilmek için üye olmalısınız.{' '}
								<Link href="/user/register">
									<a>Üye olun</a>
								</Link>
							</p>
						</div>
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default ArticleItemBottom;
