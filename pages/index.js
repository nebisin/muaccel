import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import mevzuatApi from 'api/mevzuat';
import SearchBar from 'component/mevzuat/SearchBar';
import Footer from 'component/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGavel,
	faBookReader,
	faPeopleArrows,
} from '@fortawesome/free-solid-svg-icons';
import HeroButtons from 'component/HeroButtons';

const HomePage = () => {
	useEffect(() => {
		mevzuatApi('/');
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Muaccel | Online Hukuk Projesi</title>
				<meta
					name="description"
					content="muaccel.com - Online Hukuk Projesi..."
				/>
				<meta property="og:title" content="Muaccel | Online Hukuk Projesi" />
				<meta property="og:description" content="Online Hukuk Projesi" />
				<meta
					property="og:image"
					content="https://www.muaccel.com/fbimage.jpg"
				/>
			</Head>
			<div className="hero-header">
				<div className="hero-inside">
					<h1 className="hero-title">Muaccel</h1>
					<h2 className="hero-subtitle">
						Online <b>hukuk</b> projesi
					</h2>
					<div className="search-container">
						<SearchBar />
					</div>
					<HeroButtons />
				</div>
			</div>
			<div className="flex-container home-container">
				<section className="showcase-flex">
					<div className="card-deck home-deck">
						<Link href="/mevzuat" as="/mevzuat">
							<div className="home-item">
								<div className="home-item-icon-container">
									<FontAwesomeIcon icon={faGavel} className="home-item-icon" />
								</div>
								<div className="home-item-header">Muaccel Mevzuat</div>
								<p>
									Temel mevzuata ulaşmanın pratik yolu... Bir kanun veya madde
									arayın. Alanına göre tasnif edilmiş kanunlar arasında gezinin.
								</p>
							</div>
						</Link>
						<Link href="/blog" as="/blog">
							<div className="home-item">
								<div className="home-item-icon-container">
									<FontAwesomeIcon
										icon={faBookReader}
										className="home-item-icon"
									/>
								</div>
								<div className="home-item-header">Muaccel Blog</div>
								<p>
									Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular
									tarafından yazılmış metinleri okuyun veya yazdıklarınızı
									paylaşın.
								</p>
							</div>
						</Link>
						<Link href="/meydan" as="/meydan">
							<div className="home-item">
								<div className="home-item-icon-container">
									<FontAwesomeIcon
										icon={faPeopleArrows}
										className="home-item-icon"
									/>
								</div>
								<div className="home-item-header">Muaccel Meydan</div>
								<p>
									Hukuki bir tartışma başlatın veya tartışmaya katkıda bulunun.
									Çünkü düşünceler tartışma ortamında doğar ve gelişir.
								</p>
							</div>
						</Link>
					</div>
					<div className="landing-hero">
						<div className="blog-hero-left landing-hero-left">
							<h2 className="landing-hero-subtitle">
								Binlerce kanun maddesine tek tıkla ulaşın
							</h2>
							<div className="landing-hero-description">
								Kalın mevzuat kitaplarını yanınızda taşımaktan yorulmadınız mı?{' '}
								<b>Muaccel Mevzuat</b> ile internet erişimine sahip olduğunuz
								her yerde kolay bir şekilde temel mevzuata erişebilirsiniz.
								Üstelik tamamen ücretsiz!
							</div>
							<h2 class="landing-hero-subtitle">Paylaşmanın gücünü keşfedin</h2>
							<div class="landing-hero-description">
								Bildiklerinizi paylaşmak fikirlerinizi geliştirmenize
								ve meslektaşlarınız arasında tanınmanıza katkı sağlar.&nbsp;
								<b>Muaccel Blog</b>&nbsp;ile yazdıklarınızı paylaşın ve
								yazılanları okuyun.
							</div>
						</div>
						<div className="landing-right">
							<div className="landing-right-background"></div>
						</div>
					</div>
					<div className="home-image">
						<img
							className="home-image-inline"
							src="/internal.svg"
							alt="example"
						/>
					</div>
					<Footer />
				</section>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
