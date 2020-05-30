import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';

import './nprogress.css';
import './styles.css';

import { ActProvider } from '../context/ActContext';
import { ArticleProvider } from '../context/ArticleContext';
import { SectionProvider } from '../context/SectionContext';
import Navbar from '../component/mevzuat/Navbar';

NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 300 });

Router.events.on('routeChangeStart', () => {
	NProgress.start();
})

Router.events.on('routeChangeComplete', () => {
	NProgress.done();
})

Router.events.on('routeChangeError', () => {
	NProgress.done();
})

function MyApp({ Component, pageProps }) {
	return (
		<ActProvider>
			<ArticleProvider>
				<SectionProvider>
					<div className="container">
						<Navbar />
						<Component {...pageProps} />
					</div>
				</SectionProvider>
			</ArticleProvider>
		</ActProvider>
	);
}

export default MyApp;
