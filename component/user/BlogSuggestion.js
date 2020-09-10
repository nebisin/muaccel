import ArticleItem from 'component/mevzuat/ArticleItem';

const BlogSuggestion = ({ blog }) => {
	return (
		<div className="suggestion-container">
			<div className="suggestion-header">Sizin için öneriliyor</div>
			<div className="suggestion-content"></div>
			<div className="suggestion-preview">
				{article ? (
					<ArticleItem item={article} />
				) : (
					<div className="card-holder">
						<div className="header-holder"></div>
						<div className="number-holder"></div>
						<div className="content-holder"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BlogSuggestion;
