import './styles.css';
import { ActProvider } from '../context/ActContext';
import { ArticleProvider } from '../context/ArticleContext';
import { SectionProvider } from '../context/SectionContext';
import Navbar from '../component/mevzuat/Navbar';

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
