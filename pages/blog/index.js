import Head from 'next/head';
import mevzuatApi from 'api/mevzuat';
import Footer from 'component/Footer';
import BlogHero from 'component/blog/BlogHero';
import BlogPosts from 'component/blog/BlogPosts';
import BlogDrafts from 'component/blog/BlogDrafts';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import SidebarAds from 'component/ads/SidebarAds';

const BlogPage = ({ data }) => {
	return (
		<React.Fragment>
			<Head>
				<title>Muaccel Blog</title>
				<meta
					name="description"
					content="Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular tarafından
					yazılmış metinleri okuyun veya yazdıklarınızı paylaşın."
				/>
				<meta property="og:title" content="Muaccel Blog" />
				<meta
					property="og:description"
					content="Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular tarafından
					yazılmış metinleri okuyun veya yazdıklarınızı paylaşın."
				/>
				<meta
					property="og:image"
					content="https://www.muaccel.com/muaccel-blog.jpg"
				/>
				<meta
					name="keywords"
					content="Blog, Hukuki Yazılar, Mevzuat, Kanun, Hukuk, Muaccel"
				/>
			</Head>
			<div className="blog-container">
				<BlogHero />
				<div className="create-blog-container">
					<div className="create-blog-section">
						<BlogPosts data={data} />
					</div>
					<aside className="create-blog-sidebar">
						{/* <BlogDrafts /> */}
						<SidebarAds />
						<div
							style={{
								position: 'sticky',
								top: '79px',
								border: '1px solid rgba(0, 0, 0, 0.125)',
								background: 'white',
								marginTop: '10px'
							}}
						>
							<TwitterTimelineEmbed
								sourceType="timeline"
								screenName="muaccelcom"
								options={{ height: 400 }}
								noScrollbar
								noFooter
								noBorders
							/>
						</div>
					</aside>
				</div>
				<Footer />
			</div>
		</React.Fragment>
	);
};

export async function getStaticProps() {
	const response = await mevzuatApi.get(`/blogs`, {
		params: { status: '2' },
		data: {
			sort: { createdAt: -1 },
		},
	});
	const data = response.data;

	return { props: { data }, unstable_revalidate: 60 };
}

export default BlogPage;
