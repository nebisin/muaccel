import { useEffect } from 'react';
import { useRouter } from 'next/router';

const InArticleAds = ({refer}) => {
	const router = useRouter();
	const pathname = router.pathname;

	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (err) {
			console.log(err);
		}
	}, [refer, pathname]);

	return (
		<ins
			className="adsbygoogle"
			style={{display:"block", textAlign:"center" }}
			data-ad-layout="in-article"
			data-ad-format="fluid"
			data-ad-client="ca-pub-1639338975133942"
			data-ad-slot="3784024734"
		></ins>
	);
};

export default InArticleAds;
