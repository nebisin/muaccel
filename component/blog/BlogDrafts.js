import Link from 'next/link';

const BlogDrafts = () => {
	return (
		<div className="blog-drafts-container">
			<div className="blog-drafts-header">
				<h3>Taslaklarım</h3>
			</div>
			<div className="blog-drafts-content">
				<div className="blog-drafts-none">
					<p>Henüz hiç taslak oluşturmamışsınız</p>
					<div className="blog-drafts-button">
						<Link href="/blog/create" as="/blog/create">
							<a>Şimdi Başla</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogDrafts;
