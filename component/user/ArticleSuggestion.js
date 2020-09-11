import ArticleItem from 'component/mevzuat/ArticleItem';
import Link from 'next/link';

const ArticleSuggestion = ({ article }) => {
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
				<div
					className="post-preview-readmore"
					style={{ margin: '15px', marginBottom: '0' }}
				>
					<Link href="/mevzuat" as="/mevzuat">
						<a>Muaccel Mevzuat →</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ArticleSuggestion;
