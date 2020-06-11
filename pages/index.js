import Link from 'next/link';
import SearchBar from '../component/mevzuat/SearchBar';

const HomePage = () => {
	return (
		<React.Fragment>
			<div className="hero-header">
				<div className="hero-inside">
					<h1 className="hero-title">Muaccel</h1>
					<h2 className="hero-subtitle">
						Online <b>hukuk</b> projesi
					</h2>
					<div className="search-container">
						<SearchBar />
					</div>
				</div>
			</div>
			<div className="flex-container home-container">
				<section className="showcase-flex">
					<div className="card-deck">
						<Link href="/mevzuat" prefetch={false}>
							<div className="home-item">
								<div className="home-item-header">Muaccel Mevzuat</div>
								<p>
									Temel mevzuata ulaşmanın pratik yolu. Bir kanun veya madde
									arayın. Alanına göre tasnif edilmiş kanunlar arasında gezinin.
								</p>
							</div>
						</Link>
						<Link href="/blog" prefetch={false}>
							<div className="home-item">
								<div className="home-item-header">Muaccel Blog</div>
								<p>
									Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular
									tarafından yazılmış metinleri okuyun veya yazdıklarınızı
									paylaşın.
								</p>
							</div>
						</Link>
						<Link href="/meydan" prefetch={false}>
							<div className="home-item">
								<div className="home-item-header">Muaccel Meydan</div>
								<p>
									Hukuki bir tartışma başlatın veya tartışmaya katılın. Çünkü
									düşünce tartışmayla büyür ve gelişir.
								</p>
							</div>
						</Link>
					</div>
				</section>
				<footer></footer>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
