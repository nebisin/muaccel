import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faShare,
	faPrint,
	faBookmark as farBoomark,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

const BlogButtons = ({ blogId, location }) => {
	const { isLoggedIn, token } = useContext(AuthContext);
	const [isReader, setIsReader] = useState();
	const [loading, setLoading] = useState(true);

	const readLater = async (token, blogId) => {
		if (!isLoggedIn) {
			window.alert(
				'Bu yazıyı okuma listenize ekleyebilmek için üye olmalısınız.'
			);
			return;
		}
		if (!token || !blogId) return;
		setLoading(true);

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
			setLoading(false);
		} catch (error) {
			setIsReader((reader) => !reader);
		}
	};

	useEffect(() => {
		setIsReader();

		const getIsReader = async (token, blogId) => {
			if (!token || !blogId) return;
			setLoading(true);
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
				setLoading(false);
			} catch (error) {
				setIsReader(false);
				setLoading(false);
			}
		};

		if (!isLoggedIn) {
			setIsReader(false);
			setLoading(false);
			return;
		}
		if (token && blogId) {
			getIsReader(token, blogId);
		}
	}, [token, blogId]);

	return (
		<div
			className="status-buttons"
			style={location === 'in' ? {} : { marginBottom: '20px' }}
		>
			<div className="left-button status-button">
				{isReader === undefined ? (
					<div className="status-button-holder"></div>
				) : (
					<button onClick={() => readLater(token, blogId)} disabled={loading}>
						<FontAwesomeIcon
							icon={isReader === true ? farBoomark : faBookmark}
							className={isReader === true ? 'blog-reader-true' : ''}
						/>
						<span className="article-bottom-button-text">Sonra Oku</span>
					</button>
				)}
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
					<button onClick={() => document.execCommand('print', false, null)}>
						<FontAwesomeIcon icon={faPrint} />
						<span className="article-bottom-button-text">Yazdır</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default BlogButtons;
