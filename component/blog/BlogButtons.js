import { useContext } from 'react';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPrint, faShare } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

const BlogButtons = () => {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<div className="article-card-bottom">
			{isLoggedIn && (
				<React.Fragment>
					<div className="article-bottom-share article-bottom-button">
						<FontAwesomeIcon icon={faShare} />
						<span className="article-bottom-button-text">Paylaş</span>
					</div>
					<div className="article-bottom-share article-bottom-button">
						<FontAwesomeIcon icon={faBookmark} />
						<span className="article-bottom-button-text">Sonra Oku</span>
					</div>
				</React.Fragment>
			)}

			<div
				className="article-bottom-share article-bottom-button"
				onClick={() => document.execCommand('print', false, null)}
			>
				<FontAwesomeIcon icon={faPrint} />
				<span className="article-bottom-button-text">Yazdır</span>
			</div>
		</div>
	);
};

export default BlogButtons;
