import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import FavoriteArticleList from 'component/mevzuat/FavoriteArticleList';
import ArticleHolder from 'component/mevzuat/ArticleHolder';

const AllFavorites = () => {
	const { favorites, favoritesLoading } = useContext(AuthContext);

	return (
		<div className="user-favorite-container">
			{favorites.length ? (
				<FavoriteArticleList items={favorites} />
			) : favoritesLoading ? (
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
