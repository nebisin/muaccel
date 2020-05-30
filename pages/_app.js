import './styles.css'
import { ActProvider } from '../context/ActContext';
import { ArticleProvider } from '../context/ArticleContext';
import { SectionProvider } from '../context/SectionContext';

function MyApp({ Component, pageProps }) {
	return (
		<ActProvider>
			<ArticleProvider>
				<SectionProvider>
					<Component {...pageProps} />
				</SectionProvider>
			</ArticleProvider>
		</ActProvider>
	);
}

export default MyApp;
