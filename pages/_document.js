import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="tr">
				<Head>
					<meta
						name="description"
						content="muaccel.com - Online Hukuk Projesi..."
					/>
					<meta
						name="keywords"
						content="Muaccel, Mevzuat, Blog, Meydan, Hukuk, Kanun"
					/>
					<meta property="og:image" content="/ogimage.png" />
					<meta charSet="utf-8" />
					<link
						href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap"
						rel="stylesheet"
					/>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
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
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
