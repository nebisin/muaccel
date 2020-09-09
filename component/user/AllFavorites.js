import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import ArticleList from 'component/mevzuat/ArticleList';

const AllFavorites = () => {
	const { favorites } = useContext(AuthContext);
	const [allArticles, setAllArticles] = useState([]);

	useEffect(() => {
		setAllArticles(favorites.map((favorite) => favorite.article));
	}, [favorites]);

	return (
		<div className="user-favorite-container">
			{allArticles.length ? (
				<ArticleList items={allArticles} />
			) : (
				<div className="user-no-favorite">
					<div className="user-no-favorite-description">
						Henüz hiçbir maddeyi favorilerinize eklememişsiniz.
					</div>
					<div className="user-no-favorite-image-container fade-in">
					<img className="user-no-favorite-image" src="/nofavorite.png" alt="favori" />
					</div>
				</div>
			)}
		</div>
	);
};

export default AllFavorites;
