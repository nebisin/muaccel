const PostPreview = () => {
	return (
		<div className="post-preview">
			<h3 className="post-preview-header">
				<a>Soybağının belirlenmesi için kan ve doku alınması</a>
			</h3>
			<div className="author-preview">
				<a className="author-preview-logo"></a>
				<a className="author-preview-name">
					<div className="author-preview-displayname">Muaccel</div>
					<div className="author-preview-username">@muaccel</div>
				</a>
			</div>
			<div className="post-preview-content">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
				occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</div>
			<div className="post-preview-author"></div>
			<div className="post-preview-readmore">
				<a>Devamını Oku →</a>
			</div>
		</div>
	);
};

export default PostPreview;
