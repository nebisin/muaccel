import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';
import Head from 'next/head';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import './nprogress.css';
import './styles.css';
import './blogstyles.css';
import './users.css';
import './meydan.css';

import LoadingSplash from 'component/LoadingSplash';
import { ActProvider } from 'context/ActContext';
import { ArticleProvider } from 'context/ArticleContext';
import { SectionProvider } from 'context/SectionContext';
import Navbar from 'component/Navbar';
import { AuthProvider } from 'context/AuthContext';
import BottomBar from 'component/BottomBar';

NProgress.configure({
	showSpinner: false,
	trickleRate: 0.1,
	trickleSpeed: 300,
});

Router.events.on('routeChangeStart', () => {
	NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});

Router.events.on('routeChangeError', () => {
	NProgress.done();
});

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ActProvider>
				<ArticleProvider>
					<SectionProvider>
						<Head>
							<title>Muaccel | Online Hukuk Projesi</title>
							<meta
								name="keywords"
								content="Mevzuat, Kanun, Hukuk, Muaccel, Blog, Hukuk Muhakemeleri Kanunu, Türk Borçlar Kanunu, İcra ve İflas Kanunu"
							/>
							<meta
								name="description"
								content="Hukukçular için geliştirilmiş bir web sitesi. Meslektaşlarınızla iletişime geçin, temel mevzuata kolaylıkla ulaşın, bildiklerinizi paylaşın ve hukukçular tarafından yazılmış metinleri okuyun."
							/>
							<meta
								property="og:title"
								content="Muaccel | Online Hukuk Projesi"
							/>
							<meta
								property="og:description"
								content="Hukukçular için geliştirilmiş bir web sitesi. Meslektaşlarınızla iletişime geçin, temel mevzuata kolaylıkla ulaşın, bildiklerinizi paylaşın ve hukukçular tarafından yazılmış metinleri okuyun."
							/>
							<meta
								property="og:image"
								content="https://www.muaccel.com/fbimage.jpg"
							/>
							<link rel="icon" href="/favicon.png" />
							<link rel="apple-touch-icon" href="/logo192.png" />
							<link rel="manifest" href="/manifest.json" />
							<meta name="twitter:card" content="summary" />
							<meta name="twitter:site" content="@muaccelcom" />
							<meta
								name="viewport"
								content="width=device-width, initial-scale=1.0"
							/>
							<script
								data-ad-client="ca-pub-1639338975133942"
								async
								src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
							></script>
							<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
						</Head>
						<Navbar />
						<div className="container">
							<Component {...pageProps} />
						</div>
						<BottomBar active={0} />
						<LoadingSplash />
					</SectionProvider>
				</ArticleProvider>
			</ActProvider>
		</AuthProvider>
	);
}

export default MyApp;
