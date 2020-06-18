import { useEffect, useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';
import SearchBar from 'component/mevzuat/SearchBar';
import BottomBar from 'component/BottomBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGavel,
	faBookReader,
	faPeopleArrows,
} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
	const { isLoggedIn, isLogging } = useContext(AuthContext);
	useEffect(() => {
		mevzuatApi('/');
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Muaccel | Online Hukuk Projesi</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
					<div className="hero-buttons">
						{isLogging ? null : !isLoggedIn ? (
							<React.Fragment>
								<Link href="/user/register" as="/user/register">
									<a>
										<div className="register-button">Üye Ol</div>
									</a>
								</Link>
								<Link href="/user/login" as="/user/login">
									<a>
										<div className="login-button">Giriş Yap</div>
									</a>
								</Link>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Link href="/user/profile/me" as="/user/profile/me">
									<a>
										<div className="register-button">Hesabım</div>
									</a>
								</Link>
								<Link href="/user/logout" as="/user/logout">
									<a>
										<div className="login-button">Çıkış Yap</div>
									</a>
								</Link>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
			<div className="flex-container home-container">
				<section className="showcase-flex">
					<div className="card-deck">
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
								</div>{' '}
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
								</div>{' '}
								<div className="home-item-header">Muaccel Meydan</div>
								<p>
									Hukuki bir tartışma başlatın veya tartışmaya katkıda bulunun.
									Çünkü düşünceler tartışma ortamında doğar ve gelişir.
								</p>
							</div>
						</Link>
					</div>
				</section>
				<BottomBar active={0} />
			</div>
		</React.Fragment>
	);
};

export default HomePage;
