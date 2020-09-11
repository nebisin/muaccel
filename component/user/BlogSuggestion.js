import PostPreview from 'component/blog/PostPreview';
import Link from 'next/link';

const BlogSuggestion = ({ blog }) => {
	return (
		<div className="suggestion-container">
			<div className="suggestion-header">Sizin için öneriliyor</div>
			<div className="suggestion-content"></div>
			<div className="suggestion-preview">
				{blog ? (
					<PostPreview item={blog} />
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
					<Link href="/blog" as="/blog">
						<a>Muaccel Blog →</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BlogSuggestion;
