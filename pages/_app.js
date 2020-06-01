import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';
import Head from 'next/head';

import './nprogress.css';
import './styles.css';

import { ActProvider } from '../context/ActContext';
import { ArticleProvider } from '../context/ArticleContext';
import { SectionProvider } from '../context/SectionContext';
import Navbar from '../component/mevzuat/Navbar';

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
		<ActProvider>
			<ArticleProvider>
				<SectionProvider>
					<Head>
						<title>Muaccel | Online Hukuk Sistemi</title>
						<meta
							name="description"
							content="muaccel.com - Online Hukuk Sistemi..."
						/>
						<meta name="viewport" content="width=device-width, initial-scale=1.0" />
						<meta name="keywords" content="Muaccel, Mevzuat, Kaynakça, Blog, Meydan" />
						<link rel="icon" href="/favicon.ico" />
						<link rel="apple-touch-icon" href="/logo192.png" />
						<link rel="manifest" href="/manifest.json" />
					</Head>
					<Navbar />
					<div className="container">
						<Component {...pageProps} />
					</div>
				</SectionProvider>
			</ArticleProvider>
		</ActProvider>
	);
}

export default MyApp;
