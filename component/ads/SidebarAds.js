import { useEffect } from 'react';

const SidebarAds = () => {
	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<div
			dangerouslySetInnerHTML={{
				__html: `<ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-1639338975133942"
         data-ad-slot="3073578295"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>`,
			}}
			style={{ maxWidth: '340px', padding: '10px', display: 'block' }}
		/>
	);
};

export default SidebarAds;
