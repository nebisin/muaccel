import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';
import Head from 'next/head';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import './nprogress.css';
import 'draft-js/dist/Draft.css';
import './styles.css';

import LoadingSplash from 'component/LoadingSplash';
import { ActProvider } from 'context/ActContext';
import { ArticleProvider } from 'context/ArticleContext';
import { SectionProvider } from 'context/SectionContext';
import Navbar from 'component/Navbar';
import { AuthProvider } from 'context/AuthContext';
import BottomBar from 'component/BottomBar'
import Footer from 'component/Footer';
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
								name="description"
								content="muaccel.com - Online Hukuk Projesi..."
							/>
							<meta
								name="viewport"
								content="width=device-width, initial-scale=1.0"
							/>
							<meta
								name="keywords"
								content="Muaccel, Mevzuat, Kaynakça, Blog, Meydan"
							/>
							<meta charSet="utf-8" />
							<meta property="og:image" content="/logo512.png" />
							<link
								href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap"
								rel="stylesheet"
							/>
							<link rel="icon" href="/favicon.ico" />
							<link rel="apple-touch-icon" href="/logo192.png" />
							<link rel="manifest" href="/manifest.json" />
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
