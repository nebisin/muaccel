import Favorite from './Favorite';

const ArticleItem = ({ item }) => {
	if (item) {
		return (
			<article className="article-page-card">
				<div className="article-page-card-header">
					<h2>Madde {item.title}</h2>
					<h1>{item.name}</h1>
				</div>
				<div className="article-page-card-content">{item.content}</div>
				<Favorite position="top" articleId={item._id} />
			</article>
		);
	} else {
		return null;
	}
};

export default ArticleItem;
