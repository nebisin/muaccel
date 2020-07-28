import { useContext, useState, useEffect } from 'react';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import {
	faStar as farStar,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';

const Favorite = ({ position, articleId }) => {
	const { favorites, getFavorites, token } = useContext(AuthContext);
	const [isFavorite, setIsFavorite] = useState(false);
	const [isSending, setIsSending] = useState(false);

	useEffect(() => {
		const result = favorites.some((favorite) => favorite.article._id === articleId);
		setIsFavorite(result);
	}, [favorites, articleId]);

	const addFovorite = async ({ go, action }) => {
        if (!go || isSending) return;
        
		if (action === false) {
			setIsSending(true);
			try {
				await mevzuatApi.post(
					'/favorite/article',
					{
						articleId,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setIsFavorite(true);
                getFavorites();
                setIsSending(false);
			} catch (error) {
				console.log(error);
				setIsFavorite(false);
                getFavorites();
                setIsSending(false);
			}
		} else {
			setIsSending(true);
			try {
				await mevzuatApi.delete('/favorite/article/' + articleId, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

                setIsFavorite(false);
                setIsSending(false);
				getFavorites();
			} catch (error) {
				console.log(error);
                setIsFavorite(true);
                setIsSending(false);
				getFavorites();
			}
		}
	};

	return (
		<React.Fragment>
			<div onClick={() => addFovorite({ go: true, action: isFavorite })}>
				{!isSending ? (isFavorite ? (
					<FontAwesomeIcon
						icon={farStar}
						className={`favorite-icon favorite-icon-${position} favorite-icon-active`}
					/>
				) : (
					<FontAwesomeIcon
						icon={faStar}
						className={`favorite-icon favorite-icon-${position}`}
					/>
				)) : (
                    <FontAwesomeIcon icon={faSpinner} className={`login-spinner favorite-icon favorite-icon-${position}`} />
                )}
			</div>
		</React.Fragment>
	);
};

export default Favorite;
