import { useEffect } from 'react';
import { useRouter } from 'next/router';

const FeedAds = () => {
	const router = useRouter();
	const pathname = router.pathname;

	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (err) {
			console.log(err);
		}
	}, [pathname]);

	return (
		<ins
			class="adsbygoogle"
			style={{ display: 'block', marginBottom: '20px' }}
			data-ad-format="fluid"
			data-ad-layout-key="-ef+6k-30-ac+ty"
			data-ad-client="ca-pub-1639338975133942"
			data-ad-slot="3045658139"
		></ins>
	);
};

export default FeedAds;
