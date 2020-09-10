import Link from 'next/link';
import AuthorPreview from 'component/AuthorPreview';

const PostPreview = ({ item }) => {
	return (
		<div className="post-preview">
			<div className="post-preview-in">
				<AuthorPreview data={item} />
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
				<div
					className="post-preview-out"
					style={{
						backgroundImage: 'url(' + '/post-preview.jpg' + ')',
					}}
				/>
				<div className="post-preview-content">{item.abstract}</div>
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
			</div>
		</div>
	);
};

export default PostPreview;
