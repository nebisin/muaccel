import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mevzuatApi from 'api/mevzuat';

import { faPrint, faShare } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

const BlogButtons = ({ blogId }) => {
	const { isLoggedIn, token } = useContext(AuthContext);
	/*
	const [isReader, setIsReader] = useState();

	const readLater = async (token, blogId) => {
		if (!token || !blogId) return;
		const response = await mevzuatApi.patch(
			`/blog/reader/${blogId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(response.data)
		setIsReader(response.data)
	}

	useEffect(() => {
		const getIsReader = async (token, blogId) => {
			if (!token || !blogId) return;
			const response = await mevzuatApi.post(
				`/blog/reader/${blogId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setIsReader(response.data)
		};

		if (token && blogId) {
			getIsReader(token, blogId);
		}
	}, [token, blogId]);
*/
	return (
		<div className="article-card-bottom">
			{isLoggedIn && (
				<React.Fragment>
					<div className="article-bottom-share article-bottom-button">
						<FontAwesomeIcon icon={faShare} />
						<span className="article-bottom-button-text">Paylaş</span>
					</div>
					<div className="article-bottom-share article-bottom-button" onClick={() => readLater(token, blogId)}>
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
