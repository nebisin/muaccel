import Head from 'next/head';
import mevzuatApi from 'api/mevzuat';
import Footer from 'component/Footer';
import BlogHero from 'component/blog/BlogHero';
import BlogPosts from 'component/blog/BlogPosts';

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
					content="https://www.muaccel.com/blog-hero-photo.jpg"
				/>
			</Head>
			<div className="blog-container">
				<BlogHero />
				<BlogPosts />
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default BlogPage;
