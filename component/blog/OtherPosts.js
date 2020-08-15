import Link from 'next/link';

const OtherPosts = () => {
	return (
		<div className="blog-drafts-container">
			<div className="blog-drafts-header">
				<h3>Yazardan</h3>
			</div>
			<div className="blog-drafts-content">
                <div className="blog-drafts-list">
                    <div className="blog-drafts-item">Deneme</div>
                    <div className="blog-drafts-item">Bu bir başlık denemesidir.</div>
                    <div className="blog-drafts-item">Başka bir deneme!</div>
                </div>
			</div>
		</div>
	);
};

export default OtherPosts;
