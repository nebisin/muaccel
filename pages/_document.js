import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="tr">
				<Head>
					<meta
						name="keywords"
						content="Mevzuat, Kanun, Hukuk, Muaccel, Blog"
					/>
					<meta charSet="utf-8" />
					<link
						href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@300;400&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="stylesheet"
					></link>
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=UA-148977213-1"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-148977213-1');`,
						}}
					/>
					<script
						data-ad-client="ca-pub-1639338975133942"
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
					></script>
				</Head>
				<body>
					<Main />
				</body>
				<NextScript />
			</Html>
		);
	}
}

export default MyDocument;
