import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="tr">
				<Head>
					<meta
						name="keywords"
						content="Muaccel, Mevzuat, Blog, Meydan, Hukuk, Kanun"
					/>
					<meta charSet="utf-8" />
					<link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
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
