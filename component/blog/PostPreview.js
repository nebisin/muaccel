import Link from 'next/link';

const PostPreview = ({ item }) => {
	return (
		<div className="post-preview">
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
				<a>Devamını Oku →</a>
			</div>
		</div>
	);
};

export default PostPreview;
