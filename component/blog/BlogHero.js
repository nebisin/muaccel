import Link from 'next/link';
import { useContext } from 'react';

import AuthContext from 'context/AuthContext';

const BlogHero = () => {
	const { userInfo } = useContext(AuthContext);

	return (
		<div className="blog-hero">
			<div className="blog-hero-left animation-fadeinup">
				<h1 className="blog-hero-title">Muaccel Blog</h1>
				<h2 className="blog-hero-subtitle">
					Hukukçular tarafından, hukukçular için
				</h2>
				<div className="blog-hero-description">
					Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular tarafından
					yazılmış metinleri okuyun veya yazdıklarınızı paylaşın.
				</div>
				{userInfo ? (
					<Link href="/blog/create" as="/blog/create">
						<a>
							<div className="blog-hero-button">Yazı Paylaş</div>
						</a>
					</Link>
				) : (
					<Link href="/user/login" as="/user/login">
						<a>
							<div className="blog-hero-button">Giriş Yap</div>
						</a>
					</Link>
				)}
			</div>
			<div className="blog-hero-right">
				<div className="blog-hero-right-background"></div>
			</div>
		</div>
	);
};

export default BlogHero;
