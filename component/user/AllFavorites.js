import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import ArticleList from 'component/mevzuat/ArticleList';

const AllFavorites = () => {
	const { favorites } = useContext(AuthContext);
	const [allArticles, setAllArticles] = useState([]);

	useEffect(() => {
		setAllArticles(favorites.map((favorite) => favorite.article));
	}, []);

	return (
		<React.Fragment>
			{allArticles.length ? (
				<ArticleList items={allArticles} />
			) : (
				<div>Henüz hiç favori maddeniz yok</div>
			)}
		</React.Fragment>
	);
};

export default AllFavorites;
