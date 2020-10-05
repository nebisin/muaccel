const SidebarAds = () => {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- sidebar-kare -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-1639338975133942"
         data-ad-slot="3073578295"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>`,
            }}
            style={{maxWidth: '340px'}}
		/>
	);
};

export default SidebarAds;
