import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mevzuatApi from 'api/mevzuat';

import { faPrint, faShare } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as farBoomark, faSpinner } from '@fortawesome/free-solid-svg-icons';

const BlogButtons = ({ blogId }) => {
	const { isLoggedIn, token } = useContext(AuthContext);
	const [isReader, setIsReader] = useState();

	const readLater = async (token, blogId) => {
		if (!token || !blogId) return;
		setIsReader((reader) => !reader);
		try {
			const response = await mevzuatApi.patch(
				`/blog/bookmark/${blogId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setIsReader(response.data);
		} catch (error) {
			setIsReader((reader) => !reader);
		}
	};

	useEffect(() => {
		const getIsReader = async (token, blogId) => {
			if (!token || !blogId) return;
			try {
				const response = await mevzuatApi.post(
					`/blog/bookmark/${blogId}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setIsReader(response.data);
			} catch (error) {
				setIsReader(false);
			}
		};

		setIsReader();
		if (token && blogId) {
			getIsReader(token, blogId);
		}
	}, [token, blogId]);

	return (
		<div className="article-card-bottom">
			{isLoggedIn && (
				<React.Fragment>
					<div className="article-bottom-share article-bottom-button">
						<FontAwesomeIcon icon={faShare} />
						<span className="article-bottom-button-text">Paylaş</span>
					</div>
					<button
						className="article-bottom-share article-bottom-button"
						onClick={() => readLater(token, blogId)}
						disabled={isReader === undefined}
					>
						{isReader === undefined ? (
							<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
						) : (
							<FontAwesomeIcon
								icon={isReader === true ? farBoomark : faBookmark}
								className={isReader === true ? 'blog-reader-true' : ''}
							/>
						)}

						<span className="article-bottom-button-text">Sonra Oku</span>
					</button>
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
