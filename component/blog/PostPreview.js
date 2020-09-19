import Link from 'next/link';
import AuthorPreview from 'component/AuthorPreview';

const PostPreview = ({ item, type }) => {
	return (
		<div
			className="post-preview"
			style={
				type === 'inside'
					? { border: '1px solid rgb(204, 214, 221)', boxShadow: 'none' }
					: {}
			}
		>
			<div className="post-preview-in">
				{type !== 'inside' && <AuthorPreview data={item} />}
				<h3 className="post-preview-header">
					<Link
						href="/blog/post/[name]/[id]"
						as={`/blog/post/${item.title
							.toLocaleLowerCase('tr')
							.replace(/ğ/gim, 'g')
							.replace(/ü/gim, 'u')
							.replace(/ş/gim, 's')
							.replace(/ı/gim, 'i')
							.replace(/ö/gim, 'o')
							.replace(/ç/gim, 'c')
							.replace(/\s/g, '-')
							.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${item._id}`}
					>
						<a>{item.title}</a>
					</Link>
				</h3>

				<div className="post-preview-content">{item.abstract}</div>
				{type === 'inside' && <AuthorPreview data={item} />}
				{type !== 'inside' && (
					<div className="post-preview-readmore">
						<Link
							href="/blog/post/[name]/[id]"
							as={`/blog/post/${item.title
								.toLocaleLowerCase('tr')
								.replace(/ğ/gim, 'g')
								.replace(/ü/gim, 'u')
								.replace(/ş/gim, 's')
								.replace(/ı/gim, 'i')
								.replace(/ö/gim, 'o')
								.replace(/ç/gim, 'c')
								.replace(/\s/g, '-')
								.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${item._id}`}
						>
							<a>Devamını Oku →</a>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default PostPreview;
