import Link from 'next/link';
import Head from 'next/head';
import mevzuatApi from 'api/mevzuat';
import SearchBar from 'component/mevzuat/SearchBar';
import Footer from 'component/Footer';

const BlogPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Muaccel Blog</title>
				<meta
					name="description"
					content="Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular tarafından
					yazılmış metinleri okuyun veya yazdıklarınızı paylaşın."
				/>
				<meta
					property="og:title"
					content="Muaccel Blog"
				/>
				<meta
					property="og:description"
					content="Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular tarafından
					yazılmış metinleri okuyun veya yazdıklarınızı paylaşın."
				/>
				<meta
					property="og:image"
					content="https://www.muaccel.com/ogimage.png"
				/>
			</Head>
			<div className="blog-container">
				<div className="blog-hero">
					<div className="blog-hero-left">
						<h1 className="blog-hero-title">Muaccel Blog</h1>
						<h2 className="blog-hero-subtitle">
							Hukukçular tarafından, hukukçular için
						</h2>
						<div className="blog-hero-description">
							Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular tarafından
							yazılmış metinleri okuyun veya yazdıklarınızı paylaşın.
						</div>
						<div className="blog-hero-register-button">Üye Ol</div>
						<div className="blog-hero-left-background"></div>
					</div>
					<div className="blog-hero-right">
						<div className="blog-hero-right-background"></div>
					</div>
				</div>
				<div className="blog-posts">
					<div className="post-preview">
						<h3 className="post-preview-header">
							Soybağının belirlenmesi için kan ve doku alınması
						</h3>
						<div className="post-preview-content">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
						<div className="post-preview-author"></div>
						<div className="post-preview-readmore">
							<a>Devamını Oku →</a>
						</div>
					</div>
					<div className="post-preview">
						<h3 className="post-preview-header">
							Soybağının belirlenmesi için kan ve doku alınması
						</h3>
						<div className="post-preview-content">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
						<div className="post-preview-author"></div>
						<div className="post-preview-readmore">
							<a>Devamını Oku →</a>
						</div>
					</div>
					<div className="post-preview">
						<h3 className="post-preview-header">
							Soybağının belirlenmesi için kan ve doku alınması
						</h3>
						<div className="post-preview-content">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
						<div className="post-preview-author"></div>
						<div className="post-preview-readmore">
							<a>Devamını Oku →</a>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default BlogPage;
