import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import ArticleList from 'component/mevzuat/ArticleList';
import ArticleHolder from 'component/mevzuat/ArticleHolder';

const AllFavorites = () => {
	const { favorites, favoritesLoading } = useContext(AuthContext);
	const [allArticles, setAllArticles] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if(!favorites) {
			setLoading(false);
			return;
		};
		setLoading(true);
		setAllArticles(favorites.map((favorite) => favorite.article));
		setLoading(false);
	}, [favorites]);

	return (
		<div className="user-favorite-container">
			{allArticles.length ? (
				<ArticleList items={allArticles} />
			) : favoritesLoading || loading ? (
				<ArticleHolder />
			) : (
				<div className="user-no-favorite">
					<div className="user-no-favorite-description">
						Henüz hiçbir maddeyi favorilerinize eklememişsiniz.
					</div>
					<div className="user-no-favorite-image-container fade-in">
						<img
							className="user-no-favorite-image"
							src="/nofavorite.png"
							alt="favori"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default AllFavorites;
