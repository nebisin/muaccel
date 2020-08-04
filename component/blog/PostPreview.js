import Link from 'next/link';
const PostPreview = ({ item }) => {
	return (
		<div className="post-preview">
			<div
				className="post-preview-out"
				style={{
					backgroundImage:
						'url(' +
						'/post-preview.jpg' +
						')',
				}}
			/>
			<div className="post-preview-in">
				<h3 className="post-preview-header">
					<Link
						href="/blog/post/[name]/[id]"
						as={`/blog/post/${item.title.replace(/\s/g, '-')}/${item._id}`}
					>
						<a>{item.title}</a>
					</Link>
				</h3>
				<a className="post-preview-author">
					{item.author.name}{' '}
					<span className="author-preview-username">
						(@{item.author.userName})
					</span>{' '}
					tarafından yazıldı.
				</a>
				<div className="post-preview-content">{item.abstract}</div>
				<div className="post-preview-readmore">
					<Link
						href="/blog/post/[name]/[id]"
						as={`/blog/post/${item.title.replace(/\s/g, '-')}/${item._id}`}
					>
						<a>Devamını Oku →</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PostPreview;
