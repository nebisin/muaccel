import { useEffect } from 'react';
import { useRouter } from 'next/router';

const InArticleAds = ({ refer }) => {
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
			class="adsbygoogle"
			style={{ display: 'block' }}
			data-ad-client="ca-pub-1639338975133942"
			data-ad-slot="5102961364"
			data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
	);
};

export default InArticleAds;
